
export const getServices = async (client_district_id: string)=>{
    try {
        const res = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": "c858b1c7-39c7-11ef-8e53-0a00184fe694"
            },
            body: JSON.stringify({
                shop_id:192789,
                from_district: 1802,
                to_district: Number(client_district_id)
            })
        })
        const data = await res.json()
        return {services: data.data}
    } catch (error) {
        console.log("Get service error: ",error)
        return {error: "Some thing went wrong with get services"}
    }
}
export const culculateFree = async (client_district_id: string, client_ward_id: string, service_id: string)=>{
    try {
        const res = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": "c858b1c7-39c7-11ef-8e53-0a00184fe694"
            },
            body: JSON.stringify({
                    from_district_id:1802,
                    from_ward_code:'240206',
                    service_id: Number(service_id),
                    service_type_id:null,
                    to_district_id: Number(client_district_id),
                    to_ward_code: client_ward_id,
                    weight:200,
                    // insurance_value:10000,
                    // cod_failed_amount:2000,
                    coupon: null
            })
        })
        const data = await res.json()
        if(data.code === 400) return {error: "Can't culculate free"}
        return {serviceFee: data.data}
    } catch (error) {
        console.log("Get service error: ",error)
        return {error: "Some thing went wrong with get services"}
    }
}


export const getProvinces = async ()=>{
    try {
        const res = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": "c858b1c7-39c7-11ef-8e53-0a00184fe694"
            },
        })
        const data = await res.json()
        return {provinces: data.data}
    } catch (error) {
        console.log("Get service error: ",error)
        return {error: "Some thing went wrong with get services"}
    }
}
export const getdistricts = async (province_id: string)=>{
    try {
        const res = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": "c858b1c7-39c7-11ef-8e53-0a00184fe694"
            },
            body: JSON.stringify({
                province_id: Number(province_id)
            })
        })
        const data = await res.json()
        return {districts: data.data}
    } catch (error) {
        console.log("Get service error: ",error)
        return {error: "Some thing went wrong with get services"}
    }
}
export const getWards = async (district_id: string)=>{
    try {
        const res = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": "c858b1c7-39c7-11ef-8e53-0a00184fe694"
            },
            body: JSON.stringify({
                district_id: Number(district_id)
            })
        })
        const data = await res.json()
        return {wards: data.data}
    } catch (error) {
        console.log("Get service error: ",error)
        return {error: "Some thing went wrong with get services"}
    }
}