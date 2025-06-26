// "use client"

// import type React from "react"
// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Lock, Package, Percent, Clock, CreditCard, MapPin, Plus, Edit, Trash2, Users, Tag, Zap } from "lucide-react"
// import { RestaurantProvider, useRestaurant } from "@/contexts/restaurant-context"
// import { NotificationToast } from "@/components/notification-toast"

// // Función para obtener fecha en zona horaria de Colombia
// const getColombianDate = (date?: Date) => {
//   const targetDate = date || new Date()
//   return new Date(targetDate.toLocaleString("en-US", { timeZone: "America/Bogota" }))
// }

// // Función para formatear fecha para input date en zona horaria de Colombia
// const formatDateForInput = (date: Date) => {
//   const colombianDate = getColombianDate(date)
//   return colombianDate.toISOString().split("T")[0]
// }

// // Función para crear fecha desde input considerando zona horaria de Colombia
// const createDateFromInput = (dateString: string) => {
//   return new Date(dateString + "T00:00:00-05:00") // Colombia UTC-5
// }

// function AdminPageContent() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [credentials, setCredentials] = useState({ username: "", password: "" })
//   const [editingProduct, setEditingProduct] = useState<any>(null)
//   const [editingPromotion, setEditingPromotion] = useState<any>(null)
//   const [editingCategory, setEditingCategory] = useState<any>(null)
//   const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null)
  
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     image: "",
//     category: "",
//     popular: false,
//     enabled: true,
//     stock: "available" as "available" | "out_of_stock",
//   })
  
//   const [newPromotion, setNewPromotion] = useState({
//     productId: 0,
//     title: "",
//     description: "",
//     image: "",
//     promotionPrice: 0,
//     discountPercent: 0,
//     startDate: formatDateForInput(new Date()),
//     endDate: formatDateForInput(new Date(Date.now() + 24 * 60 * 60 * 1000)), // 24 horas por defecto
//     enabled: true,
//     featured: false,
//     isFlashSale: false,
//     flashDurationMinutes: 60,
//   })

//   const [newCategory, setNewCategory] = useState({
//     name: "",
//     icon: "",
//     enabled: true,
//     order: 1,
//   })

//   const { 
//     data, 
//     updateData, 
//     addProduct, 
//     updateProduct, 
//     deleteProduct, 
//     addPromotion, 
//     updatePromotion, 
//     deletePromotion,
//     addCategory,
//     updateCategory,
//     deleteCategory
//   } = useRestaurant()

//   const showNotification = (message: string, type: "success" | "error") => {
//     setNotification({ message, type })
//   }

//   const validateProduct = () => {
//     if (!newProduct.name.trim()) {
//       showNotification("El nombre del producto es requerido", "error")
//       return false
//     }
//     if (!newProduct.description.trim()) {
//       showNotification("La descripción del producto es requerida", "error")
//       return false
//     }
//     if (newProduct.price <= 0) {
//       showNotification("El precio debe ser mayor a 0", "error")
//       return false
//     }
//     if (!newProduct.category) {
//       showNotification("Debe seleccionar una categoría", "error")
//       return false
//     }
//     return true
//   }

//   const validatePromotion = () => {
//     if (!newPromotion.productId) {
//       showNotification("Debe seleccionar un producto", "error")
//       return false
//     }
//     if (newPromotion.promotionPrice <= 0) {
//       showNotification("El precio de promoción es requerido y debe ser mayor a 0", "error")
//       return false
//     }
//     const product = data.products.find(p => p.id === newPromotion.productId)
//     if (product && newPromotion.promotionPrice >= product.price) {
//       showNotification("El precio de promoción debe ser menor al precio original", "error")
//       return false
//     }
//     if (!newPromotion.startDate || !newPromotion.endDate) {
//       showNotification("Las fechas de inicio y fin son requeridas", "error")
//       return false
//     }
//     const startDate = createDateFromInput(newPromotion.startDate)
//     const endDate = createDateFromInput(newPromotion.endDate)
//     if (endDate <= startDate) {
//       showNotification("La fecha de fin debe ser posterior a la fecha de inicio", "error")
//       return false
//     }
//     if (newPromotion.isFlashSale && (!newPromotion.flashDurationMinutes || newPromotion.flashDurationMinutes <= 0)) {
//       showNotification("La duración de la promoción relámpago debe ser mayor a 0 minutos", "error")
//       return false
//     }
//     return true
//   }

//   const validateCategory = () => {
//     if (!newCategory.name.trim()) {
//       showNotification("El nombre de la categoría es requerido", "error")
//       return false
//     }
//     if (!newCategory.icon.trim()) {
//       showNotification("El icono de la categoría es requerido", "error")
//       return false
//     }
//     const existingCategory = data.categories.find(c => c.name.toLowerCase() === newCategory.name.toLowerCase())
//     if (existingCategory) {
//       showNotification("Ya existe una categoría con ese nombre", "error")
//       return false
//     }
//     return true
//   }

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (credentials.username === "admin" && credentials.password === "admin123") {
//       setIsAuthenticated(true)
//       showNotification("Sesión iniciada correctamente", "success")
//     } else {
//       showNotification("Credenciales incorrectas", "error")
//     }
//   }

//   const updateRestaurant = (field: string, value: any) => {
//     const updatedData = {
//       ...data,
//       restaurant: {
//         ...data.restaurant,
//         [field]: value,
//       },
//     }
//     updateData(updatedData)
//     showNotification("Configuración actualizada", "success")
//   }

//   const toggleProduct = (id: number) => {
//     const product = data.products.find((p) => p.id === id)
//     if (product) {
//       updateProduct(id, { enabled: !product.enabled })
//       showNotification(`Producto ${!product.enabled ? "activado" : "desactivado"}`, "success")
//     }
//   }

//   const updateProductStock = (id: number, stock: "available" | "out_of_stock") => {
//     updateProduct(id, { stock })
//     showNotification(`Stock actualizado a ${stock === "available" ? "disponible" : "agotado"}`, "success")
//   }

//   const togglePromotion = (id: number) => {
//     const promotion = data.promotions.find((p) => p.id === id)
//     if (promotion) {
//       updatePromotion(id, { enabled: !promotion.enabled })
//       showNotification(`Promoción ${!promotion.enabled ? "activada" : "desactivada"}`, "success")
//     }
//   }

//   const toggleCategory = (id: string) => {
//     const category = data.categories.find((c) => c.id === id)
//     if (category) {
//       updateCategory(id, { enabled: !category.enabled })
//       showNotification(`Categoría ${!category.enabled ? "activada" : "desactivada"}`, "success")
//     }
//   }

//   const toggleSection = (section: string) => {
//     const updatedData = {
//       ...data,
//       sections: {
//         ...data.sections,
//         [section]: { enabled: !data.sections[section as keyof typeof data.sections].enabled },
//       },
//     }
//     updateData(updatedData)
//     showNotification("Sección actualizada", "success")
//   }

//   const togglePaymentMethod = (id: number) => {
//     const updatedData = {
//       ...data,
//       paymentMethods: data.paymentMethods.map((method) =>
//         method.id === id ? { ...method, enabled: !method.enabled } : method,
//       ),
//     }
//     updateData(updatedData)
//     showNotification("Método de pago actualizado", "success")
//   }

//   const toggleDeliveryZone = (id: number) => {
//     const updatedData = {
//       ...data,
//       deliveryZones: data.deliveryZones.map((zone) => (zone.id === id ? { ...zone, enabled: !zone.enabled } : zone)),
//     }
//     updateData(updatedData)
//     showNotification("Zona de domicilio actualizada", "success")
//   }

//   const updateHours = (day: string, field: string, value: any) => {
//     const updatedData = {
//       ...data,
//       hours: {
//         ...data.hours,
//         [day]: {
//           ...data.hours[day],
//           [field]: value,
//         },
//       },
//     }
//     updateData(updatedData)
//     showNotification("Horarios actualizados", "success")
//   }

//   const updateStats = (field: string, value: any) => {
//     const updatedData = {
//       ...data,
//       stats: {
//         ...data.stats,
//         [field]: value,
//       },
//     }
//     updateData(updatedData)
//     showNotification("Estadísticas actualizadas", "success")
//   }

//   const handleAddProduct = () => {
//     if (!validateProduct()) return

//     addProduct(newProduct)
//     setNewProduct({
//       name: "",
//       description: "",
//       price: 0,
//       image: "",
//       category: "",
//       popular: false,
//       enabled: true,
//       stock: "available",
//     })
//     showNotification("Producto agregado correctamente", "success")
//   }

//   const handleEditProduct = () => {
//     if (editingProduct) {
//       if (!editingProduct.name.trim() || !editingProduct.description.trim() || editingProduct.price <= 0) {
//         showNotification("Todos los campos son requeridos y el precio debe ser mayor a 0", "error")
//         return
//       }
//       updateProduct(editingProduct.id, editingProduct)
//       setEditingProduct(null)
//       showNotification("Producto actualizado correctamente", "success")
//     }
//   }

//   const handleAddPromotion = () => {
//     if (!validatePromotion()) return

//     // Calcular porcentaje de descuento automáticamente
//     const product = data.products.find(p => p.id === newPromotion.productId)
//     if (product) {
//       const discountPercent = Math.round(((product.price - newPromotion.promotionPrice) / product.price) * 100)
      
//       let endDate = newPromotion.endDate
//       if (newPromotion.isFlashSale) {
//         // Para promociones relámpago, calcular fecha de fin basada en duración
//         const startDate = createDateFromInput(newPromotion.startDate)
//         const flashEndDate = new Date(startDate.getTime() + (newPromotion.flashDurationMinutes || 60) * 60 * 1000)
//         endDate = formatDateForInput(flashEndDate)
//       }

//       addPromotion({
//         ...newPromotion,
//         discountPercent,
//         endDate,
//       })
      
//       setNewPromotion({
//         productId: 0,
//         title: "",
//         description: "",
//         image: "",
//         promotionPrice: 0,
//         discountPercent: 0,
//         startDate: formatDateForInput(new Date()),
//         endDate: formatDateForInput(new Date(Date.now() + 24 * 60 * 60 * 1000)),
//         enabled: true,
//         featured: false,
//         isFlashSale: false,
//         flashDurationMinutes: 60,
//       })
//       showNotification("Promoción agregada correctamente", "success")
//     }
//   }

//   const handleEditPromotion = () => {
//     if (editingPromotion) {
//       if (editingPromotion.promotionPrice <= 0) {
//         showNotification("El precio de promoción debe ser mayor a 0", "error")
//         return
//       }
//       const product = data.products.find(p => p.id === editingPromotion.productId)
//       if (product && editingPromotion.promotionPrice >= product.price) {
//         showNotification("El precio de promoción debe ser menor al precio original", "error")
//         return
//       }
//       const startDate = createDateFromInput(editingPromotion.startDate)
//       const endDate = createDateFromInput(editingPromotion.endDate)
//       if (endDate <= startDate) {
//         showNotification("La fecha de fin debe ser posterior a la fecha de inicio", "error")
//         return
//       }

//       // Recalcular porcentaje de descuento
//       if (product) {
//         const discountPercent = Math.round(((product.price - editingPromotion.promotionPrice) / product.price) * 100)
//         editingPromotion.discountPercent = discountPercent
//       }

//       updatePromotion(editingPromotion.id, editingPromotion)
//       setEditingPromotion(null)
//       showNotification("Promoción actualizada correctamente", "success")
//     }
//   }

//   const handleAddCategory = () => {
//     if (!validateCategory()) return

//     const maxOrder = Math.max(...data.categories.map(c => c.order), 0)
//     addCategory({
//       ...newCategory,
//       order: maxOrder + 1,
//     })
//     setNewCategory({
//       name: "",
//       icon: "",
//       enabled: true,
//       order: 1,
//     })
//     showNotification("Categoría agregada correctamente", "success")
//   }

//   const handleEditCategory = () => {
//     if (editingCategory) {
//       if (!editingCategory.name.trim() || !editingCategory.icon.trim()) {
//         showNotification("El nombre y el icono son requeridos", "error")
//         return
//       }
//       updateCategory(editingCategory.id, editingCategory)
//       setEditingCategory(null)
//       showNotification("Categoría actualizada correctamente", "success")
//     }
//   }

//   // Calcular estadísticas con fechas de Colombia
//   const now = getColombianDate()
//   const totalProducts = data.products.length
//   const activeProducts = data.products.filter((p) => p.enabled).length
//   const outOfStockProducts = data.products.filter((p) => p.stock === "out_of_stock").length
//   const totalPromotions = data.promotions.length
//   const activePromotions = data.promotions.filter((p) => {
//     if (!p.enabled) return false
//     const startDate = createDateFromInput(p.startDate)
//     const endDate = createDateFromInput(p.endDate)
//     return now >= startDate && now <= endDate
//   }).length
//   const enabledPaymentMethods = data.paymentMethods.filter((m) => m.enabled).length
//   const enabledDeliveryZones = data.deliveryZones.filter((z) => z.enabled).length
//   const totalCategories = data.categories.length
//   const enabledCategories = data.categories.filter((c) => c.enabled).length

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center p-4">
//         <Card className="w-full max-w-md bg-gray-900 border-red-600/20">
//           <CardHeader className="text-center">
//             <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Lock className="w-8 h-8 text-white" />
//             </div>
//             <CardTitle className="text-white text-2xl">Panel Administrativo</CardTitle>
//             <p className="text-gray-400">Mar Burger</p>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleLogin} className="space-y-4">
//               <Input
//                 type="text"
//                 placeholder="Usuario"
//                 value={credentials.username}
//                 onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//                 className="bg-black border-red-600/20 text-white"
//                 required
//               />
//               <Input
//                 type="password"
//                 placeholder="Contraseña"
//                 value={credentials.password}
//                 onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                 className="bg-black border-red-600/20 text-white"
//                 required
//               />
//               <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
//                 Iniciar Sesión
//               </Button>
//               <p className="text-xs text-gray-500 text-center">Usuario: admin | Contraseña: admin123</p>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-black p-2 sm:p-4">
//       {/* Notificaciones */}
//       {notification && (
//         <NotificationToast
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification(null)}
//         />
//       )}

//       <div className="container mx-auto max-w-7xl">
//         {/* Header con estadísticas */}
//         <div className="mb-6 sm:mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-white">Panel Administrativo</h1>
//               <p className="text-gray-400 text-sm sm:text-base">Mar Burger - Gestión completa del sitio web</p>
//             </div>
//             <Button
//               onClick={() => setIsAuthenticated(false)}
//               variant="outline"
//               className="border-red-600/20 text-red-500 hover:bg-red-600/10 w-full sm:w-auto"
//             >
//               Cerrar Sesión
//             </Button>
//           </div>

//           {/* Estadísticas principales - Responsive */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4">
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardContent className="p-2 sm:p-4 text-center">
//                 <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-1 sm:mb-2" />
//                 <div className="text-lg sm:text-2xl font-bold text-white">{totalProducts}</div>
//                 <div className="text-xs text-gray-400">Total Productos</div>
//               </CardContent>
//             </Card>
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardContent className="p-2 sm:p-4 text-center">
//                 <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mx-auto mb-1 sm:mb-2" />
//                 <div className="text-lg sm:text-2xl font-bold text-white">{activeProducts}</div>
//                 <div className="text-xs text-gray-400">Activos</div>
//               </CardContent>
//             </Card>
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardContent className="p-2 sm:p-4 text-center">
//                 <Package className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-1 sm:mb-2" />
//                 <div className="text-lg sm:text-2xl font-bold text-white">{outOfStockProducts}</div>
//                 <div className="text-xs text-gray-400">Sin Stock</div>
//               </CardContent>
//             </Card>
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardContent className="p-2 sm:p-4 text-center">
//                 <Percent className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 mx-auto mb-1 sm:mb-2" />
//                 <div className="text-lg sm:text-2xl font-bold text-white">{activePromotions}</div>
//                 <div className="text-xs text-gray-400">Promociones</div>
//               </CardContent>
//             </Card>
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardContent className="p-2 sm:p-4 text-center">
//                 <Tag className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 mx-auto mb-1 sm:mb-2" />
//                 <div className="text-lg sm:text-2xl font-bold text-white">{enabledCategories}</div>
//                 <div className="text-xs text-gray-400">Categorías</div>
//               </CardContent>
//             </Card>
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardContent className="p-2 sm:p-4 text-center">
//                 <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-500 mx-auto mb-1 sm:mb-2" />
//                 <div className="text-lg sm:text-2xl font-bold text-white">{enabledPaymentMethods}</div>
//                 <div className="text-xs text-gray-400">Métodos Pago</div>
//               </CardContent>
//             </Card>
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardContent className="p-2 sm:p-4 text-center">
//                 <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-pink-500 mx-auto mb-1 sm:mb-2" />
//                 <div className="text-lg sm:text-2xl font-bold text-white">{enabledDeliveryZones}</div>
//                 <div className="text-xs text-gray-400">Zonas</div>
//               </CardContent>
//             </Card>
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardContent className="p-2 sm:p-4 text-center">
//                 <Users className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-500 mx-auto mb-1 sm:mb-2" />
//                 <div className="text-lg sm:text-2xl font-bold text-white">{data.stats.happyCustomers}</div>
//                 <div className="text-xs text-gray-400">Clientes</div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         <Tabs defaultValue="products" className="space-y-4 sm:space-y-6">
//           <TabsList className="bg-gray-900 border-red-600/20 grid grid-cols-4 sm:grid-cols-7 w-full">
//             <TabsTrigger value="products" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
//               <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Productos</span>
//               <span className="sm:hidden">Prod</span>
//             </TabsTrigger>
//             <TabsTrigger value="categories" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
//               <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Categorías</span>
//               <span className="sm:hidden">Cat</span>
//             </TabsTrigger>
//             <TabsTrigger value="promotions" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
//               <Percent className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Promociones</span>
//               <span className="sm:hidden">Promo</span>
//             </TabsTrigger>
//             <TabsTrigger value="hours" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
//               <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Horarios</span>
//               <span className="sm:hidden">Hora</span>
//             </TabsTrigger>
//             <TabsTrigger value="payments" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
//               <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Pagos</span>
//               <span className="sm:hidden">Pago</span>
//             </TabsTrigger>
//             <TabsTrigger value="delivery" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
//               <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Domicilio</span>
//               <span className="sm:hidden">Dom</span>
//             </TabsTrigger>
//             <TabsTrigger value="settings" className="data-[state=active]:bg-red-600 text-xs sm:text-sm">
//               <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Config</span>
//               <span className="sm:hidden">Conf</span>
//             </TabsTrigger>
//           </TabsList>

//           {/* Productos */}
//           <TabsContent value="products">
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
//                 <CardTitle className="text-white text-lg sm:text-xl">Gestionar Productos</CardTitle>
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Agregar Producto
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="bg-gray-900 border-red-600/20 w-[95vw] max-w-md mx-auto">
//                     <DialogHeader>
//                       <DialogTitle className="text-white">Nuevo Producto</DialogTitle>
//                     </DialogHeader>
//                     <div className="space-y-4 max-h-[70vh] overflow-y-auto">
//                       <Input
//                         placeholder="Nombre del producto"
//                         value={newProduct.name}
//                         onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                       <Textarea
//                         placeholder="Descripción"
//                         value={newProduct.description}
//                         onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//                         className="bg-black border-red-600/20 text-white"
//                         rows={3}
//                       />
//                       <Input
//                         type="number"
//                         placeholder="Precio"
//                         value={newProduct.price}
//                         onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseInt(e.target.value) || 0 })}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                       <Input
//                         placeholder="URL de la imagen"
//                         value={newProduct.image}
//                         onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                       <Select
//                         value={newProduct.category}
//                         onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
//                       >
//                         <SelectTrigger className="bg-black border-red-600/20 text-white">
//                           <SelectValue placeholder="Seleccionar categoría" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {data.categories.filter(c => c.enabled).map((category) => (
//                             <SelectItem key={category.id} value={category.id}>
//                               {category.icon} {category.name}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <div className="flex items-center space-x-2">
//                         <Switch
//                           checked={newProduct.popular}
//                           onCheckedChange={(checked) => setNewProduct({ ...newProduct, popular: checked })}
//                         />
//                         <label className="text-white text-sm">Producto Popular</label>
//                       </div>
//                       <Button onClick={handleAddProduct} className="w-full bg-green-600 hover:bg-green-700">
//                         Agregar Producto
//                       </Button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {data.products.map((product) => (
//                   <div
//                     key={product.id}
//                     className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-black rounded-lg border border-red-600/10 space-y-3 sm:space-y-0"
//                   >
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-white font-semibold truncate">{product.name}</h3>
//                       <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>
//                       <div className="flex flex-wrap items-center gap-2 mt-2">
//                         <span className="text-red-500 font-bold">${product.price.toLocaleString()}</span>
//                         <Badge variant="secondary" className="text-xs">
//                           {data.categories.find(c => c.id === product.category)?.icon} {data.categories.find(c => c.id === product.category)?.name}
//                         </Badge>
//                         {product.popular && (
//                           <Badge className="bg-yellow-600 text-white text-xs">
//                             Popular
//                           </Badge>
//                         )}
//                         <Badge 
//                           className={`text-xs ${
//                             product.enabled 
//                               ? "bg-green-600 text-white" 
//                               : "bg-gray-600 text-gray-300"
//                           }`}
//                         >
//                           {product.enabled ? "Activo" : "Inactivo"}
//                         </Badge>
//                       </div>
//                     </div>
//                     <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
//                       <Select
//                         value={product.stock}
//                         onValueChange={(value: "available" | "out_of_stock") => updateProductStock(product.id, value)}
//                       >
//                         <SelectTrigger className="w-full sm:w-32 bg-gray-800 border-red-600/20 text-white text-xs">
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="available">Disponible</SelectItem>
//                           <SelectItem value="out_of_stock">Agotado</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <div className="flex space-x-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => setEditingProduct(product)}
//                           className="border-blue-600/20 text-blue-500 flex-1 sm:flex-none"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => deleteProduct(product.id)}
//                           className="border-red-600/20 text-red-500 flex-1 sm:flex-none"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                         <div className="flex items-center">
//                           <Switch checked={product.enabled} onCheckedChange={() => toggleProduct(product.id)} />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Categorías */}
//           <TabsContent value="categories">
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
//                 <CardTitle className="text-white text-lg sm:text-xl">Gestionar Categorías</CardTitle>
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Agregar Categoría
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="bg-gray-900 border-red-600/20 w-[95vw] max-w-md mx-auto">
//                     <DialogHeader>
//                       <DialogTitle className="text-white">Nueva Categoría</DialogTitle>
//                     </DialogHeader>
//                     <div className="space-y-4">
//                       <Input
//                         placeholder="Nombre de la categoría"
//                         value={newCategory.name}
//                         onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                       <Input
//                         placeholder="Icono (emoji)"
//                         value={newCategory.icon}
//                         onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                       <p className="text-xs text-gray-400">Usa un emoji como icono, por ejemplo: 🍔, 🍟, 🥤</p>
//                       <div className="flex items-center space-x-2">
//                         <Switch
//                           checked={newCategory.enabled}
//                           onCheckedChange={(checked) => setNewCategory({ ...newCategory, enabled: checked })}
//                         />
//                         <label className="text-white text-sm">Categoría Activa</label>
//                       </div>
//                       <Button onClick={handleAddCategory} className="w-full bg-green-600 hover:bg-green-700">
//                         Agregar Categoría
//                       </Button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {data.categories.sort((a, b) => a.order - b.order).map((category) => (
//                   <div
//                     key={category.id}
//                     className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-black rounded-lg border border-red-600/10 space-y-3 sm:space-y-0"
//                   >
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center space-x-3">
//                         <span className="text-2xl">{category.icon}</span>
//                         <div>
//                           <h3 className="text-white font-semibold">{category.name}</h3>
//                           <p className="text-gray-400 text-sm">
//                             {data.products.filter(p => p.category === category.id).length} productos
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2 mt-2">
//                         <Badge 
//                           className={`text-xs ${
//                             category.enabled 
//                               ? "bg-green-600 text-white" 
//                               : "bg-gray-600 text-gray-300"
//                           }`}
//                         >
//                           {category.enabled ? "Activa" : "Inactiva"}
//                         </Badge>
//                         <Badge variant="secondary" className="text-xs">
//                           Orden: {category.order}
//                         </Badge>
//                       </div>
//                     </div>
//                     <div className="flex space-x-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => setEditingCategory(category)}
//                         className="border-blue-600/20 text-blue-500"
//                       >
//                         <Edit className="w-4 h-4" />
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => deleteCategory(category.id)}
//                         className="border-red-600/20 text-red-500"
//                         disabled={data.products.some(p => p.category === category.id)}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                       <div className="flex items-center">
//                         <Switch checked={category.enabled} onCheckedChange={() => toggleCategory(category.id)} />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Promociones */}
//           <TabsContent value="promotions">
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
//                 <CardTitle className="text-white text-lg sm:text-xl">Gestionar Promociones</CardTitle>
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Agregar Promoción
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="bg-gray-900 border-red-600/20 w-[95vw] max-w-md mx-auto">
//                     <DialogHeader>
//                       <DialogTitle className="text-white">Nueva Promoción</DialogTitle>
//                     </DialogHeader>
//                     <div className="space-y-4 max-h-[70vh] overflow-y-auto">
//                       <Select
//                         value={newPromotion.productId.toString()}
//                         onValueChange={(value) => {
//                           const productId = Number.parseInt(value)
//                           const product = data.products.find(p => p.id === productId)
//                           setNewPromotion({ 
//                             ...newPromotion, 
//                             productId,
//                             // Auto-llenar campos si están vacíos
//                             title: newPromotion.title || (product ? `OFERTA ${product.name.toUpperCase()}` : ""),
//                             description: newPromotion.description || (product ? `Descuento especial en ${product.name}` : ""),
//                           })
//                         }}
//                       >
//                         <SelectTrigger className="bg-black border-red-600/20 text-white">
//                           <SelectValue placeholder="Seleccionar producto" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {data.products.filter(p => p.enabled).map((product) => (
//                             <SelectItem key={product.id} value={product.id.toString()}>
//                               {product.name} - ${product.price.toLocaleString()}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
                      
//                       <Input
//                         placeholder="Título (opcional - usa el del producto si está vacío)"
//                         value={newPromotion.title}
//                         onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
//                         className="bg-black border-red-600/20 text-white"
//                       />
                      
//                       <Textarea
//                         placeholder="Descripción (opcional - usa la del producto si está vacía)"
//                         value={newPromotion.description}
//                         onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
//                         className="bg-black border-red-600/20 text-white"
//                         rows={3}
//                       />
                      
//                       <Input
//                         placeholder="URL de imagen personalizada (opcional)"
//                         value={newPromotion.image}
//                         onChange={(e) => setNewPromotion({ ...newPromotion, image: e.target.value })}
//                         className="bg-black border-red-600/20 text-white"
//                       />
                      
//                       <div className="space-y-2">
//                         <label className="text-white text-sm font-medium">Precio de Promoción *</label>
//                         <Input
//                           type="number"
//                           placeholder="Precio de promoción (requerido)"
//                           value={newPromotion.promotionPrice}
//                           onChange={(e) => setNewPromotion({ ...newPromotion, promotionPrice: Number.parseInt(e.target.value) || 0 })}
//                           className="bg-black border-red-600/20 text-white"
//                           min="1"
//                         />
//                         {newPromotion.productId > 0 && newPromotion.promotionPrice > 0 && (
//                           <p className="text-xs text-gray-400">
//                             Descuento: {Math.round(((data.products.find(p => p.id === newPromotion.productId)?.price || 0) - newPromotion.promotionPrice) / (data.products.find(p => p.id === newPromotion.productId)?.price || 1) * 100)}%
//                           </p>
//                         )}
//                       </div>

//                       <div className="flex items-center space-x-2">
//                         <Switch
//                           checked={newPromotion.isFlashSale}
//                           onCheckedChange={(checked) => setNewPromotion({ ...newPromotion, isFlashSale: checked })}
//                         />
//                         <label className="text-white text-sm">Promoción Relámpago={newPromotion.isFlashSale}
//                           onCheckedChange={(checked) => setNewPromotion({ ...newPromotion, isFlashSale: checked })}
//                         />
//                         <label className="text-white text-sm">Promoción Relámpago</label>
//                       </div>

//                       {newPromotion.isFlashSale && (
//                         <div className="space-y-2">
//                           <label className="text-white text-sm">Duración en minutos</label>
//                           <Input
//                             type="number"
//                             placeholder="Duración en minutos"
//                             value={newPromotion.flashDurationMinutes}
//                             onChange={(e) => setNewPromotion({ ...newPromotion, flashDurationMinutes: Number.parseInt(e.target.value) || 60 })}
//                             className="bg-black border-red-600/20 text-white"
//                             min="1"
//                           />
//                           <p className="text-xs text-gray-400">
//                             <Zap className="w-3 h-3 inline mr-1" />
//                             La fecha de fin se calculará automáticamente
//                           </p>
//                         </div>
//                       )}

//                       {!newPromotion.isFlashSale && (
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <label className="text-white text-sm">Fecha inicio</label>
//                             <Input
//                               type="date"
//                               value={newPromotion.startDate}
//                               onChange={(e) => setNewPromotion({ ...newPromotion, startDate: e.target.value })}
//                               className="bg-black border-red-600/20 text-white"
//                             />
//                           </div>
//                           <div>
//                             <label className="text-white text-sm">Fecha fin</label>
//                             <Input
//                               type="date"
//                               value={newPromotion.endDate}
//                               onChange={(e) => setNewPromotion({ ...newPromotion, endDate: e.target.value })}
//                               className="bg-black border-red-600/20 text-white"
//                             />
//                           </div>
//                         </div>
//                       )}

//                       <div className="flex items-center space-x-2">
//                         <Switch
//                           checked={newPromotion.featured}
//                           onCheckedChange={(checked) => setNewPromotion({ ...newPromotion, featured: checked })}
//                         />
//                         <label className="text-white text-sm">Promoción Destacada</label>
//                       </div>
                      
//                       <Button onClick={handleAddPromotion} className="w-full bg-green-600 hover:bg-green-700">
//                         Agregar Promoción
//                       </Button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {data.promotions.map((promotion) => {
//                   const product = data.products.find((p) => p.id === promotion.productId)
//                   const startDate = createDateFromInput(promotion.startDate)
//                   const endDate = createDateFromInput(promotion.endDate)
//                   const isActive = now >= startDate && now <= endDate && promotion.enabled
//                   const isExpired = now > endDate
//                   const isPending = now < startDate

//                   // Usar título del producto si no tiene título personalizado
//                   const displayTitle = promotion.title || (product ? `OFERTA ${product.name.toUpperCase()}` : "Promoción")
//                   const displayDescription = promotion.description || (product ? `Descuento especial en ${product.name}` : "")

//                   return (
//                     <div
//                       key={promotion.id}
//                       className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-black rounded-lg border border-red-600/10 space-y-3 sm:space-y-0"
//                     >
//                       <div className="flex-1 min-w-0">
//                         <div className="flex flex-wrap items-center gap-2 mb-2">
//                           <h3 className="text-white font-semibold">{displayTitle}</h3>
//                           {promotion.featured && (
//                             <Badge className="bg-yellow-600 text-white text-xs">
//                               Destacada
//                             </Badge>
//                           )}
//                           {promotion.isFlashSale && (
//                             <Badge className="bg-orange-600 text-white text-xs">
//                               <Zap className="w-3 h-3 mr-1" />
//                               Relámpago
//                             </Badge>
//                           )}
//                           <Badge
//                             className={`text-xs ${
//                               isActive 
//                                 ? "bg-green-600 text-white" 
//                                 : isPending 
//                                 ? "bg-blue-600 text-white" 
//                                 : "bg-gray-600 text-gray-300"
//                             }`}
//                           >
//                             {isActive ? "Activa" : isPending ? "Programada" : "Vencida"}
//                           </Badge>
//                         </div>
//                         <p className="text-gray-400 text-sm mb-2 line-clamp-2">{displayDescription}</p>
//                         <div className="flex flex-wrap items-center gap-2 text-sm">
//                           <span className="text-white">Producto: {product?.name}</span>
//                           <span className="text-gray-500 line-through">${product?.price.toLocaleString()}</span>
//                           <span className="text-green-500 font-bold">${promotion.promotionPrice.toLocaleString()}</span>
//                           <span className="text-red-500 font-bold">{promotion.discountPercent}% OFF</span>
//                         </div>
//                         <div className="text-xs text-gray-400 mt-1">
//                           {startDate.toLocaleDateString("es-CO")} - {endDate.toLocaleDateString("es-CO")}
//                           {promotion.isFlashSale && promotion.flashDurationMinutes && (
//                             <span className="ml-2">({promotion.flashDurationMinutes} min)</span>
//                           )}
//                         </div>
//                       </div>
//                       <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
//                         <div className="flex space-x-2">
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => setEditingPromotion(promotion)}
//                             className="border-blue-600/20 text-blue-500 flex-1 sm:flex-none"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             onClick={() => deletePromotion(promotion.id)}
//                             className="border-red-600/20 text-red-500 flex-1 sm:flex-none"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                           <div className="flex items-center">
//                             <Switch checked={promotion.enabled} onCheckedChange={() => togglePromotion(promotion.id)} />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Horarios */}
//           <TabsContent value="hours">
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardHeader>
//                 <CardTitle className="text-white text-lg sm:text-xl">Horarios de Atención</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {Object.entries(data.hours).map(([day, hours]) => {
//                   const dayNames = {
//                     monday: "Lunes",
//                     tuesday: "Martes",
//                     wednesday: "Miércoles",
//                     thursday: "Jueves",
//                     friday: "Viernes",
//                     saturday: "Sábado",
//                     sunday: "Domingo",
//                   }

//                   return (
//                     <div
//                       key={day}
//                       className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-black rounded-lg space-y-3 sm:space-y-0"
//                     >
//                       <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-1">
//                         <span className="text-white font-medium w-full sm:w-24">
//                           {dayNames[day as keyof typeof dayNames]}
//                         </span>
//                         <div className="flex items-center space-x-2 w-full sm:w-auto">
//                           <Input
//                             type="time"
//                             value={hours.open}
//                             onChange={(e) => updateHours(day, "open", e.target.value)}
//                             className="bg-gray-800 border-red-600/20 text-white flex-1 sm:w-32"
//                           />
//                           <span className="text-gray-400">-</span>
//                           <Input
//                             type="time"
//                             value={hours.close}
//                             onChange={(e) => updateHours(day, "close", e.target.value)}
//                             className="bg-gray-800 border-red-600/20 text-white flex-1 sm:w-32"
//                           />
//                         </div>
//                       </div>
//                       <Switch
//                         checked={hours.enabled}
//                         onCheckedChange={(checked) => updateHours(day, "enabled", checked)}
//                       />
//                     </div>
//                   )
//                 })}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Métodos de Pago */}
//           <TabsContent value="payments">
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardHeader>
//                 <CardTitle className="text-white text-lg sm:text-xl">Métodos de Pago</CardTitle>
//               </CardHeader>
//               <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {data.paymentMethods.map((method) => (
//                   <div
//                     key={method.id}
//                     className="flex items-center justify-between p-3 sm:p-4 bg-black rounded-lg border border-red-600/10"
//                   >
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-white font-medium">{method.name}</h3>
//                       <p className="text-gray-400 text-sm">{method.description}</p>
//                     </div>
//                     <Switch checked={method.enabled} onCheckedChange={() => togglePaymentMethod(method.id)} />
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Zonas de Domicilio */}
//           <TabsContent value="delivery">
//             <Card className="bg-gray-900 border-red-600/20">
//               <CardHeader>
//                 <CardTitle className="text-white text-lg sm:text-xl">Zonas de Domicilio</CardTitle>
//               </CardHeader>
//               <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {data.deliveryZones.map((zone) => (
//                   <div
//                     key={zone.id}
//                     className="flex items-center justify-between p-3 sm:p-4 bg-black rounded-lg border border-red-600/10"
//                   >
//                     <div className="flex-1 min-w-0">
//                       <h3 className="text-white font-medium">{zone.name}</h3>
//                       <p className="text-gray-400 text-sm">
//                         ${zone.price.toLocaleString()} - {zone.time}
//                       </p>
//                     </div>
//                     <Switch checked={zone.enabled} onCheckedChange={() => toggleDeliveryZone(zone.id)} />
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Configuración */}
//           <TabsContent value="settings">
//             <div className="grid gap-4 sm:gap-6">
//               <Card className="bg-gray-900 border-red-600/20">
//                 <CardHeader>
//                   <CardTitle className="text-white text-lg sm:text-xl">Configuración General</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label className="text-white text-sm">Nombre del Restaurante</label>
//                       <Input
//                         value={data.restaurant.name}
//                         onChange={(e) => updateRestaurant("name", e.target.value)}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-white text-sm">Teléfono</label>
//                       <Input
//                         value={data.restaurant.phone}
//                         onChange={(e) => updateRestaurant("phone", e.target.value)}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-white text-sm">Descripción</label>
//                     <Textarea
//                       value={data.restaurant.description}
//                       onChange={(e) => updateRestaurant("description", e.target.value)}
//                       className="bg-black border-red-600/20 text-white"
//                       rows={3}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-white text-sm">Dirección</label>
//                     <Input
//                       value={data.restaurant.address}
//                       onChange={(e) => updateRestaurant("address", e.target.value)}
//                       className="bg-black border-red-600/20 text-white"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-white text-sm">Instagram</label>
//                     <Input
//                       value={data.restaurant.instagram}
//                       onChange={(e) => updateRestaurant("instagram", e.target.value)}
//                       className="bg-black border-red-600/20 text-white"
//                     />
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="bg-gray-900 border-red-600/20">
//                 <CardHeader>
//                   <CardTitle className="text-white text-lg sm:text-xl">Estadísticas del Sitio</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label className="text-white text-sm">Clientes Felices</label>
//                       <Input
//                         type="number"
//                         value={data.stats.happyCustomers}
//                         onChange={(e) => updateStats("happyCustomers", Number.parseInt(e.target.value) || 0)}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-white text-sm">Tiempo Promedio</label>
//                       <Input
//                         type="text"
//                         value={data.stats.averageTime}
//                         onChange={(e) => updateStats("averageTime", e.target.value)}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <label className="text-white text-sm">Calificación</label>
//                       <Input
//                         type="number"
//                         step="0.1"
//                         min="0"
//                         max="5"
//                         value={data.stats.rating}
//                         onChange={(e) => updateStats("rating", Number.parseFloat(e.target.value) || 0)}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Switch
//                         checked={data.stats.enabled}
//                         onCheckedChange={(checked) => updateStats("enabled", checked)}
//                       />
//                       <label className="text-white text-sm">Mostrar estadísticas</label>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="bg-gray-900 border-red-600/20">
//                 <CardHeader>
//                   <CardTitle className="text-white text-lg sm:text-xl">Secciones del Sitio</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   {Object.entries(data.sections).map(([section, config]) => (
//                     <div key={section} className="flex items-center justify-between p-3 bg-black rounded-lg">
//                       <span className="text-white capitalize">{section.replace("_", " ")}</span>
//                       <Switch checked={config.enabled} onCheckedChange={() => toggleSection(section)} />
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
//         </Tabs>

//         {/* Diálogos de edición */}
//         {editingProduct && (
//           <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
//             <DialogContent className="bg-gray-900 border-red-600/20 w-[95vw] max-w-md mx-auto">
//               <DialogHeader>
//                 <DialogTitle className="text-white">Editar Producto</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4 max-h-[70vh] overflow-y-auto">
//                 <Input
//                   placeholder="Nombre del producto"
//                   value={editingProduct.name}
//                   onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
//                   className="bg-black border-red-600/20 text-white"
//                 />
//                 <Textarea
//                   placeholder="Descripción"
//                   value={editingProduct.description}
//                   onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
//                   className="bg-black border-red-600/20 text-white"
//                   rows={3}
//                 />
//                 <Input
//                   type="number"
//                   placeholder="Precio"
//                   value={editingProduct.price}
//                   onChange={(e) =>
//                     setEditingProduct({ ...editingProduct, price: Number.parseInt(e.target.value) || 0 })
//                   }
//                   className="bg-black border-red-600/20 text-white"
//                 />
//                 <Input
//                   placeholder="URL de la imagen"
//                   value={editingProduct.image}
//                   onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
//                   className="bg-black border-red-600/20 text-white"
//                 />
//                 <Select
//                   value={editingProduct.category}
//                   onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
//                 >
//                   <SelectTrigger className="bg-black border-red-600/20 text-white">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {data.categories.filter(c => c.enabled).map((category) => (
//                       <SelectItem key={category.id} value={category.id}>
//                         {category.icon} {category.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     checked={editingProduct.popular}
//                     onCheckedChange={(checked) => setEditingProduct({ ...editingProduct, popular: checked })}
//                   />
//                   <label className="text-white text-sm">Producto Popular</label>
//                 </div>
//                 <Button onClick={handleEditProduct} className="w-full bg-blue-600 hover:bg-blue-700">
//                   Guardar Cambios
//                 </Button>
//               </div>
//             </DialogContent>
//           </Dialog>
//         )}

//         {editingCategory && (
//           <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
//             <DialogContent className="bg-gray-900 border-red-600/20 w-[95vw] max-w-md mx-auto">
//               <DialogHeader>
//                 <DialogTitle className="text-white">Editar Categoría</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <Input
//                   placeholder="Nombre de la categoría"
//                   value={editingCategory.name}
//                   onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
//                   className="bg-black border-red-600/20 text-white"
//                 />
//                 <Input
//                   placeholder="Icono (emoji)"
//                   value={editingCategory.icon}
//                   onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
//                   className="bg-black border-red-600/20 text-white"
//                 />
//                 <Input
//                   type="number"
//                   placeholder="Orden"
//                   value={editingCategory.order}
//                   onChange={(e) => setEditingCategory({ ...editingCategory, order: Number.parseInt(e.target.value) || 1 })}
//                   className="bg-black border-red-600/20 text-white"
//                 />
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     checked={editingCategory.enabled}
//                     onCheckedChange={(checked) => setEditingCategory({ ...editingCategory, enabled: checked })}
//                   />
//                   <label className="text-white text-sm">Categoría Activa</label>
//                 </div>
//                 <Button onClick={handleEditCategory} className="w-full bg-blue-600 hover:bg-blue-700">
//                   Guardar Cambios
//                 </Button>
//               </div>
//             </DialogContent>
//           </Dialog>
//         )}

//         {editingPromotion && (
//           <Dialog open={!!editingPromotion} onOpenChange={() => setEditingPromotion(null)}>
//             <DialogContent className="bg-gray-900 border-red-600/20 w-[95vw] max-w-md mx-auto">
//               <DialogHeader>
//                 <DialogTitle className="text-white">Editar Promoción</DialogTitle>
//               </DialogHeader>
//               <div className="space-y-4 max-h-[70vh] overflow-y-auto">
//                 <Select
//                   value={editingPromotion.productId.toString()}
//                   onValueChange={(value) =>
//                     setEditingPromotion({ ...editingPromotion, productId: Number.parseInt(value) })
//                   }
//                 >
//                   <SelectTrigger className="bg-black border-red-600/20 text-white">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {data.products.filter(p => p.enabled).map((product) => (
//                       <SelectItem key={product.id} value={product.id.toString()}>
//                         {product.name} - ${product.price.toLocaleString()}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <Input
//                   placeholder="Título de la promoción (opcional)"
//                   value={editingPromotion.title || ""}
//                   onChange={(e) => setEditingPromotion({ ...editingPromotion, title: e.target.value })}
//                   className="bg-black border-red-600/20 text-white"
//                 />
//                 <Textarea
//                   placeholder="Descripción (opcional)"
//                   value={editingPromotion.description || ""}
//                   onChange={(e) => setEditingPromotion({ ...editingPromotion, description: e.target.value })}
//                   className="bg-black border-red-600/20 text-white"
//                   rows={3}
//                 />
//                 <Input
//                   placeholder="URL de imagen personalizada (opcional)"
//                   value={editingPromotion.image || ""}
//                   onChange={(e) => setEditingPromotion({ ...editingPromotion, image: e.target.value })}
//                   className="bg-black border-red-600/20 text-white"
//                 />
//                 <div className="space-y-2">
//                   <label className="text-white text-sm font-medium">Precio de Promoción *</label>
//                   <Input
//                     type="number"
//                     placeholder="Precio de promoción"
//                     value={editingPromotion.promotionPrice}
//                     onChange={(e) =>
//                       setEditingPromotion({ ...editingPromotion, promotionPrice: Number.parseInt(e.target.value) || 0 })
//                     }
//                     className="bg-black border-red-600/20 text-white"
//                     min="1"
//                   />
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     checked={editingPromotion.isFlashSale}
//                     onCheckedChange={(checked) => setEditingPromotion({ ...editingPromotion, isFlashSale: checked })}
//                   />
//                   <label className="text-white text-sm">Promoción Relámpago</label>
//                 </div>
//                 {editingPromotion.isFlashSale && (
//                   <div className="space-y-2">
//                     <label className="text-white text-sm">Duración en minutos</label>
//                     <Input
//                       type="number"
//                       placeholder="Duración en minutos"
//                       value={editingPromotion.flashDurationMinutes || 60}
//                       onChange={(e) => setEditingPromotion({ ...editingPromotion, flashDurationMinutes: Number.parseInt(e.target.value) || 60 })}
//                       className="bg-black border-red-600/20 text-white"
//                       min="1"
//                     />
//                   </div>
//                 )}
//                 {!editingPromotion.isFlashSale && (
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="text-white text-sm">Fecha inicio</label>
//                       <Input
//                         type="date"
//                         value={editingPromotion.startDate}
//                         onChange={(e) => setEditingPromotion({ ...editingPromotion, startDate: e.target.value })}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                     </div>
//                     <div>
//                       <label className="text-white text-sm">Fecha fin</label>
//                       <Input
//                         type="date"
//                         value={editingPromotion.endDate}
//                         onChange={(e) => setEditingPromotion({ ...editingPromotion, endDate: e.target.value })}
//                         className="bg-black border-red-600/20 text-white"
//                       />
//                     </div>
//                   </div>
//                 )}
//                 <div className="flex items-center space-x-2">
//                   <Switch
//                     checked={editingPromotion.featured}
//                     onCheckedChange={(checked) => setEditingPromotion({ ...editingPromotion, featured: checked })}
//                   />
//                   <label className="text-white text-sm">Promoción Destacada</label>
//                 </div>
//                 <Button onClick={handleEditPromotion} className="w-full bg-blue-600 hover:bg-blue-700">
//                   Guardar Cambios
//                 </Button>
//               </div>
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>
//     </div>
//   )
// }

// export default function AdminPage() {
//   return (
//     <RestaurantProvider>
//       <AdminPageContent />
//     </RestaurantProvider>
//   )
// }
