// api接口页面
import server from './request.js'
// 管理员登陆
export const adminLogin = (userName, password) => {
  return server({
    url: '/admin/login',
    method: 'post',
    data: {
      user_name: userName,
      password
    }
  })
}
// 管理员退出
export const singout = () => {
  return server({
    url: '/admin/singout',
    method: 'get'
  })
}
// 管理员信息
export const adinfo = () => {
  return server({
    url: '/admin/info',
    method: 'get'
  })
}

// 某日API请求量
export const apiCount = (date) => {
  return server({
    url: `/statis/api/${date}/count`,
    method: 'get'
  })
}

// 获取所有API请求量
export const allApiCount = () => {
  return server({
    url: '/statis/api/count',
    method: 'get'
  })
}

// 获取某天用户注册量
export const userCount = (date) => {
  return server({
    url: `/statis/user/${date}/count`,
    method: 'get'
  })
}

// 获取所有用户注册量
export const allUserCount = () => {
  return server({
    url: '/v1/users/count',
    method: 'get'
  })
}

// 获取某天订单数量
export const orderCount = (date) => {
  return server({
    url: `/statis/order/${date}/count`,
    method: 'get'
  })
}

// 获取所有订单数量
export const allOrderCount = () => {
  return server({
    url: '/bos/orders/count',
    method: 'get'
  })
}

// 获取某天管理员注册量
export const adminCount = (date) => {
  return server({
    url: `/statis/admin/${date}/count`,
    method: 'get'
  })
}

// 获取所有管理员数量
export const allAdminCount = () => {
  return server({
    url: '/admin/count',
    method: 'get'
  })
}

// 用户列表
export const allUser = (limit, offset) => {
  return server({
    url: '/v1/users/list',
    method: 'get',
    params: {
      limit,
      offset
    }
  })
}

// 管理员列表
export const allAdmin = (limit, offset) => {
  return server({
    url: '/admin/all',
    method: 'get',
    params: {
      limit,
      offset
    }
  })
}

// 获取餐馆列表
export const shopList = (latitude, longitude, offset, limit) => {
  return server({
    url: '/shopping/restaurants',
    method: 'get',
    params: {
      latitude,
      longitude,
      offset,
      limit
    }
  })
}

// 餐馆数量
export const allShopCount = () => {
  return server({
    url: '/shopping/restaurants/count',
    method: 'get'
  })
}

// 餐馆种类列表
export const shopCategory = (latitude, longitude) => {
  return server({
    url: '/shopping/v2/restaurant/category',
    method: 'get',
    params: {
      latitude,
      longitude
    }
  })
}

// 更新餐馆信息
export const updateShop = (id, name, address, description, phone, imagePath, category) => {
  return server({
    url: 'shopping/updateshop',
    method: 'post',
    data: {
      // 餐馆id
      id,
      // 餐馆名称
      name,
      // 餐馆地址
      address,
      // 餐馆介绍 可选
      description,
      // 联系电话
      phone,
      // 餐馆图片地址
      image_path: imagePath,
      // 餐馆分类
      category
    }
  })
}

// 删除餐馆
export const deleteShop = (restaurantId) => {
  return server({
    // restaurant_id是餐馆id
    url: `shopping/restaurant/${restaurantId}`,
    method: 'delete'
  })
}

// 获取食品列表
export const foodList = (limit, offset, restautantId) => {
  return server({
    url: '/shopping/v2/foods',
    method: 'get',
    params: {
      limit,
      offset,
      restautant_id: restautantId
    }
  })
}

// 获取食品数量
export const foodCount = () => {
  return server({
    url: '/shopping/v2/foods/count',
    method: 'get'
  })
}

// 获取menu列表
export const getMenu = (restaurantId) => {
  return server({
    url: '/shopping/v2/menu',
    method: 'get',
    params: {
      restaurant_id: restaurantId
    }
  })
}

// 获取食品种类详情
export const foodInfo = (category_id) => {
  return server({
    url: `/shopping/v2/menu/${category_id}`,
    method: 'get'
  })
}

// 更新食品
export const upFood = (item_id, name, image_path, restaurant_id, category_id, specfoods) => {
  return server({
    url: '/shopping/v2/updatefood',
    method: 'post',
    data: {
      item_id,
      name,
      image_path,
      restaurant_id,
      category_id,
      specfoods
    }
  })
}

// 餐馆详情
export const shopInfo = (shopid) => {
  return server({
    url: `/shopping/restaurant/${shopid}`,
    method: 'get'
  })
}

// 删除食品
export const delFood = (foodId) => {
  return server({
    url: `/shopping/v2/food/${foodId}`,
    method: 'delete'
  })
}

// 获取订单列表
export const orderList = (limit, offset) => {
  return server({
    url: '/bos/orders',
    method: 'get',
    params: {
      limit,
      offset
    }
  })
}

// 获取地址信息
export const addressInfo = (address_id) => {
  return server({
    url: `/v1/addresse/${address_id}`,
    method: 'get'
  })
}

// 获取用户信息
export const userInfo = (user_id) => {
  return server({
    url: `/v1/user/${user_id}`,
    method: 'get'
  })
}

// y必选，n可选
// name             餐馆名称 y
// address          餐馆地址 y
// phone            联系电话 y
// latitude         纬度     y
// longitude        经度     y
// category         食品分类 y
// image_path       店铺图片地址 y
// float_delivery_fee   运费 y
// float_minimum_order_amout  起送价 y
// description      餐馆简介 n
// promotion_info   餐馆标语 n
// is_premium       品牌商铺 n 默认false
// delivery_mode    支持蜂鸟专送 n 默认false
// new              新开店铺  n 默认false
// bao              支持保险  n 默认false
// zhun             准时达   n  默认false
// piao             开发票 n 默认false
// startTime        开始营业时间 n
// endTime          结束营业时间 n
// business_license_image 营业执照图片地址  n
// catering_service_license_image 餐饮服务许可证图片地址
// activities       商铺活动  n

export const addShop = (
  name,
  address,
  phone,
  latitude,
  longitude,
  category,
  image_path,
  float_delivery_fee,
  float_minimum_order_amout,
  description,
  promotion_info,
  is_premium,
  delivery_mode,
  isnew,
  bao,
  zhun,
  piao,
  startTime,
  endTime,
  business_license_image,
  catering_service_license_image,
  activities
) => {
  return server({
    url: '/shopping/addshop',
    method: 'post',
    data: {
      name,
      address,
      phone,
      latitude,
      longitude,
      category,
      image_path,
      float_delivery_fee,
      float_minimum_order_amout,
      description,
      promotion_info,
      is_premium,
      delivery_mode,
      bao,
      zhun,
      piao,
      startTime,
      endTime,
      business_license_image,
      catering_service_license_image,
      activities
    }
  })
}

// 获取当前店铺食品种类
export const nowCategory = (restaurant_id) => {
  return server({
    url: `/shopping/getcategory/${restaurant_id}`,
    method: 'get'
  })
}

// 添加食品种类
export const addCategory = (name, description, restaurant_id) => {
  return server({
    url: '/shopping/addcategory',
    method: 'post',
    data: {
      name,
      description,
      // 餐馆id
      restaurant_id
    }
  })
}

// 添加食品
export const addFood = (
  // 餐馆id
  restaurant_id,
  // 分类id
  category_id,
  // 食品名称
  name,
  // 图片地址
  image_path,
  // 规格
  specs,
  // 以下都为可选
  // 描述
  description,
  // 活动
  activity,
  // 特点
  attributes
) => {
  return server({
    url: '/shopping/addfood',
    method: 'post',
    data: {
      restaurant_id,
      category_id,
      name,
      image_path,
      specs,
      description,
      activity,
      attributes
    }
  })
}

// 用户分布
export const cityCount = () => {
  return server({
    url: '/v1/user/city/count',
    method: 'get'
  })
}

// 更改用户头像
export const changeUserImg = (id, param) => {
  return server({
    url: `/eus/v1/users/${id}/avatar`,
    method: 'post',
    data: param
  })
}
