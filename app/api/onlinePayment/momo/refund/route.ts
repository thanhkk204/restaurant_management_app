// pages/api/momo-refund.js
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { orderId, amount, transId, requestId, reason } = body;
  console.log(body)
    // Thông tin cơ bản
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const partnerCode = "MOMO";

    // Tạo chữ ký
    // const rawSignature = `accessKey=${accessKey}&amount=${amount}&description=${reason}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}&transId=${orderId}`;
    const rawSignature = `accessKey=${accessKey}&amount=${amount}&description=${reason}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}&transId=${transId}`;
    //signature
    const crypto = await import("crypto")
    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex")

      console.log("--------------------SIGNATURE----------------")
      console.log(signature)
    // Tạo payload yêu cầu hoàn tiền
    const requestBody = JSON.stringify({
      partnerCode,
      orderId,
      requestId,
      amount,
      transId,
      lang: "vi",
      description: reason,
      signature
    });


    const https = await import('https');
    const options = {
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/v2/gateway/api/refund',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };

    const refundResponse = await new Promise((resolve, reject) => {
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

    return NextResponse.json({ data: refundResponse }, { status: 200 });
  } catch (error) {
    console.log('Internal error', error);
    return NextResponse.json({ data: 'Something went wrong with the MoMo refund request' }, { status: 500 });
  }
};
