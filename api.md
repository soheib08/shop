## Routes:

`note`: send token in `Autorization` of header

### `Get profile`

```
URL: \$BASE_URL/user/profile/,
method: GET

response: {
    "profile_details":
        {
            "id": 1,
            "name": "صهیب",
            "family": "محمدی",
            "mail": "soheib.mohammadi95@gmail.com",
            "phoneNumber":"09186548065",
            "addresses":[{
                "dcescription": "شادمان- خیابان شادمهر -خیابان نیک‌روش- بنسبت شهرام ",
                "plaque": "2",
                "postalCode": "۳۲۱۴۵۶۸۷۹۲"
            },{
                "dcescription": "بلوار کشاورز- خیابان کباکیان - کوچه مرتضی نژاد-  ساختمان ۱۴ ",
                "plaque": "۱۴",
                "postalCode": "۵۴۵۱۵۱۵۴۶۵۴۵"
            }],

        }
        ...
}
```

### `Set profile`

```

URL: \$BASE_URL/user/profile/,
method: POST

request:{
    "public_key": "dfhg-dfhg-dfgfd-hbfghnf-km546546fghfg-ghbfg"
    "main_insurance_history" : "3" //optional
    "additional_insurance_history" : "4" //optional
}
response: {
    status: 200,
    public_key: "e6df586b-0b0a-41ae-a166-829bb1bc0092-annual"
}

    below responses have 400 header status

response2: {
    msg: "دیتای ارسالی مشکل دارد",
    detail: "check your sended data"
}
```
