const router=require("express").Router()
const location=require('./data')

const getNearBy=(lat,lon)=>{
    const data=location.filter((item)=>{
        var dist_points = (lat - item.location.lat) * (lat - item.location.lat) + (lon - item.location.lon) * (lon - item.location.lon)
        return dist_points<=200*200
    })
    return data
}

router.get('/api/getLocation/:lat&:lon',(req,res)=>{
    const lat=req.params.lat
    const lon=req.params.lon
    res.send(getNearBy(lat,lon))
})

module.exports=router
