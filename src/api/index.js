import request from "../utils/request.js"

export const getCode = (data) => {
    return request.post('/get/code', data)
}
export const userAuthentication = (data) => {
    return request.post('user/authentication', data)
}
export const login = (data) => {
    return request.post('/login', data)
}
export const authAdmin = (params) => {
    return request.get('auth/admin', { params })
}
export const userGetmenu = () => {
    return request.get('user/getmenu')
}
export const userSetmenu = (data) => {
    return request.post('user/setmenu', data)
}
export const menuList = (params) => {
    return request.get('menu/list', { params })
}
export const menuSelectlist = () => {
    return request.get('menu/selectlist')
}
export const updateUser = (data) => {
    return request.post('update/user',data)
}
export const menuPermissions = () => {
    return request.get('menu/permissions')
}
export const companionList=(params)=>{
    return request.get('companion/list',{params})
}
export const photoList=()=>{
    return request.get('photo/list')
}
export const companion=(data)=>{
    return request.post('companion',data)
}
export const deleteCompanion=(data)=>{
    return request.post('delete/companion',data)
}
export const report=()=>{
    return request.get('report')
}