import { NextRequest, NextResponse } from "next/server"


export const POST = async (req: any) => {
    // const { price, doctorId } = req.body
    // const userId = req.userId
  
    // Code của momo payment
     try {
        var accessKey = "F8BBA842ECF85"
        var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
        var orderInfo = "pay with MoMo"
        var partnerCode = "MOMO"
        var redirectUrl = "http://localhost:8888/thanks"
        var ipnUrl = "http://localhost:8888/thanks"
        var requestType = "payWithATM"
        var amount = '100000'
        var orderId = partnerCode + new Date().getTime()
        var requestId = orderId
        var extraData = btoa(JSON.stringify({_id: 'thanh'}))
        var paymentCode =
          "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA=="
        var orderGroupId = ""
        var autoCapture = true
        var lang = "vi"
      
        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature =
          "accessKey=" +
          accessKey +
          "&amount=" +
          amount +
          "&extraData=" +
          extraData +
          "&ipnUrl=" +
          ipnUrl +
          "&orderId=" +
          orderId +
          "&orderInfo=" +
          orderInfo +
          "&partnerCode=" +
          partnerCode +
          "&redirectUrl=" +
          redirectUrl +
          "&requestId=" +
          requestId +
          "&requestType=" +
          requestType
        //puts raw signature
        console.log("--------------------RAW SIGNATURE----------------")
        console.log(rawSignature)
        //signature
        const crypto = await import("crypto")
        var signature = crypto
          .createHmac("sha256", secretKey)
          .update(rawSignature)
          .digest("hex")
        console.log("--------------------SIGNATURE----------------")
        console.log(signature)
      
        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
          partnerCode: partnerCode,
          partnerName: "Test",
          storeId: "MomoTestStore",
          requestId: requestId,
          amount: amount,
          orderId: orderId,
          orderInfo: orderInfo,
          redirectUrl: redirectUrl,
          ipnUrl: ipnUrl,
          lang: lang,
          requestType: requestType,
          autoCapture: autoCapture,
          extraData: extraData,
          orderGroupId: orderGroupId,
          signature: signature,
        })
        //Create the HTTPS objects
        const https = await import("https")
        const options = {
          hostname: "test-payment.momo.vn",
          port: 443,
          path: "/v2/gateway/api/create",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
          },
        }
        // //Send the request and get the response
        const momoResponse = await new Promise((resolve, reject) => {
            const req = https.request(options, (res) => {
              let data = '';
              res.on('data', (chunk) => {
                data += chunk;
              });
              res.on('end', () => {
                resolve(JSON.parse(data));
              });
            });
      
            req.on('error', (e) => {
              reject(e);
            });
      
            req.write(requestBody);
            req.end();
          });

        return NextResponse.json({data: momoResponse}, {status: 201})
     } catch (error) {
        console.log('Internal error', error)
        return NextResponse.json({data: 'Some thing went wrong with request momo payment'}, {status: 501})
     }
  }