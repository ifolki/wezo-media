import { prisma } from '../lib/prisma'
import * as fs from 'fs'
import * as path from 'path'

async function backupProductionDb() {
  console.log('🔄 Taking snapshot backup of Production database...')

  const backupDir = path.resolve('backups')
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true })
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupFile = path.join(backupDir, `production_backup_${timestamp}.json`)

  // Query existing public tables
  const tables: any[] = await prisma.$queryRawUnsafe(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `)

  console.log(`Found ${tables.length} tables in public schema. Exporting rows...`)

  const snapshot: Record<string, any> = {
    metadata: {
      timestamp: new Date().toISOString(),
      tablesCount: tables.length,
      tablesList: tables.map(t => t.table_name)
    },
    tables: {}
  }

  for (const t of tables) {
    const tableName = t.table_name
    try {
      const rows: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM "public"."${tableName}";`)
      snapshot.tables[tableName] = {
        count: rows.length,
        rows: rows
      }
      console.log(`   ✓ Backed up "${tableName}": ${rows.length} rows`)
    } catch (err: any) {
      console.warn(`   ⚠️ Warning querying "${tableName}":`, err.message)
      snapshot.tables[tableName] = { error: err.message }
    }
  }

  fs.writeFileSync(backupFile, JSON.stringify(snapshot, null, 2), 'utf-8')
  console.log(`\n✅ Production snapshot successfully saved to: ${backupFile}`)
}

backupProductionDb()
  .catch((err) => {
    console.error('Backup failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
