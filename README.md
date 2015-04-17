#passbook.js

###Preraring keys and certificates

####Pass Type ID

######Go to [Apple Developer's portal](https://developer.apple.com/) and get your iOS Pass Type ID. If you are using MacOS, export it's key as *.pem file. Be sure that your certificate is signed on the apple developer's portal. Please, use [official passbook documentation](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/PassKit_PG/Chapters/YourFirst.html#//apple_ref/doc/uid/TP40012195-CH2-SW1) to do that prorerly.
######Note, that if youre are not using MacOS, you should generate Certificate Signing Request (*.csr) file manually. Here is [the guide](http://www.rackspace.com/knowledge_center/article/generate-a-csr-with-openssl). 
######I've tried to do that stuff using Fedora. It's possible with SSL but a bit more difficult though.
######Run this in console (if you are not using MacOS keychain).
`openssl x509 -inform der -in pass.cer -out certificate.pem`
######It will convert the pass.cer to a .pem format the APNS will understand.
`openssl pkcs12 -nocerts -in pkey.p12 -out pkey.pem`
######It will ask some secret passphrase. Please, remember it, because we will need it later. Then we just need to merge the files. Type in Terminal:
`cat certificate.pem pkey.pem > cert.pem`
######Also, [this commands](https://www.sslshopper.com/article-most-common-openssl-commands.html) can help you.

####Apple Worldwide Developer Relations Certification Authority

######You'll need to get AppleWWDRCA.cer file [here](https://www.apple.com/certificateauthority/). Then, convert it into pem file using keychain or this command:
`openssl x509 -inform der -in AppleAWWDRCA.cer -out wwdr.pem`

######Also, you can prepare keys, using module's function `prepareKeys(path-to-directory-with-AppleWWDRCA.cer-and-*.p12-file-signed-with-your-passTypeId.cer)`. It runs node script from [this](https://github.com/assaf/node-passbook) module.
#####Finally, you'll get the directory with wwrd.pem and Certificates.pem (signed with Pass Type ID) files and one passphrase, you should keep in mind.

###Preparing Passbook stuff

######Check out official documentation to know how passbook structure looks like. You'll definetely need with min configurations such as icon and logo pictures, pass.json file. Also Apple requires pictures for Retina displays 

