'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Loader2,
  CheckCircle2,
  XCircle,
  Download,
  DollarSign
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import DigitalProductModal from '@/components/admin/DigitalProductModal'

export default function DigitalProductsPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const resp = await fetch('/api/admin/digital-products')
      if (resp.ok) {
        const data = await resp.json()
        setProducts(data)
      }
    } catch (e) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const resp = await fetch(`/api/admin/digital-products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      })
      if (resp.ok) {
        toast.success('Product status updated')
        fetchProducts()
      }
    } catch (e) {
      toast.error('Failed to update status')
    }
  }

  const deleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    try {
      const resp = await fetch(`/api/admin/digital-products/${id}`, {
        method: 'DELETE'
      })
      if (resp.ok) {
        toast.success('Product deleted')
        fetchProducts()
      }
    } catch (e) {
      toast.error('Failed to delete product')
    }
  }

  const openEdit = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const openNew = () => {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  const filteredProducts = products.filter(p => 
    (isAr ? p.nameAr : p.nameEn).toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1 text-start">
          <h1 className="text-3xl font-black text-white tracking-tight">
            {isAr ? 'إدارة المنتجات الرقمية' : 'Digital Products'}
          </h1>
          <p className="text-text-muted font-medium">
            {isAr ? 'إدارة وبيع الملفات الرقمية والخدمات الجاهزة' : 'Manage and sell digital files and assets'}
          </p>
        </div>
        <Button 
          onClick={openNew}
          className="gradient-brand h-14 px-8 rounded-2xl font-black text-lg shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all gap-2"
        >
          <Plus className="w-6 h-6" />
          {isAr ? 'منتج جديد' : 'New Product'}
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 px-2">
        <div className="relative flex-grow group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors rtl:left-auto rtl:right-4" />
          <Input 
            placeholder={isAr ? 'بحث عن منتج...' : 'Search products...'}
            className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-white placeholder:text-white/20 focus:border-brand-orange/50 transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="h-14 px-6 rounded-2xl border-white/10 bg-white/5 text-white font-bold gap-2">
          <Filter className="w-5 h-5 text-brand-pink" />
          {isAr ? 'تصفية' : 'Filter'}
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="glass-card border-white/5 overflow-hidden group hover:border-brand-orange/20 transition-all flex flex-col h-full">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={product.image || '/assets/placeholder.png'} 
                    alt={isAr ? product.nameAr : product.nameEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex gap-2">
                    <Badge className={`${product.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'} backdrop-blur-md px-3 py-1 font-bold`}>
                      {product.isActive ? (isAr ? 'نشط' : 'Active') : (isAr ? 'معطل' : 'Inactive')}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-8 space-y-4 flex-grow text-start">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-white group-hover:text-brand-orange transition-colors">
                        {isAr ? product.nameAr : product.nameEn}
                      </h3>
                      <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">
                        {isAr ? product.descAr : product.descEn}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon" className="text-text-muted hover:text-white rounded-xl hover:bg-white/10">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass-card border-white/10 text-white min-w-[160px] p-2">
                        <DropdownMenuItem 
                          onClick={() => openEdit(product)}
                          className="focus:bg-white/10 rounded-lg py-3 cursor-pointer gap-2 font-bold transition-all"
                        >
                          <Edit2 className="w-4 h-4 text-brand-orange" />
                          {isAr ? 'تعديل المنتج' : 'Edit Product'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => toggleStatus(product.id, product.isActive)}
                          className="focus:bg-white/10 rounded-lg py-3 cursor-pointer gap-2 font-bold transition-all"
                        >
                          {product.isActive ? <XCircle className="w-4 h-4 text-brand-pink" /> : <CheckCircle2 className="w-4 h-4 text-green-400" />}
                          {product.isActive ? (isAr ? 'تعطيل' : 'Deactivate') : (isAr ? 'تفعيل' : 'Activate')}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => deleteProduct(product.id)}
                          className="focus:bg-red-500/10 text-red-400 rounded-lg py-3 cursor-pointer gap-2 font-bold transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                          {isAr ? 'حذف المنتج' : 'Delete Product'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-brand-orange" />
                      </div>
                      <div>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">{isAr ? 'السعر' : 'Price'}</p>
                        <p className="text-xl font-black text-white">{product.price} <span className="text-xs text-text-muted">{product.currency}</span></p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-text-muted hover:text-brand-pink rounded-xl hover:bg-white/10">
                       <Download className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-6">
            <div className="w-24 h-24 rounded-[2rem] bg-white/5 mx-auto flex items-center justify-center animate-pulse">
               <ShoppingBag className="w-12 h-12 text-text-muted/50" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-black text-white">
                {isAr ? 'لا توجد منتجات رقمية' : 'No digital products found'}
              </p>
              <p className="text-text-muted max-w-sm mx-auto">
                {isAr ? 'ابدأ بإضافة أول منتج رقمي لك لبيعه على المنصة.' : 'Start by adding your first digital product to sell on the platform.'}
              </p>
            </div>
          </div>
        )}
      </div>

      <DigitalProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProducts}
        product={selectedProduct}
      />
    </div>
  )
}
