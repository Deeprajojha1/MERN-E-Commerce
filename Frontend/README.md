##Related to this    const decoded = JSON.parse(atob(token.split(".")[1])); (In my frontend)
      
JWT ek string hota hai jo 3 parts me hota hai, aur har part dot (.) se separated hota hai.

Format hota hai:
HEADER.PAYLOAD.SIGNATURE

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJ1c2VySWQiOiI2OTYzYjQwZDk0MmE0NTFlZTQ0YThmYzAiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTcwMDYwMDAwMH0.
XyzSignaturePart

Step 1:
token.split(".")
Isse JWT string 3 parts me toot jaata hai:
index 0 → Header
index 1 → Payload
index 2 → Signature

Step 2:
token.split(".")[1]
Isse payload milta hai.
Payload ke andar user ka data hota hai jaise:
userId, token issue time (iat), expiry time (exp)

Lekin payload abhi Base64 encoded hota hai, readable nahi.

Step 3:
atob(payload)
atob ka matlab hota hai Base64 ko normal readable string me convert karna.
Is step ke baad payload aisa dikhta hai:

userId: "6963b40d942a451ee44a8fc0"
iat: 1700000000
exp: 1700600000

Abhi bhi yeh string hoti hai, object nahi.

Step 4:
JSON.parse(...)
Is step me string ko JavaScript object bana diya jaata hai.

Ab data aise hota hai:
decoded.userId
decoded.iat
decoded.exp

Step 5:
decoded.userId
Isse tumhe directly logged-in user ka userId mil jaata hai.

Is userId ka use frontend me hota hai jaise:
• cart fetch karna
• profile dikhana
• conditional UI (login/logout)