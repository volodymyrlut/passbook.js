#passbook.js

###Preraring keys and certificates

######Go to [Apple Developer's portal](https://developer.apple.com/) and get your iOS Pass Type ID. If you are using MacOS, export it's key as *.pem file. Be sure that your certificate is signed on the apple developer's portal. Please, use [official passbook documentation](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/PassKit_PG/Chapters/YourFirst.html#//apple_ref/doc/uid/TP40012195-CH2-SW1) to do that prorerly.

######I've also tried to do that stuff using Fedora. It's possible with SSL but a bit more difficult though.

######Run this in console.
`openssl x509 -in pass.cer -inform DER -out pass.pem -outform PEM`
######Also, [this commands] (https://www.sslshopper.com/article-most-common-openssl-commands.html) can help you.
