!function(){function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var c=n[t];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(e,c.key,c)}}function t(e,t,c){return t&&n(e.prototype,t),c&&n(e,c),e}(self.webpackChunk_sage_bionetworks_rocc_app=self.webpackChunk_sage_bionetworks_rocc_app||[]).push([[61],{9061:function(n,c,l){"use strict";l.r(c),l.d(c,{ChallengesComponent:function(){return s},ChallengesModule:function(){return x}});var o,i=l(3018),r=l(4506),a=l(7263),s=((o=function(){function n(){e(this,n),this.mainContentClass=!0}return t(n,[{key:"ngOnInit",value:function(){}}]),n}()).\u0275fac=function(e){return new(e||o)},o.\u0275cmp=i.Xpm({type:o,selectors:[["rocc-challenges"]],hostVars:2,hostBindings:function(e,n){2&e&&i.ekj("main-content",n.mainContentClass)},decls:3,vars:0,consts:[[1,"rocc-app-background"]],template:function(e,n){1&e&&(i.TgZ(0,"main",0),i._UZ(1,"router-outlet"),i.qZA(),i._UZ(2,"sage-footer"))},directives:[r.lC,a.c],styles:["main[_ngcontent-%COMP%]{min-height:100vh}"]}),o),u=l(8583),g=l(5820),h=l(6561),f=l(3603),p=l(3738);function m(e,n){if(1&e){var t=i.EpF();i.TgZ(0,"mat-card",1),i.NdJ("click",function(){return i.CHM(t),i.oxw().onChallengeClick()}),i.TgZ(1,"p"),i._uU(2),i.qZA(),i.qZA()}if(2&e){var c=i.oxw();i.xp6(2),i.Oqu(c.challenge.name)}}var v=function(){var n=function(){function n(){e(this,n),this.challengeClick=new i.vpe}return t(n,[{key:"ngOnInit",value:function(){}},{key:"onChallengeClick",value:function(){this.challengeClick.emit(this.challenge)}}]),n}();return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=i.Xpm({type:n,selectors:[["rocc-challenge-list-item"]],inputs:{challenge:"challenge"},outputs:{challengeClick:"challengeClick"},decls:1,vars:1,consts:[[3,"click",4,"ngIf"],[3,"click"]],template:function(e,n){1&e&&i.YNc(0,m,3,1,"mat-card",0),2&e&&i.Q6J("ngIf",n.challenge)},directives:[u.O5,p.a8],styles:[""]}),n}();function d(e,n){if(1&e){var t=i.EpF();i.TgZ(0,"rocc-challenge-list-item",7),i.NdJ("challengeClick",function(e){return i.CHM(t),i.oxw().onChallengeClick(e)}),i.qZA()}2&e&&i.Q6J("challenge",n.$implicit)}var C,k,w,Z=function(){var n=function(){function n(t){e(this,n),this.challengeService=t,this._challenges=[],this._searchResultsCount=0}return t(n,[{key:"ngOnInit",value:function(){var e=this;this.challengeService.listChallenges().subscribe(function(n){return e._challenges=n.challenges})}},{key:"challenges",get:function(){return this._challenges}},{key:"searchResultsCount",get:function(){return this._searchResultsCount}},{key:"onChallengeClick",value:function(e){console.log("Challenge clicked")}}]),n}();return n.\u0275fac=function(e){return new(e||n)(i.Y36(h.PJ))},n.\u0275cmp=i.Xpm({type:n,selectors:[["rocc-challenge-list"]],decls:22,vars:2,consts:[[1,"rocc-challenge-list"],[1,"rocc-challenge-list-filters"],[1,"rocc-challenge-list-content"],[1,"rocc-challenge-list-content-results-count"],[1,"rocc-challenge-list-content-results"],[1,"rocc-challenge-list-content-results-list"],[3,"challenge","challengeClick",4,"ngFor","ngForOf"],[3,"challenge","challengeClick"]],template:function(e,n){1&e&&(i.TgZ(0,"div",0),i.TgZ(1,"div",1),i.TgZ(2,"h3"),i._uU(3,"Challenge Status"),i.qZA(),i.TgZ(4,"p"),i._uU(5,"TODO: Add checkbox-filter"),i.qZA(),i.TgZ(6,"h3"),i._uU(7,"Order by"),i.qZA(),i.TgZ(8,"p"),i._uU(9,"TODO: Add select-filter"),i.qZA(),i.TgZ(10,"h3"),i._uU(11,"Preview"),i.qZA(),i.TgZ(12,"p"),i._uU(13,"TODO: Add button-toogle-filter"),i.qZA(),i.qZA(),i.TgZ(14,"div",2),i.TgZ(15,"p"),i._uU(16,"TODO: Add search-filter"),i.qZA(),i.TgZ(17,"span",3),i._uU(18),i.qZA(),i.TgZ(19,"div",4),i.TgZ(20,"mat-nav-list",5),i.YNc(21,d,1,1,"rocc-challenge-list-item",6),i.qZA(),i.qZA(),i.qZA(),i.qZA()),2&e&&(i.xp6(18),i.hij("",n.searchResultsCount," results"),i.xp6(3),i.Q6J("ngForOf",n.challenges))},directives:[f.Hk,u.sg,v],styles:["main[_ngcontent-%COMP%]{min-height:100vh}.rocc-challenge-list[_ngcontent-%COMP%]{display:flex;flex-flow:row nowrap}.rocc-challenge-list-filters[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;flex-grow:0;flex-shrink:0;margin:25px}.rocc-challenge-list-content[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;flex-grow:1;margin:20px 50px}.rocc-challenge-list-content-results-count[_ngcontent-%COMP%]{margin-bottom:20px}.rocc-challenge-list-content-results-list[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap}"]}),n}(),_=[{path:"",component:s,children:[{path:"new",component:(k=function(){function n(){e(this,n)}return t(n,[{key:"ngOnInit",value:function(){}}]),n}(),k.\u0275fac=function(e){return new(e||k)},k.\u0275cmp=i.Xpm({type:k,selectors:[["rocc-challenge-new"]],decls:2,vars:0,template:function(e,n){1&e&&(i.TgZ(0,"p"),i._uU(1,"New challenge"),i.qZA())},styles:[""]}),k)},{path:":id",component:(C=function(){function n(){e(this,n)}return t(n,[{key:"ngOnInit",value:function(){}}]),n}(),C.\u0275fac=function(e){return new(e||C)},C.\u0275cmp=i.Xpm({type:C,selectors:[["rocc-challenge-view"]],decls:2,vars:0,template:function(e,n){1&e&&(i.TgZ(0,"p"),i._uU(1,"challenge-view works!"),i.qZA())},styles:[""]}),C)},{path:"",component:Z}]}],y=function(){var n=function n(){e(this,n)};return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=i.oAB({type:n}),n.\u0275inj=i.cJS({imports:[[r.Bz.forChild(_)],r.Bz]}),n}(),O=l(6215),A=l(5435),T=function(){var n=function(){function n(){e(this,n),this._challenge=new O.X(null)}return t(n,[{key:"ngOnDestroy",value:function(){throw new Error("Method not implemented.")}},{key:"setChallenge",value:function(e){console.log("challenge data service is now",e),this._challenge.next(e)}},{key:"challenge",value:function(){return this._challenge.asObservable().pipe((0,A.h)(function(e){return!!e}))}}]),n}();return n.\u0275fac=function(e){return new(e||n)},n.\u0275prov=i.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n}(),x=((w=function n(){e(this,n)}).\u0275fac=function(e){return new(e||w)},w.\u0275mod=i.oAB({type:w}),w.\u0275inj=i.cJS({providers:[T],imports:[[u.ez,a._,g.q,y]]}),w)}}])}();