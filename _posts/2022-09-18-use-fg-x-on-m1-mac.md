---
layout: post
title: Use FG-X on M1 Mac
categories: [category, programming]
tags:
---

Slate Digital statement:

>**As of today, Slate Digital plugins are natively M1 compatible****.** 
>
>...
>
>There is one exception to the list, and that’s FG-X. As one of our oldest plugins, FG-X is unfortunately not able to make the jump into full M1 compatibility. We know a lot of producers love FG-X, and we are working diligently on new effects processors that will give you all the precision over your final mix that you’ve come to expect from FG-X.

Unfortunatly, it seems FG-X is not going to be compatible with M1 Mac.  
But there's a way to use FG-X.

> You can still use FG-X on an M1 Mac by using Rosetta. For full instructions on installing and enabling Rosetta, please visit Apple’s article [here](https://support.apple.com/en-us/HT211861).

Rosetta can translate binary from  Intel based application.

It was little complicated for me, so I noted the procedure.

## Install Rosetta

Run this command on your terminal.

```
softwareupdate --install-rosetta
```

To enable Rosetta with Logic, open "Info" and check "Open using Rosetta".

![Screen Shot 2022-09-17 at 14.06.01](https://rikson.imgix.net/Screen Shot 2022-09-17 at 14.06.01.png)

## Install FG-X

I downloaded offline installer from [here](https://app.slatedigital.com/installers).  
And I just followed instractions from the installer.

After installtation, it needs to restart Mac.

## Load FG-X

I opened Logic Pro,  then it got stucked while scanning plugin in my case.  
So I moved "Slate Digital FG-X.component" to Desktop temporarily.  
Then I could open Logic Pro.

![Screen Shot 2022-09-17 at 13.00.18](https://rikson.imgix.net/Screen Shot 2022-09-17 at 13.00.18.png)

Open Plugin Mangaer and click "Reset & Rescan Selection".  
Close Logic Pro and bring back "Slate Digital FG-X.component" from Desktop.

Open Logic Pro and Plugin Manger again.  
Go to Slate Digital Section.

![Screen Shot 2022-09-17 at 13.01.41](https://rikson.imgix.net/Screen Shot 2022-09-17 at 13.01.41.png)

FG-X is unchecked, check and click "Reset & Rescan Selection".  
You will get result on terminal.

I got error:

```
/var/tmp/com.paceap.eden.liscenced/authorization> error: No such file or directory
```

This is because I had not authorized FG-X by iLok Liscense Manager.  
After I authorized and rescan, successfully FG-X got available.

## Disable Rosetta

After Logic Pro recognize FG-X, you can disable rosetta.

![Screen Shot 2022-09-17 at 14.36.12](https://rikson.imgix.net/Screen Shot 2022-09-17 at 14.36.12.png)

## References

- [プラグインのスキャン中にLogicがクラッシュしてしまう](https://support.native-instruments.com/hc/ja/articles/210313905-プラグインのスキャン中にLogicがクラッシュしてしまう)
- [Apple M1チップ環境にネイティブ対応していないプラグインをLogic Proで使用する方法](https://goodmusiclifestyle.com/logicpro-m1-plugin-scan)
