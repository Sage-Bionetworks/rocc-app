(self.webpackChunk_sage_bionetworks_rocc_app=self.webpackChunk_sage_bionetworks_rocc_app||[]).push([[61],{9061:function(e,n,t){"use strict";t.r(n),t.d(n,{ChallengesComponent:function(){return a},ChallengesModule:function(){return y}});var c=t(3018),l=t(4506),o=t(7263);let a=(()=>{class e{constructor(){this.mainContentClass=!0}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=c.Xpm({type:e,selectors:[["rocc-challenges"]],hostVars:2,hostBindings:function(e,n){2&e&&c.ekj("main-content",n.mainContentClass)},decls:3,vars:0,consts:[[1,"rocc-app-background"]],template:function(e,n){1&e&&(c.TgZ(0,"main",0),c._UZ(1,"router-outlet"),c.qZA(),c._UZ(2,"sage-footer"))},directives:[l.lC,o.c],styles:["main[_ngcontent-%COMP%]{min-height:100vh}"]}),e})();var r=t(8583),s=t(5820),i=t(6561),g=t(3603),h=t(3738),p=t(1095);function u(e,n){if(1&e&&(c.TgZ(0,"button",9),c._uU(1),c.qZA()),2&e){const e=n.$implicit;c.xp6(1),c.hij(" ",e," ")}}function d(e,n){if(1&e&&(c.TgZ(0,"span"),c.TgZ(1,"b"),c._uU(2,"Start Date :"),c.qZA(),c._uU(3),c.ALo(4,"date"),c.qZA()),2&e){const e=c.oxw(2);c.xp6(3),c.hij("",c.xi3(4,1,e.challenge.startDate,"yyyy-MM-dd")," ")}}function f(e,n){if(1&e&&(c.TgZ(0,"span"),c.TgZ(1,"b"),c._uU(2,"End Date :"),c.qZA(),c._uU(3),c.ALo(4,"date"),c.qZA()),2&e){const e=c.oxw(2);c.xp6(3),c.hij("",c.xi3(4,1,e.challenge.endDate,"yyyy-MM-dd")," ")}}function m(e,n){if(1&e){const e=c.EpF();c.TgZ(0,"mat-card",1),c.NdJ("click",function(){return c.CHM(e),c.oxw().onChallengeClick()}),c._UZ(1,"img",2),c.TgZ(2,"mat-card-header"),c.TgZ(3,"mat-card-title"),c._uU(4),c.qZA(),c.qZA(),c.TgZ(5,"mat-card-content"),c.TgZ(6,"div",3),c.YNc(7,u,2,1,"button",4),c.qZA(),c.TgZ(8,"div",5),c.TgZ(9,"div",6),c._uU(10),c.qZA(),c.TgZ(11,"div",7),c.YNc(12,d,5,4,"span",8),c.YNc(13,f,5,4,"span",8),c.qZA(),c.qZA(),c.qZA(),c.qZA()}if(2&e){const e=c.oxw();c.xp6(1),c.MGl("src","assets/img/logo/",e.platform,".svg",c.LSH),c.xp6(3),c.Oqu(e.challenge.name),c.xp6(3),c.Q6J("ngForOf",e.challenge.tagIds),c.xp6(3),c.Oqu(e.challenge.description),c.xp6(2),c.Q6J("ngIf",!!e.challenge.startDate),c.xp6(1),c.Q6J("ngIf",!!e.challenge.endDate)}}let x=(()=>{class e{constructor(){this.challengeClick=new c.vpe,this.platform="synapse"}ngOnInit(){}onChallengeClick(){this.challengeClick.emit(this.challenge)}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=c.Xpm({type:e,selectors:[["rocc-challenge-list-item"]],inputs:{challenge:"challenge"},outputs:{challengeClick:"challengeClick"},decls:1,vars:1,consts:[[3,"click",4,"ngIf"],[3,"click"],["alt","platform-logo",1,"rocc-challenge-platform-logo",3,"src"],[1,"rocc-challenge-tags-container"],["mat-raised-button","","class","rocc-challenge-tags",4,"ngFor","ngForOf"],[1,"rocc-challenge-texts-container"],[1,"rocc-challenge-descriptions"],[1,"rocc-challenge-dates"],[4,"ngIf"],["mat-raised-button","",1,"rocc-challenge-tags"]],template:function(e,n){1&e&&c.YNc(0,m,14,6,"mat-card",0),2&e&&c.Q6J("ngIf",n.challenge)},directives:[r.O5,h.a8,h.dk,h.n5,h.dn,r.sg,p.lW],pipes:[r.uU],styles:[".mat-card[_ngcontent-%COMP%]{position:relative;margin-bottom:20px!important;transition:.2s;transition-property:box-shadow}.mat-card[_ngcontent-%COMP%]:focus, .mat-card[_ngcontent-%COMP%]:hover{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15)}.mat-card-title[_ngcontent-%COMP%]{margin-left:-16px}.rocc-challenge-tags-container[_ngcontent-%COMP%]{display:inline-table}.rocc-challenge-tags-container[_ngcontent-%COMP%]   .rocc-challenge-tags[_ngcontent-%COMP%]{background-color:#e55a17;color:#fff;border-radius:20px;margin:8px 8px 8px 0}.rocc-challenge-texts-container[_ngcontent-%COMP%]{display:grid;grid-template-columns:2.5fr 1fr;grid-gap:2em;align-items:center}.rocc-challenge-texts-container[_ngcontent-%COMP%]   .rocc-challenge-descriptions[_ngcontent-%COMP%]{justify-self:left}.rocc-challenge-texts-container[_ngcontent-%COMP%]   .rocc-challenge-dates[_ngcontent-%COMP%]{justify-self:right;text-align:right;display:flex;flex-direction:column;width:100%}.rocc-challenge-texts-container[_ngcontent-%COMP%]   .rocc-challenge-dates[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{text-align:right;padding-right:10px}.rocc-challenge-platform-logo[_ngcontent-%COMP%]{position:absolute;right:26px;top:26px;height:60px;z-index:2}@media (max-width:959px){.rocc-challenge-texts-container[_ngcontent-%COMP%]{grid-template-columns:auto}.rocc-challenge-platform-logo[_ngcontent-%COMP%]{top:calc(100% - 60px - 16px);left:26px}}@media (max-width:720px){.rocc-challenge-platform-logo[_ngcontent-%COMP%]{display:none}}"]}),e})();function Z(e,n){if(1&e){const e=c.EpF();c.TgZ(0,"rocc-challenge-list-item",7),c.NdJ("challengeClick",function(n){return c.CHM(e),c.oxw().onChallengeClick(n)}),c.qZA()}2&e&&c.Q6J("challenge",n.$implicit)}let _=(()=>{class e{constructor(e){this.challengeService=e,this._challenges=[],this._searchResultsCount=0}ngOnInit(){this.challengeService.listChallenges().subscribe(e=>this._challenges=e.challenges)}get challenges(){return this._challenges}get searchResultsCount(){return this._searchResultsCount}onChallengeClick(e){console.log("Challenge clicked")}}return e.\u0275fac=function(n){return new(n||e)(c.Y36(i.PJ))},e.\u0275cmp=c.Xpm({type:e,selectors:[["rocc-challenge-list"]],decls:22,vars:2,consts:[[1,"rocc-challenge-list"],[1,"rocc-challenge-list-filters"],[1,"rocc-challenge-list-content"],[1,"rocc-challenge-list-content-results-count"],[1,"rocc-challenge-list-content-results"],[1,"rocc-challenge-list-content-results-list"],[3,"challenge","challengeClick",4,"ngFor","ngForOf"],[3,"challenge","challengeClick"]],template:function(e,n){1&e&&(c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"h3"),c._uU(3,"Challenge Status"),c.qZA(),c.TgZ(4,"p"),c._uU(5,"TODO: Add checkbox-filter"),c.qZA(),c.TgZ(6,"h3"),c._uU(7,"Order by"),c.qZA(),c.TgZ(8,"p"),c._uU(9,"TODO: Add select-filter"),c.qZA(),c.TgZ(10,"h3"),c._uU(11,"Preview"),c.qZA(),c.TgZ(12,"p"),c._uU(13,"TODO: Add button-toogle-filter"),c.qZA(),c.qZA(),c.TgZ(14,"div",2),c.TgZ(15,"p"),c._uU(16,"TODO: Add search-filter"),c.qZA(),c.TgZ(17,"span",3),c._uU(18),c.qZA(),c.TgZ(19,"div",4),c.TgZ(20,"mat-nav-list",5),c.YNc(21,Z,1,1,"rocc-challenge-list-item",6),c.qZA(),c.qZA(),c.qZA(),c.qZA()),2&e&&(c.xp6(18),c.hij("",n.searchResultsCount," results"),c.xp6(3),c.Q6J("ngForOf",n.challenges))},directives:[g.Hk,r.sg,x],styles:["main[_ngcontent-%COMP%]{min-height:100vh}.rocc-challenge-list[_ngcontent-%COMP%]{display:flex;flex-flow:row nowrap}.rocc-challenge-list-filters[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;flex-grow:0;flex-shrink:0;margin:25px}.rocc-challenge-list-content[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap;flex-grow:1;margin:20px 50px}.rocc-challenge-list-content-results-count[_ngcontent-%COMP%]{margin-bottom:20px}.rocc-challenge-list-content-results-list[_ngcontent-%COMP%]{display:flex;flex-flow:column nowrap}"]}),e})();const C=[{path:"",component:a,children:[{path:"new",component:(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=c.Xpm({type:e,selectors:[["rocc-challenge-new"]],decls:2,vars:0,template:function(e,n){1&e&&(c.TgZ(0,"p"),c._uU(1,"New challenge"),c.qZA())},styles:[""]}),e})()},{path:":id",component:(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=c.Xpm({type:e,selectors:[["rocc-challenge-view"]],decls:2,vars:0,template:function(e,n){1&e&&(c.TgZ(0,"p"),c._uU(1,"challenge-view works!"),c.qZA())},styles:[""]}),e})()},{path:"",component:_}]}];let O=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[l.Bz.forChild(C)],l.Bz]}),e})();var w=t(6215),A=t(5435);let v=(()=>{class e{constructor(){this._challenge=new w.X(null)}ngOnDestroy(){throw new Error("Method not implemented.")}setChallenge(e){console.log("challenge data service is now",e),this._challenge.next(e)}challenge(){return this._challenge.asObservable().pipe((0,A.h)(e=>!!e))}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=c.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})(),y=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({providers:[v],imports:[[r.ez,o._,s.q,O]]}),e})()}}]);