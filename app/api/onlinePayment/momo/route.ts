import { NextRequest, NextResponse } from "next/server"


export const POST = async (req: any) => {
    const body = await req.json()
    const { deposit, checkout_id , clientName} = body
    console.log('deposit', deposit);
    console.log('checkout_id', checkout_id);
    console.log('clientName', clientName);

    const nameParts = clientName.trim().split(' ');
    const firstName = nameParts[nameParts.length - 1];
    // Code của momo payment
     try {
        var accessKey = process.env.MOMO_ACCESS_KEY
        var secretKey = process.env.MOMO_SECRETE_KEY as string
        var orderInfo = "pay with MoMo"
        var partnerCode = process.env.MOMO_PARTNER_CODE as string
        var redirectUrl = process.env.MOMO_REDIRECT_URL
        var ipnUrl = process.env.MOMO_IPN_URL
        var requestType = "payWithATM"
        var amount = deposit
        var orderId = partnerCode + new Date().getTime()
        var requestId = firstName + new Date().getTime()
        var extraData = btoa(JSON.stringify({checkout_id: checkout_id}))
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
        //signature
        const crypto = await import("crypto")
        var signature = crypto
          .createHmac("sha256", secretKey)
          .update(rawSignature)
          .digest("hex")
      
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
          hostname: process.env.MOMO_BASE_URL,
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

