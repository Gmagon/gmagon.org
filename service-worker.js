/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/asset/images/Algolia_logo_bg-dark.jpg","bc8955f20ddb68f68728fe062c09097e"],["/asset/images/Algolia_logo_bg-dark.svg","5d6204ae1fd97ad476fd6d2e68d19483"],["/asset/images/Algolia_logo_bg-white.jpg","6d40466e6f5d92fdeda4eede92e14d72"],["/asset/images/Algolia_logo_bg-white.svg","8e0e9838589ad42418fe5fa23fa7e9f1"],["/asset/images/buy-now.png","ffeb258e158eae3d2f7574edf79addad"],["/asset/images/coupon.png","e1ec573727a93ff97dc1ed0e578c202b"],["/asset/images/free-download.png","6c3f03153529a7d862cdb66d15fc699c"],["/asset/images/gmagon-available.png","1c517d27708c3eb59ad1a374e41fc219"],["/asset/images/home_banner_bg.jpg","68186680bcdd6359131e7130f136064d"],["/asset/images/macBookMockup.jpg","85842e2c96d917cbbee7bed7e7d73cba"],["/asset/images/mas-available.png","d760af328521dc7bbca32cc9a4db044a"],["/asset/images/online_store_bar.png","0532ee0cc81d221291813014e0eea8dc"],["/asset/images/scroll-up.png","62ee33e63fd96a448fd125b0d1b7f6f7"],["/asset/images/support_banner.jpg","7559f35e7e6f12ed2895dd97c80c421d"],["/blog/2017/05/27/a-hero-in-your-heart/tumblr_inline_oqdwxuhPEC1um1hre_540.jpg","c23130cbcdba65e92ccc7f3ab49f986a"],["/blog/2017/05/27/tape-rewind/tumblr_inline_oqgbku5CfS1um1hre_540.jpg","597ecf6b88383ea2c5e2291e716bc3a4"],["/blog/2017/06/02/men-s-deep-voice/17-cumberbatch-2.w1200.h800.jpg","b322b4283b7913e5e67f2ea06b798e72"],["/blog/2017/06/02/men-s-deep-voice/32828-Sherlock_Holmes-science-Benedict_Cumberbatch.jpg","9b256b0657b446b02894e55a2a8d9820"],["/blog/2017/06/02/men-s-deep-voice/3a83e4e9acffd78281f0f75d1acf3c7a.jpg","10faffe480956d938cdb7aa25de722d3"],["/blog/2017/06/02/men-s-deep-voice/QS_143562c43c3e4b198b1b346238af632f.png","78de7b3796feb4f69804d8d848cabb49"],["/blog/2017/06/02/men-s-deep-voice/art-streiber_benedict-cumberbatch_running.jpg","b4ce90e4fde5aa984a4d369ca22d756c"],["/font-awesome-4.7.0/fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["/font-awesome-4.7.0/fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["/font-awesome-4.7.0/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["/font-awesome-4.7.0/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["/font-awesome-4.7.0/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["/icon/apple-touch-icon-114x114.png","d996454f416ca4c95eb349124bc07c5e"],["/icon/apple-touch-icon-120x120.png","e86bf41436b49bc8e03a4784f5d6cb22"],["/icon/apple-touch-icon-144x144.png","0ff4651be5cf5106a5058f74dbaa94bf"],["/icon/apple-touch-icon-152x152.png","d78ce39af0d32ee3ce5df9bcf8e6bd49"],["/icon/apple-touch-icon-57x57.png","44697c2981988ffe082230263e1bc3ec"],["/icon/apple-touch-icon-60x60.png","bc9badd36f30a51bd305bd6fdf910f0e"],["/icon/apple-touch-icon-72x72.png","60fd0f49f045f391fb11132709492222"],["/icon/apple-touch-icon-76x76.png","8928cd4532fdeb472bbaeeaee144044b"],["/icon/apple-touch-icon-precomposed.png","d78ce39af0d32ee3ce5df9bcf8e6bd49"],["/icon/apple-touch-icon.png","d78ce39af0d32ee3ce5df9bcf8e6bd49"],["/icon/favicon-160x160.png","8e689e87d172b2add03dfd4e6f3da7b1"],["/icon/favicon-16x16.png","37a7038e4433d85f1125a0d9cc5d28cf"],["/icon/favicon-196x196.png","9e0c70fdef0c6ee19e56105a0514b36c"],["/icon/favicon-32x32.png","0e47c9195560a221abb85f1ce6c2af09"],["/icon/favicon-96x96.png","4750ec806836209cea1c5a60f715389b"],["/icon/logo.png","ca9a353f0119fc89837056edaaf56c94"],["/icon/mstile-144x144.png","afa0f56f5e5780505bc3ccccf4a5c4df"],["/icon/mstile-150x150.png","87af9060407c79c2ed482c0938a39860"],["/icon/mstile-310x150.png","9e936972fa81551896804a19d10d8dfe"],["/icon/mstile-310x310.png","a556063f10a5a2586f5133aae3c95395"],["/icon/mstile-70x70.png","2f8085eb332b5acbc427b468618702bc"],["/js/mediaelement/mejs-controls.png","2c8bbe30118010bc622cd3dc034a2fe7"],["/js/mediaelement/mejs-controls.svg","6cff5e48123df3489eb45f38ad4206b3"],["/logo.png","ca9a353f0119fc89837056edaaf56c94"],["/logo.svg","542bc440358e244e98e93b0ff9bf6e69"],["/products/screenshots/com.gmagon.app.macos.apngtogifconverter.gif","333ad9a4fe0c74be02dadabd7d4a91a1"],["/products/screenshots/com.gmagon.app.macos.gmagongif.gif","dc84fd3161b287659f7fa29d4b8433bf"],["/products/screenshots/com.gmagon.app.macos.xls2csv.gif","d58434b4364a080f66482f7bfee58d5c"],["/products/screenshots/com.romanysoft.app.macos.ColorPicker2.gif","8e2f397a35d024a1614ee226a434382e"],["/products/screenshots/com.romanysoft.app.macos.EasyPing.gif","7ba045af47278d6c4544904d847091f2"],["/products/screenshots/com.romanysoft.app.macos.NetworkEyes.png","168abe6e182f2d02571f3636c3eb7c67"],["/products/screenshots/com.romanysoft.app.macos.TryToAAC.png","8506e8bea721c851b982868adc6be7ce"],["/products/screenshots/com.romanysoft.app.macos.TryToAMR.png","27dd84121d8992884deca6c64b5fa80f"],["/products/screenshots/com.romanysoft.app.macos.TryToFLAC.png","f4cf3e24150313ea42e7457974f26eec"],["/products/screenshots/com.romanysoft.app.macos.TryToMp3.png","396dc9e09ad6435042deb9519175877e"],["/products/screenshots/com.romanysoft.app.macos.TryToWMA.png","bbcc82a3c7e279a3452a0f487034523f"],["/products/screenshots/com.romanysoft.app.macos.game.SudokuMM.gif","1e7bfe1f10f7ecfa0981d54812e91d0f"],["/products/store/apngtogifconverter/images/logo/logo.png","9002efff89a42143be535bd029dafd79"],["/products/store/apngtogifconverter/images/logo/logo_128x128.png","2878297c5babc631b32bf362667a06a4"],["/products/store/apngtogifconverter/images/logo/logo_200x200.png","3bab3a86124e81edc3d2ac95950d6aea"],["/products/store/apngtogifconverter/images/logo/logo_32x32.png","cf6bcec45fc489f4a3fa8b9707006ad9"],["/products/store/apngtogifconverter/images/logo/logo_500x500.png","edb722589188c3cef60e5881dceec5a0"],["/products/store/apngtogifconverter/images/logo/logo_512x512.png","3907347d9ae20198b71fb28b509b0254"],["/products/store/apngtogifconverter/images/logo/logo_64x64.png","72d237c90f17807e6c87ed996b3a6c52"],["/products/store/apngtogifconverter/images/padimg/apngtogif_icon.gif","b72363d1ced7dd9111d8bcefade27df2"],["/products/store/apngtogifconverter/images/padimg/apngtogifconverter_screenshot.png","19999b063be8021eebaaf76881bafe82"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_animation.gif","e6d952e80e1f20efda44ad054f1263af"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_app1_1440x900.png","edc6a40c348a0d11fa8a9bed5af4c933"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_app2_1440x900.png","9151fdd36a0c2e6cdcd1f3bc5891de03"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_app3_1440x900.png","3bf9217376aee20380ef6061d4f842d4"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_app4_1440x900.png","46c0cc57790cbecbf1bbf3921c67aaae"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_app5_1440x900.png","8aa7c632a0af21383f36c7d8806549af"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_buyonline_1440x900.png","85c59bc660fc5d9ff45d0a534b9a4542"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_interview_1440x900.gif","333ad9a4fe0c74be02dadabd7d4a91a1"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_licensekey_1440x900.png","31a371bfa975e9942606f9f8a250224b"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_onlinestore_1440x900.png","e7c37891efe44765966617286afc0e7a"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_trialversion_1440x900.png","ab6e88ffa9b9b2a054117dbdbbf65dba"],["/products/store/apngtogifconverter/images/screens/apngtogifconverter_web.gif","d14530c5974391b8a6f9a88d54c6bf9a"],["/products/store/colorpicker2/images/logo/logo.png","c503d7565b2f3f5f4b59e09067cecc19"],["/products/store/colorpicker2/images/logo/logo_128x128.png","94aa7cd7a5ba02e538804480e2a6fff3"],["/products/store/colorpicker2/images/logo/logo_200x200.png","a292030d9e1ce81a5799d54b4e19c7d2"],["/products/store/colorpicker2/images/logo/logo_32x32.png","8cadb8bae26e633ccab8c68d1db3e924"],["/products/store/colorpicker2/images/logo/logo_500x500.png","4d577a0226a85e1a8abe165dcd7d9ba9"],["/products/store/colorpicker2/images/logo/logo_512x512.png","1fcb6255b225fc07df60b77fee222d50"],["/products/store/colorpicker2/images/logo/logo_64x64.png","ba19f6ef1ccf5f33b0a86d090afd8622"],["/products/store/colorpicker2/images/screens/colopicker_interview.gif","8e2f397a35d024a1614ee226a434382e"],["/products/store/colorpicker2/images/screens/colorpicker_app1.png","8516ce9ec71431386de7613193a4c8c9"],["/products/store/colorpicker2/images/screens/colorpicker_app2.png","67a3aaf155f079b950cdef53d7725ab0"],["/products/store/colorpicker2/images/screens/colorpicker_app3.png","119f0814652b5ab4923ef88ddfcbc4aa"],["/products/store/colorpicker2/images/screens/colorpicker_app4.png","1508b172c0e5b96eb6e6f4fc724cff98"],["/products/store/colorpicker2/images/screens/colorpicker_buyonline_1440x900.png","41c60ea2b325e70296f478ea2bbe393b"],["/products/store/colorpicker2/images/screens/colorpicker_design_800x500.png","6f50b6b68ad9b69e8d97a11a0a935cd2"],["/products/store/colorpicker2/images/screens/colorpicker_graphic_800x500.jpg","6f05d44f3c3c828876bb860493c5cb50"],["/products/store/colorpicker2/images/screens/colorpicker_licensekey_1440x900.png","2a9f4d744e547ff645ca8fd86e496d30"],["/products/store/colorpicker2/images/screens/colorpicker_onlinestore_1440x900.png","f6ae0bc520cf616605e32310d1681881"],["/products/store/colorpicker2/images/screens/colorpicker_trialversion_1440x900.png","8d9e5d129eeee6c888458417148eb072"],["/products/store/easyping/images/logo/logo.png","777c0f65c1ff93e22be0227fc2abfc23"],["/products/store/easyping/images/logo/logo_128x128.png","27b0977c6cffbd3789e522109a965a06"],["/products/store/easyping/images/logo/logo_200x200.png","a9a8c5ea6334214ff4cb6699e1b55b3d"],["/products/store/easyping/images/logo/logo_32x32.png","872b09656a73c802737dee2c76971140"],["/products/store/easyping/images/logo/logo_500x500.png","72f0efa1dfeca8f023e9ce2b062cf92e"],["/products/store/easyping/images/logo/logo_512x512.png","0e7b94c02194fc85687a35ec2d736162"],["/products/store/easyping/images/logo/logo_64x64.png","4bbb4fe797ae99e81d797fe324de9459"],["/products/store/easyping/images/screens/easyping_1000x442.png","6a4b855014638772aecb90d5f17e6e11"],["/products/store/easyping/images/screens/easyping_app1_1440x900.png","2077d2ca1c6ca58296c406dd870a6a92"],["/products/store/easyping/images/screens/easyping_app2_1440x900.png","5769d2dc1c1c0cf4735e44af6d89c89c"],["/products/store/easyping/images/screens/easyping_app3_1440x900.png","b73cd906e071af8b31eb500e32985f02"],["/products/store/easyping/images/screens/easyping_app4_1440x900.png","3bbc542f1274a9d23e8b2bc9d1587c2c"],["/products/store/easyping/images/screens/easyping_buyonline_1440x900.png","9a9e6e2a8e89f6ed30db5c2cf1253e1d"],["/products/store/easyping/images/screens/easyping_intro_1440x900.gif","7ba045af47278d6c4544904d847091f2"],["/products/store/easyping/images/screens/easyping_licensekey_1440x900.png","c0280f623bdd5664bc2860437156a5eb"],["/products/store/easyping/images/screens/easyping_onlinestore_1440x900.png","bf6d17feed3def9f5635eea8338d1c06"],["/products/store/easyping/images/screens/easyping_trialversion_1440x900.png","943714ead6151ae9e99539ebbbf95cda"],["/products/store/gmagon_css_maker/images/logo/logo.png","57cf1ca47829fbb3024472c2d0b62198"],["/products/store/gmagon_css_maker/images/logo/logo_128x128.png","d1080a7018d4ad81b5aa936c25fce4c9"],["/products/store/gmagon_css_maker/images/logo/logo_200x200.png","3f072925e61a6022a89c289706c142f1"],["/products/store/gmagon_css_maker/images/logo/logo_32x32.png","64aeac0e22dff293fe9adfc41fe33783"],["/products/store/gmagon_css_maker/images/logo/logo_500x500.png","59801fdc4b7f5cfd031e6774ec6b2239"],["/products/store/gmagon_css_maker/images/logo/logo_512x512.png","5f5382ea38156444923deb50bf12617d"],["/products/store/gmagon_css_maker/images/logo/logo_64x64.png","46526a75b3f50498de9d64b39d7958b4"],["/products/store/gmagon_css_maker/images/padimg/cssmaker_icon.gif","0fcd4f8f7e69caf87074f84809664d9b"],["/products/store/gmagon_css_maker/images/padimg/gmagoncssmaker.png","f10d97aefe24572c015ff8e7f5328843"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_background_1440x900.png","8856bd3557925bf176b99de6b8073783"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_basic_1440x900.png","41a29bef2d96d147adf8b6bbf98496a6"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_border_1440x900.png","20081bfb7f026cc3b61d528986c97bf9"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_buyonline_1440x900.png","513ec1f2b08699e32c8ea65520aded37"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_cssnovice_500x300.jpg","7e499f41cee480b3622dee930abdb331"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_entrepreneur_500x300.png","82693c644bb11bc29e2f8fdc5c8e67f8"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_graphic_500x300.jpg","fd18e85de2a5f6bae0e1822c72c5cdc5"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_layers_1440x900.png","61b33cfaf52e02f2a3af011ab17ae4f9"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_licensekey_1440x900.png","978517836d3260e72fcb4c7340e413fa"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_onlinestore_1440x900.png","058f37e922e0a4063eea07f93f66b2aa"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_shadow_1440x900.png","77880ed738274fb676684ce18a931718"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_text_1440x900.png","8ad2354a2060918f50d87a40140d613a"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_trialversion_1440x900.png","d3e2437c708aa660bc2294dd8186395c"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_viewport_1440x900.png","18d94a33c8c9143c80054156ad90a373"],["/products/store/gmagon_css_maker/images/screens/gmagoncssmaker_web_500x300.jpg","a173a66114811f1c9dc57f151765f1cb"],["/products/store/gmagon_gif/images/logo/logo.png","1444c909bdb995040b03c6e6f5cf87cf"],["/products/store/gmagon_gif/images/logo/logo_128x128.png","57353b99ddf88cec9c75e75583c4a1f4"],["/products/store/gmagon_gif/images/logo/logo_200x200.png","fbc04a5a15e35c2e217e30b35326ed9e"],["/products/store/gmagon_gif/images/logo/logo_256x256.png","8fdf254edc06e0f9e4d079db1dac98e6"],["/products/store/gmagon_gif/images/logo/logo_32x32.png","4989898b8762f819cd48d29614b94055"],["/products/store/gmagon_gif/images/logo/logo_500x500.png","cc079f7a534dffeb5fab33cdbb4f7210"],["/products/store/gmagon_gif/images/logo/logo_512x512.png","fb96e74de2dad835e7769495d3b0a872"],["/products/store/gmagon_gif/images/logo/logo_64x64.png","851138d48fc9c764553eb7541663217e"],["/products/store/gmagon_gif/images/logo/logo_96x96.png","fe5bcc77e5a119cf37dedddd45ee207d"],["/products/store/gmagon_gif/images/padimg/gif_icon.gif","e27a979a96ea88655dc238da14df1773"],["/products/store/gmagon_gif/images/padimg/gmagongif_screenshot.png","eec96af8abc9681ed3c6c09d86266f99"],["/products/store/gmagon_gif/images/screens/16445KL0-3.gif","fedb67cd76acd1c688335b4d3798bf76"],["/products/store/gmagon_gif/images/screens/animation_1280.gif","b865888957a6734c009b0a7572074b8d"],["/products/store/gmagon_gif/images/screens/giphy.gif","d292add43bebfdcef1925d39b551cda9"],["/products/store/gmagon_gif/images/screens/gmagongif_app1_1440x900.png","a6fefa5c97feb400c7fd2b1fa28dd9f3"],["/products/store/gmagon_gif/images/screens/gmagongif_app2_1440x900.png","017c5e86a106cedbc12f3795efefe5c8"],["/products/store/gmagon_gif/images/screens/gmagongif_app3_1440x900.png","51ef36cf5561ef53befef06302a9c246"],["/products/store/gmagon_gif/images/screens/gmagongif_app4_1440x900.png","8f4ae1bc4ac7db002d2f23d9238a5efa"],["/products/store/gmagon_gif/images/screens/gmagongif_app5_1440x900.png","b730f48522c6ee4bca1b8673c1eda6f0"],["/products/store/gmagon_gif/images/screens/gmagongif_manuals1_1440x900.png","60665d2d6a1d547b54891ccc70c6d945"],["/products/store/gmagon_gif/images/screens/gmagongif_manuals2_1440x900.png","51ef36cf5561ef53befef06302a9c246"],["/products/store/gmagon_gif/images/screens/gmagongif_manuals3_1440x900.png","8f4ae1bc4ac7db002d2f23d9238a5efa"],["/products/store/gmagon_gif/images/screens/gmagongif_manuals4_1440x900.png","b730f48522c6ee4bca1b8673c1eda6f0"],["/products/store/gmagon_gif/images/screens/gmagonif_intro.gif","dc84fd3161b287659f7fa29d4b8433bf"],["/products/store/networkeyes/images/logo/logo.png","f1a2d3c6d07c4c17927afadd6c76a94c"],["/products/store/networkeyes/images/logo/logo_128x128.png","3cd0f5b7ff67047d68966ba71a6ddd63"],["/products/store/networkeyes/images/logo/logo_200x200.png","730d7b27f4643e98a0412237eb3dd122"],["/products/store/networkeyes/images/logo/logo_32x32.png","3c1d2f86b31adaa8ffe8d9ed8c4718f9"],["/products/store/networkeyes/images/logo/logo_500x500.png","0ad4719417ee34018199c735430bc91e"],["/products/store/networkeyes/images/logo/logo_512x512.png","f54a7d0be62f7044a6b3ebca2856b95f"],["/products/store/networkeyes/images/logo/logo_64x64.png","93401dd4209c15925f85d081138e5b54"],["/products/store/networkeyes/images/screens/networkeyes_1440x900.jpg","8fda00b374d74262cddb8732e32f6c97"],["/products/store/networkeyes/images/screens/networkeyes_800x500.jpg","a8a45129b09b97c24317572fd1a26887"],["/products/store/networkeyes/images/screens/networkeyes_buyonline_1440x900.png","5cce2b6d6a96cd32f46840a96130388c"],["/products/store/networkeyes/images/screens/networkeyes_license_1440x900.png","d1eb783eb90711de675e3c07dc65a578"],["/products/store/networkeyes/images/screens/networkeyes_onlinestore_1440x900.png","4afc13d7ad14a2986815564059d6da17"],["/products/store/networkeyes/images/screens/networkeyes_option_1440x900.png","4c264e667529bcda91664e33ab8d7440"],["/products/store/networkeyes/images/screens/networkeyes_trialversion_1440x900.png","afcbff735ac20321ca089ca599bba434"],["/products/store/sudokumm/images/logo/logo.png","5e291a35c7ee5f0dffa3ce9697cb08d5"],["/products/store/sudokumm/images/logo/logo_128x128.png","344d08ff449b364a3bf53b5f51dfa921"],["/products/store/sudokumm/images/logo/logo_200x200.png","8686db6b61b3af7b50fec5bc7e724b22"],["/products/store/sudokumm/images/logo/logo_32x32.png","5a850997c4d3d2d05fd6afc62e7bb1a1"],["/products/store/sudokumm/images/logo/logo_500x500.png","ef1fa6c5cf3a90c83f8eb0beec0c442c"],["/products/store/sudokumm/images/logo/logo_512x512.png","4ef6f84a917eb681156be5b00d4f44e7"],["/products/store/sudokumm/images/logo/logo_64x64.png","1bcbae8c18be7068de1a71f042b25388"],["/products/store/sudokumm/images/screens/sudoku-app1-1440x900.png","c1004bfec26de3fc46fed26282f9e29b"],["/products/store/sudokumm/images/screens/sudoku-app2-1440x900.png","f9788447dbbf19db03e97554bd90242f"],["/products/store/sudokumm/images/screens/sudoku-app3-1440x900.png","c7c75f35de4c0e66e81146801f77e4d7"],["/products/store/sudokumm/images/screens/sudoku-app4-1440x900.png","a569657abe0de4f8739a8241f5fa17d1"],["/products/store/sudokumm/images/screens/sudoku-app5-1440x900.png","f070f452cd15f4e3da63dbd20e69592c"],["/products/store/sudokumm/images/screens/sudoku_index1_600x350.jpg","b92ed4b09373fb43bfe45d763bce6dfe"],["/products/store/sudokumm/images/screens/sudoku_index2_600x350.jpg","549e9353af42956b88d9480de8eac73f"],["/products/store/sudokumm/images/screens/sudoku_index3_600x350.jpg","c13e28b944f9709eb9e463f24519c66c"],["/products/store/sudokumm/images/screens/sudoku_interview.gif","1e7bfe1f10f7ecfa0981d54812e91d0f"],["/products/store/sudokumm/images/screens/sudukumm_1440x900_0_old.png","ab7840d27dd3baeaed69ecfe1a03d79f"],["/products/store/sudokumm/images/screens/sudukumm_1440x900_1_old.png","5908214737d8d7800587e5cb6d2f38b2"],["/products/store/sudokumm/images/screens/sudukumm_1440x900_2_old.png","f08a2b1842b5bd8d1667b7a2d4e52213"],["/products/store/sudokumm/images/screens/sudukumm_1440x900_3_old.png","c9b445770b20de0ff67a958aa8824dc6"],["/products/store/sudokumm/images/screens/sudukumm_buyonline_1440x900.png","40dc03b0e79f91145633d60fd9850a53"],["/products/store/sudokumm/images/screens/sudukumm_license-1440x900.png","72876337414c38bdf400a012ba40d81b"],["/products/store/sudokumm/images/screens/sudukumm_onlinestore_1440x900.png","043ebf74f00d6b6be7c7e70959e7c3f6"],["/products/store/sudokumm/images/screens/sudukumm_trialversion-1440x900.png","653432890e72d0f2abb9f72462a10554"],["/products/store/trytoaac/images/logo/logo_128x128.png","0a146340895410ad7a9e1f56332b9a15"],["/products/store/trytoaac/images/logo/logo_200x200.png","4b0cc1b5707edd2bf281ab2ac9b499b7"],["/products/store/trytoaac/images/logo/logo_32x32.png","d746ede53b9cba30d4de097d48ab41c9"],["/products/store/trytoaac/images/logo/logo_500x500.png","a9a01d4fbdf0301aa311100db56e8cec"],["/products/store/trytoaac/images/logo/logo_512x512.png","e00f1a3e797629b9147e9d423124b778"],["/products/store/trytoaac/images/logo/logo_64x64.png","bf3c1bf0bf9661a0c947be102ad37380"],["/products/store/trytoaac/images/online_store/logo.png","7a6656616e6723049a72da7c367bacf3"],["/products/store/trytoaac/images/online_store/store_logo_amazon_1500x1500.jpg","e3e329cf055dffc6d857c428b4029b66"],["/products/store/trytoaac/images/online_store/trytoaac_logo_200x200.jpg","9c7a2e49a5a126e5b586141e5aae8cf2"],["/products/store/trytoaac/images/online_store/trytoaac_screenshot_800x500_副本.jpg","bf72801e211ef1f783314e91349b3689"],["/products/store/trytoaac/images/screens/AAC_1440X834.png","77b918728a268092d6007fc1bc75796f"],["/products/store/trytoaac/images/screens/apple addict_840x493.png","01b56a01838f6dc251429773b81e9415"],["/products/store/trytoaac/images/screens/buy online_800x450.png","332f1dd46186536252c59cd8173bde31"],["/products/store/trytoaac/images/screens/coupon_800x450.png","ba52a535e2a06e6a7a0eaf0a73926fd6"],["/products/store/trytoaac/images/screens/license key_800x450.png","08833b9d3af39763faa74ac2259c3ae7"],["/products/store/trytoaac/images/screens/non-apple_840x493.jpg","5b6c19629083ca081ad92981c67de1a0"],["/products/store/trytoaac/images/screens/radio stations_840x493.jpg","abeea7fb1f3b0229e39533b1c431c4e2"],["/products/store/trytoaac/images/screens/trytoaac_screen_1.intro_1440x900.png","090d6175070e5c1da9654c4930e47603"],["/products/store/trytoaac/images/screens/trytoaac_screen_2.choose_1440x900.png","69fb3af7654b2c09aeaa39cef23dd855"],["/products/store/trytoaac/images/screens/trytoaac_screen_3.convert_1440x900.png","7d4acd8a52d7485d17924f0e92313d64"],["/products/store/trytoaac/images/screens/trytoaac_screen_4.save as_1440x900.png","801af91420934af485ef63c6e8dc444c"],["/products/store/trytoaac/images/screens/trytoaac_screen_5.finish_1440x900.png","ad69952b52b0b93913338ef059f03587"],["/products/store/trytoaac/images/screens/trytoaac_trialversion_800x500.png","5dd1c2f29cce40de15a876ff63dacceb"],["/products/store/trytoamr/images/logo/logo.png","795c040f1dfba518e123fa32907a1120"],["/products/store/trytoamr/images/logo/logo_128x128.png","e55231669f9d1471c5eeebdc14f97fc7"],["/products/store/trytoamr/images/logo/logo_200x200.png","31b380d31ba6ad9750a903d251b7734b"],["/products/store/trytoamr/images/logo/logo_32x32.png","be10d2a909db25331f7fa084a4e34819"],["/products/store/trytoamr/images/logo/logo_500x500.png","c622b77ed1948d1b1ea48b4cda2bf5dc"],["/products/store/trytoamr/images/logo/logo_512x512.png","350b86150e3848573043baafdb1f6de8"],["/products/store/trytoamr/images/logo/logo_64x64.png","f18ae2c465acaeeca1ee3e1042f6dbdb"],["/products/store/trytoamr/images/online_store/logo_200x200.png","31b380d31ba6ad9750a903d251b7734b"],["/products/store/trytoamr/images/online_store/store_logo_amazon_1500x1500.jpg","0cef31ba3c51bba7521bd3cc68fadff6"],["/products/store/trytoamr/images/online_store/trytoaac_logo_200x200.jpg","8b318e5bf67a0d51e4f951e232326c5f"],["/products/store/trytoamr/images/online_store/trytoamr_intro_800x500.jpg","9082df12e0a8a639ee26fc1626bbce26"],["/products/store/trytoamr/images/screens/trytoamr_app2_1440x900.png","733c3ac467e9b57e645d2d2c35a63a9d"],["/products/store/trytoamr/images/screens/trytoamr_app3_1440x900.png","3ca6fe219cfa347632e303403ce51a39"],["/products/store/trytoamr/images/screens/trytoamr_app4_1440x900.png","80f5c2478726ea678a1e9daaab18e927"],["/products/store/trytoamr/images/screens/trytoamr_app5_1440x900.png","59a018419cea370381a17436c9a9eeb4"],["/products/store/trytoamr/images/screens/trytoamr_app_1440x900.png","2b07812e2072a7a42131e51e72cc7eca"],["/products/store/trytoamr/images/screens/trytoamr_buy online_800x500.png","54fccef627eae60d1128153834f1c370"],["/products/store/trytoamr/images/screens/trytoamr_coupon_800x500.png","ca53622f2bb743993c5a0245bfac5184"],["/products/store/trytoamr/images/screens/trytoamr_license_800x500.png","c0e6575bf72ccde6b8a55cffd19b1b45"],["/products/store/trytoamr/images/screens/trytoamr_mms_600x350.jpg","e9a9d302247647b7ec79b875c3e59c34"],["/products/store/trytoamr/images/screens/trytoamr_mobile device_600x350.jpg","5d78516a411f9a11d2ac377ece2e5a03"],["/products/store/trytoamr/images/screens/trytoamr_screen_overview_1440x900.png","9e17d47e318a9fee075ca17789881f07"],["/products/store/trytoamr/images/screens/trytoamr_spoken audio_600x350.jpg","c0a7192ab008f54453d4cad8b1d9c4f0"],["/products/store/trytoamr/images/screens/trytoamr_trialversion_800x500.png","9b5460c003d064a86c86a49ff8298019"],["/products/store/trytoflac/images/logo/logo.png","1557f7b59285522e9352f919b14b8289"],["/products/store/trytoflac/images/logo/logo_128x128.png","25fdeb142fc4b408ddd454784977ad03"],["/products/store/trytoflac/images/logo/logo_200x200.png","ff854081cecd343a73ac114f25d89860"],["/products/store/trytoflac/images/logo/logo_32x32.png","468a9f1738b88cac24c8dbd87276ac92"],["/products/store/trytoflac/images/logo/logo_500x500.png","b23cdddaabd6d676dd4bb1d4696916e2"],["/products/store/trytoflac/images/logo/logo_512x512.png","d3e00c00eb17140754f4ad39db92e0fe"],["/products/store/trytoflac/images/logo/logo_64x64.png","6c05ab01f3a724e3af52aef1e3f5912f"],["/products/store/trytoflac/images/online_store/logo_200x200.png","ff854081cecd343a73ac114f25d89860"],["/products/store/trytoflac/images/online_store/store_logo_amazon_1500x1500.jpg","146882acf216bb0837697ab6b99646c4"],["/products/store/trytoflac/images/online_store/store_logo_amazon_200x200.jpg","34249a736e2220a6de150782803416cc"],["/products/store/trytoflac/images/online_store/trytoflac_screen1_1440x900.png","5cfacf36196eb7ebeb36288bb840406c"],["/products/store/trytoflac/images/screens/trytoflac_app1_1440x900.png","764b470deb92e73733e6fc387fd2ec81"],["/products/store/trytoflac/images/screens/trytoflac_app2_1440x900.png","cc73ce58e4cec94a6483347075ee933a"],["/products/store/trytoflac/images/screens/trytoflac_app3_1440x900.png","5ba04929a87beb0295a8685418dfb175"],["/products/store/trytoflac/images/screens/trytoflac_app4_1440x900.png","1c2a15093cd96a100a9ca51e38dceb89"],["/products/store/trytoflac/images/screens/trytoflac_app5_1440x900.png","82c535d3060b5eb588029a6853c631a2"],["/products/store/trytoflac/images/screens/trytoflac_car_1440x900.jpg","6cffb7dc5c68d7826f15951f8e2c364e"],["/products/store/trytoflac/images/screens/trytoflac_couponcode_800x500.png","8e3a2d401be7dbc1d90e1b01c13039fd"],["/products/store/trytoflac/images/screens/trytoflac_home stereo_1440x900.jpg","0851a8e587cacff3c263fb1736bcfdaf"],["/products/store/trytoflac/images/screens/trytoflac_lisencekey_1440x900.png","f2ac8606120e23845f90641238678e9e"],["/products/store/trytoflac/images/screens/trytoflac_music buff_1440x900.jpg","29817dd6bd01a9d77f8ddfdf61750619"],["/products/store/trytoflac/images/screens/trytoflac_onlinestore_800x500.png","2ddc723a9635df21f88a8bf50ff0680c"],["/products/store/trytoflac/images/screens/trytoflac_overview_1440x900.png","c5b3f4c7aa6b55171711bdca896eea5e"],["/products/store/trytoflac/images/screens/trytoflac_portable_1440x900.jpg","c93980a05b29bf55b634074e4f0ae2b4"],["/products/store/trytoflac/images/screens/trytoflac_screen1_800x500.jpg","13b178ac1423f93791248834d2dfdbdd"],["/products/store/trytoflac/images/screens/trytoflac_trialversion_1440x900.png","4aa4efb4d19bc7f08005c2560ce4e94f"],["/products/store/trytomp3/images/logo/logo_128x128.png","e0b3e1061f2e947ff3126d489ec81457"],["/products/store/trytomp3/images/logo/logo_200x200.png","1f2d69ea84d3b62743cbbc89571fb015"],["/products/store/trytomp3/images/logo/logo_32x32.png","f23f1a574db62427026a84a39281ae69"],["/products/store/trytomp3/images/logo/logo_500x500.png","c32b733970357c717a3f2503386f5769"],["/products/store/trytomp3/images/logo/logo_512x512.png","f306029d4f68510d5799633a485348b3"],["/products/store/trytomp3/images/logo/logo_64x64.png","8201a705111afaf98f6af7d46b04d08b"],["/products/store/trytomp3/images/online_store/store_logo_amazon_1500x1500.jpg","6463e07934458a37ffb98792ff38e7ea"],["/products/store/trytomp3/images/online_store/trytomp3_logo_200x200.jpg","b50e2b11149fa72041423ffb2cca3d64"],["/products/store/trytomp3/images/online_store/trytomp3_logo_200x200.png","1f2d69ea84d3b62743cbbc89571fb015"],["/products/store/trytomp3/images/online_store/trytomp3_screen_800x500.jpg","cd104d9d3d30a15e7cc17a302da09f1c"],["/products/store/trytomp3/images/screens/A-Voice.jpg","8aae9318fb372d14df4d387a47d00ea0"],["/products/store/trytomp3/images/screens/Listening-to-music.small_-664x374.jpg","9dd16cdc3fe141308344c6de20da3f77"],["/products/store/trytomp3/images/screens/coupon code_640x374.png","23c89c58c35511f598b4d8e875b57aaa"],["/products/store/trytomp3/images/screens/coupon_640x374.png","8cc30ca419b3e97e3e7b7fbf74f82c55"],["/products/store/trytomp3/images/screens/language.jpg","d85c28a8e07284f6b464a667ab69c463"],["/products/store/trytomp3/images/screens/license key_640x374.png","dec6c1447eef4305026048efbf93f5a9"],["/products/store/trytomp3/images/screens/license key_640x400.png","b0e98bccf140f278305cd49e93a94a1a"],["/products/store/trytomp3/images/screens/movie_664x374.png","5ed0f3715d291428b55cff86ad746fea"],["/products/store/trytomp3/images/screens/s2_664x374.png","5d014248e2020b752d7d0e469af58dda"],["/products/store/trytomp3/images/screens/s2_664x374_op.png","6a2d5a0854f1e237543fc6d87eb38028"],["/products/store/trytomp3/images/screens/trial version_640x400.png","4e45c3a2218b6a290debc7b80bfdf220"],["/products/store/trytomp3/images/screens/trial version_800x500.png","cf3d6c8c82f0d23c5b4e31cb177780c9"],["/products/store/trytomp3/images/screens/trytomp3_screen_1_1440x900.png","1b2aa46f21d014bc14b03d78b3b342bf"],["/products/store/trytomp3/images/screens/trytomp3_screen_1_800x500.png","31d30838f60e45ae18d200b2695517a6"],["/products/store/trytomp3/images/screens/trytomp3_screen_2_1440x900.png","efb0b4260e349cb6048afe6df2e0b398"],["/products/store/trytomp3/images/screens/trytomp3_screen_3_1440x900.png","362e6aa4595a31bbdf20767718a15e7c"],["/products/store/trytomp3/images/screens/trytomp3_screen_4_1440x900.png","fb3f91bf63ff91f5e41325e054e96861"],["/products/store/trytomp3/images/screens/trytomp3_screen_5_1440x900.png","be3e37b743c829b0d53214ed799f319f"],["/products/store/trytowma/images/logo/logo_128x128.png","e7a99fd44863caff96483ca6b799ecf3"],["/products/store/trytowma/images/logo/logo_200x200.png","19cd4f91474407bf5724c151714afa8d"],["/products/store/trytowma/images/logo/logo_32x32.png","d22307654de431d1da26713fb3dd4907"],["/products/store/trytowma/images/logo/logo_500x500.png","0e802c2d52ce61a0b8abee694c93c3c5"],["/products/store/trytowma/images/logo/logo_512x512.png","c20dd7601e7083e4058e8c7812fe7c17"],["/products/store/trytowma/images/logo/logo_64x64.png","e475f3c77fbaebe009acf4773e96a417"],["/products/store/trytowma/images/online_store/logo.png","7ebedf643442dfa083097ce4a7aa481a"],["/products/store/trytowma/images/online_store/logo_200x200.png","19cd4f91474407bf5724c151714afa8d"],["/products/store/trytowma/images/online_store/store_logo_amazon_1500x1500.jpg","5b2c7c8ed8ec7851ad8dec41098194b8"],["/products/store/trytowma/images/online_store/trytowma_logo_200x200.jpg","7bdcad96e604b6323418ef28275dad7f"],["/products/store/trytowma/images/online_store/trytowma_online store screenshot_1_1440x900.png","3d357675326d2034e28a2052d4e274cb"],["/products/store/trytowma/images/screens/trytowma_apple store1_1440x900.png","66fc03b1b6ae90c2eeb199b932274935"],["/products/store/trytowma/images/screens/trytowma_apple store2_1440x900.png","7ec629ff7ea4448951333b00c2f837a3"],["/products/store/trytowma/images/screens/trytowma_apple store3_1440x900.png","8cbb4fb1c415b959c61faafb864705ed"],["/products/store/trytowma/images/screens/trytowma_apple store4_1440x900.png","eb49c78d6e2129777842d141f806c898"],["/products/store/trytowma/images/screens/trytowma_apple store5_1440x900.png","e12c74ceb228246e3027153e79c59ad3"],["/products/store/trytowma/images/screens/trytowma_apple_850x480.jpg","bafa1b93f9743247755a64791ff3137e"],["/products/store/trytowma/images/screens/trytowma_buy online_800x450.png","650820e5d04e18f47c89e04a8c1c33ed"],["/products/store/trytowma/images/screens/trytowma_license key_800x450.png","1cf3e3227196695c5ca5d5d289e6301a"],["/products/store/trytowma/images/screens/trytowma_mp3_850x480.jpg","850933c80b65512398cbfc986b6f2096"],["/products/store/trytowma/images/screens/trytowma_network_850x480.png","2ece2c9ea9865180448938311d97a7b4"],["/products/store/trytowma/images/screens/trytowma_online store screenshot_1_1440x900.png","3d357675326d2034e28a2052d4e274cb"],["/products/store/trytowma/images/screens/trytowma_online store_800x450.png","5f840762a3ccb213d8c05c76e1129f2a"],["/products/store/trytowma/images/screens/trytowma_screen_1_1440x900.png","799fcdaa954a9e11866bafc51ce906a1"],["/products/store/trytowma/images/screens/trytowma_trialversion_800x500.png","77c88f23717a623aba644619a4ece8fb"],["/products/store/xls2csv/images/logo/logo.png","547c7c41a35707e7a6a4dbf1bea454ad"],["/products/store/xls2csv/images/logo/logo_128x128.png","60af2e468acc4496aeac10744c547d8e"],["/products/store/xls2csv/images/logo/logo_200x200.png","16c1969a9b74bcb069a7052b3bcc392d"],["/products/store/xls2csv/images/logo/logo_32x32.png","839d1375a229257b7858950d8c343399"],["/products/store/xls2csv/images/logo/logo_500x500.png","f5b40b969fa4b8a4c5db67311e906b0e"],["/products/store/xls2csv/images/logo/logo_512x512.png","6ee2ae14361bd9779ffc3d14364d20ac"],["/products/store/xls2csv/images/logo/logo_64x64.png","737dbcdbd36bc0b8512557173419a048"],["/products/store/xls2csv/images/padimg/xls2csv-screenshot.png","c1798d17bd9e7d00a7787007fe582f79"],["/products/store/xls2csv/images/padimg/xls2csv_icon.gif","25050dc851cfe6b70f1d23ee6f6f6233"],["/products/store/xls2csv/images/screens/xls2csv.png","4af21b57283379c1f05df4e1ba7ae2f5"],["/products/store/xls2csv/images/screens/xls2csv_1440x900.jpg","9c5001c7e942669423301c466a96b82c"],["/products/store/xls2csv/images/screens/xls2csv_app1_1440x900.png","85ee343bfed7361b6631b8e44a538c92"],["/products/store/xls2csv/images/screens/xls2csv_app2_1440x900.png","f47785ebe6cbbd19089efcf28e8e7a6c"],["/products/store/xls2csv/images/screens/xls2csv_app3_1440x900.png","ede7b742488e701e00b4386ddc4c51fc"],["/products/store/xls2csv/images/screens/xls2csv_app4_1440x900.png","15006cd36f7c7c99ab30249c8d0bb88d"],["/products/store/xls2csv/images/screens/xls2csv_app5_1440x900.png","488fb0d85629db9384fc1e8998591c5a"],["/products/store/xls2csv/images/screens/xls2csv_buyonline_1440x900.png","de45f5dde4a2bd8d93c792927bf6d96f"],["/products/store/xls2csv/images/screens/xls2csv_interview.gif","d58434b4364a080f66482f7bfee58d5c"],["/products/store/xls2csv/images/screens/xls2csv_licensekey_1440x900.png","716677ff1a841dacc8ae34ed50e48c8b"],["/products/store/xls2csv/images/screens/xls2csv_onlinestore_1440x900.png","c8d2f3e647ccfc6c33d9af8f7f6953b8"],["/products/store/xls2csv/images/screens/xls2csv_trialversion_1440x900.png","cfca46a9dec94df8f89b7e1657176644"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







