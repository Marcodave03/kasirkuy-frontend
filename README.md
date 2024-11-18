# Kasirku


Backend
1. Page Owner/Company
Fetch (Owner, Company, Status, duePayment, totalPaid)
2. 






Frontend ERP

npm install --save-dev @svgr/webpack

API Routing

---

http://localhost:8080/api/workers/new_owner --create
http://localhost:8080/api/workers/new_cashier --create
http://localhost:8080/api/workers/new_staff --create
http://localhost:8080/api/workers/set_auth/name

http://localhost:8080/api/companies/new_company -- create
http://localhost:8080/api/companies/edit_name -- update
http://localhost:8080/api/companies/id -- read by id
http://localhost:8080/api/companies/ -- read

http://localhost:8080/api/categories/new_category --create
http://localhost:8080/api/categories/category --read
http://localhost:8080/api/categories/edit_name --update
http://localhost:8080/api/categories/category/id --delete

http://localhost:8080/api/items/new_product --create
http://localhost:8080/api/items/edit_name --update name
http://localhost:8080/api/items/edit_price --update price
http://localhost:8080/api/items/edit_category --update category
http://localhost:8080/api/items/edit_sales --update sales
http://localhost:8080/api/items/product/edit_stock --edit stock
http://localhost:8080/api/items/product/id --delete
http://localhost:8080/api/items/products/id

http://localhost:8080/api/trasactions/new_transaction --create
http://localhost:8080/api/trasactions/new_detail --create
http://localhost:8080/api/trasactions/id --read by id
http://localhost:8080/api/trasactions/edit_proof --update proof

---

{{Setup 1}}

POST http://localhost:8080/api/workers/new_owner --create
{
"name":"Marco Davincent Dermawan",
"is_authorized":"true",
"email":"marcodave03@gmail.com",
"password":"12345"
}
POST http://localhost:8080/api/workers/new_cashier --create
{
"name":"Rivanna",
"email":"rivanna@gmail.com",
"password":"!12345"
}
POST http://localhost:8080/api/workers/new_staff --create
{
"name": "Nurul",
"email": "Nurul@gmail.com",
"password": "!12345",
"salary": 0.0
}
{
"name": "Vivi",
"email": "vivi@gmail.com",
"password": "!12345",
"salary": 50000
}
POST http://localhost:8080/api/workers/set_auth/{name}

{{Setup 2}}

POST http://localhost:8080/api/companies/new_company -- create
{
"name": "Dakkochi Nongki",
"due_payment": "2024-02-25",
"ownerId": 1
}
PATCH http://localhost:8080/api/companies/edit_name -- update
{
"companyId":"",
}

GET http://localhost:8080/api/companies/{id} -- read by id

GET http://localhost:8080/api/companies/ -- read

{{Setup 3}}

POST http://localhost:8080/api/categories/new_category --create
{  
 "name":"Beverage",
"companyId":"1"
}
{  
 "name":"Drinks",
"companyId":"1"
}

GET http://localhost:8080/api/categories/category --read

PATCH http://localhost:8080/api/categories/edit_name --update

DELETE http://localhost:8080/api/categories/category/id --delete

{{Setup 4}}
POST http://localhost:8080/api/items/new_product --create
{
"name":"bbq chicken",
"price":"20000",
"categoryId":"1",
"sales":"",
}

{
"name":"Lemon Drink",
"price":"10000",
"categoryId":"2",
"sales":""
}

GET http://localhost:8080/api/items/products

PATCH http://localhost:8080/api/items/edit_name --update name
{
"ItemId":"",
"name":"",
"price";"",
"categoryId":"",
"sales":"",
"stock":"",
}

DELETE http://localhost:8080/api/items/product/id --delete

{{Setup 5}}
POST http://localhost:8080/api/trasactions/new_transaction --create
{
"companyId":"",
"worker":"", //get name
"customer":"", //get name
"date":"",
"phone":"",
"paymentproof":"",
"invoice":"",
"total_price":"",
}

POST http://localhost:8080/api/trasactions/new_detail --create product detail/list
{
"name":"",
"price":"",
"quantity":"",
"transactionId":"",
"productname":"",
"stock":"",
"total_sales":"",
}

GET http://localhost:8080/api/trasactions/id --read by id

PATCH http://localhost:8080/api/trasactions/edit_proof --update proof
{
"transactionId":"",
"proof":"",
}
