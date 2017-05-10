# passbook.js
## Little passbook factory. More passbooks, less code.
### Install
Download this repo, or install via npm
`npm install passbook.js`
### Preraring keys and certificates

#### Pass Type ID

Go to [Apple Developer's portal](https://developer.apple.com/) and get your iOS Pass Type ID. If you are using MacOS, export it's key as *.pem file. Be sure that your certificate is signed on the apple developer's portal. Please, use [official passbook documentation](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/PassKit_PG/Chapters/YourFirst.html#//apple_ref/doc/uid/TP40012195-CH2-SW1) to do that properly.

Note, that if youre are not using MacOS, you should generate Certificate Signing Request (*.csr) file manually. Here is [the guide](http://www.rackspace.com/knowledge_center/article/generate-a-csr-with-openssl). I've tried to do that stuff using Fedora. It's possible with SSL but a bit more difficult though.
Run this in console (if you are not using MacOS keychain).
```openssl x509 -inform der -in pass.cer -out certificate.pem```
It will convert the pass.cer to a .pem format the APNS will understand.
```openssl pkcs12 -nocerts -in pkey.p12 -out pkey.pem```
It will ask some secret passphrase. Please, remember it, because we will need it later. Then we just need to concatenate the files. Type in Terminal:
```cat certificate.pem pkey.pem > cert.pem```

Also, [this commands](https://www.sslshopper.com/article-most-common-openssl-commands.html) can help you.

#### Apple Worldwide Developer Relations Certification Authority

You'll need to get AppleWWDRCA.cer file [here](https://www.apple.com/certificateauthority/). Then, convert it into pem file using keychain or this command:
```openssl x509 -inform der -in AppleAWWDRCA.cer -out wwdr.pem```

Also, you can prepare keys, using module's function. Just put both AppleWWDRCA.cer and signed p12 file into one directory ```prepareKeys(path-to-directory-with-AppleWWDRCA.cer-and-*.p12-file-signed-with-your-passTypeId.cer);```. 
It runs node script from [this](https://github.com/assaf/node-passbook) module.

Finally, you'll get the directory with wwrd.pem and Certificates.pem (signed with Pass Type ID) files and one passphrase, you should keep in mind.

### Preparing Passbook stuff

Check out official documentation to know how passbook structure looks like. You'll definetely need min. configurations such as icon and logo pictures, pass.json file. Also Apple requires pictures for Retina displays. To get examples, check out official [passbook materials](https://developer.apple.com/devcenter/download.action?path=/ios/passbook_support_materials/passbook_materials.dmg).

The idea of this module was that in some cases you need to create lots of passbooks without big changes, for example some great amount of same passbooks with different serial numbers. For these needs we will store all passbook resources in one folder, all keys - in other. All data is readed from pass.json file, so, please, be sure, that your pass.json file *is valid*.

### Hey ho, let's go!

To sign passbook, use following code:
```
var passbook_js = require('passbook.js');   //Our module

passbook_js.createPassbook(type, resorces, keys, password);
// type for passbook type (for example, coupon, boarding ticket, etc)
// resources - path to folder with passbook resources
// keys - path to folder with keys
// password - password for Certificates.pem file
```

It will create pass.pkpass file in root directory of your server //TODO: save the stuff in other directories. Signing logic was taken from [this module](https://github.com/danmilon/passbookster)

Check out if it's valid using the iOS simulator. To send it from your server, be sure, that you set MIME type correctly. To set it in express, add following code to your server.js file ```express.static.mime.define({'application/vnd.apple.pkpass': ['pkpass']});```

Now you're awesome! Stay tuned.

