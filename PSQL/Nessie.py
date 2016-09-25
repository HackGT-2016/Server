# This is written for PYTHON 3
# Don't forget to install requests package

import requests
import json
import sys





#apiKey = 'your apiKey here'
#
#url = "http://api.reimaginebanking.com/customers?key=981d8f0a88d1fd6f71c8e56cda6a5350"
#companies = ["Riot", "Activision", "Aksys Games", "Blizzard", "Electronic Arts", "Gameloft", "Konami", "Paradox Interactive", "Rockstar", "Sega", "Slitherine Software", "Take-Two Interactive", "Telltale Games", "Ubisoft", "Warner Brothers", "Zynga"]
#
#for a in companies:
#    payload = {
#        "first_name": str(a),
#        "last_name": "Company",
#        "address" : {
#            "street_number" : "1",
#            "street_name" : "something",
#            "city" : "San Francisco",
#            "state" : "CA",
#            "zip" : "11733"
#        }
#
#    }
## Create a Savings Account
#    response = requests.post( 
#            url, 
#            data=json.dumps(payload),
#            headers={'content-type':'application/json'},
#            )
#
#    if response.status_code == 201:
#            print('account created')


url = "http://api.reimaginebanking.com/customers?key=981d8f0a88d1fd6f71c8e56cda6a5350"
array = ["57e78ab0dbd835571461272b","57e78ab0dbd835571461272c","57e78ab0dbd835571461272d","57e78ab0dbd835571461272e","57e78ab0dbd835571461272f","57e78ab0dbd8355714612730","57e78ab0dbd8355714612731","57e78ab0dbd8355714612732","57e78ab0dbd8355714612733","57e78ab0dbd8355714612734","57e78ab0dbd8355714612735","57e78ab0dbd8355714612736","57e78ab0dbd8355714612737","57e78ab0dbd8355714612738","57e78ab0dbd8355714612739","57e78ab0dbd835571461273a"]
response = requests.get( url, headers={'content-type':'application/json'} )
apiKey = "981d8f0a88d1fd6f71c8e56cda6a5350" 
for i in array: 
    customerId = i
    payload  = {
        "type": "Credit Card",
        "nickname" : "Dont care",
        "rewards" : 0,
        "balance" : 1000
    }
    url = 'http://api.reimaginebanking.com/customers/{}/accounts?key={}'.format(customerId,apiKey) 
    response = requests.post(
        url,
	data = json.dumps(payload),
	headers={'content-type':'application/json'}
    )
    if response.status_code == 201:
            print('account created')
    else:
        print(response.status_code)
