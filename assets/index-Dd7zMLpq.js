(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();function Ts(){return{phase:"ANSWERING",index:0,original:[],queue:[],reviewCounts:{},corrected:[],unresolved:[],feedback:null}}function Bs(e,t,a,s=2){if(!["ANSWERING","MISTAKE_REVIEW"].includes(e.phase))return!1;const n=e.phase==="MISTAKE_REVIEW",i=n?e.queue[0]:e.index;return e.phase="SUBMITTED",n?(e.queue.shift(),e.reviewCounts[i]=(e.reviewCounts[i]||0)+1,a?e.corrected.includes(i)||e.corrected.push(i):e.reviewCounts[i]<s?e.queue.push(i):e.unresolved.includes(i)||e.unresolved.push(i)):(e.original.push({index:i,response:structuredClone(t),correct:a}),!a&&!e.queue.includes(i)&&e.queue.push(i)),e.feedback={index:i,correct:a,reviewing:n},e.phase="FEEDBACK",!0}function Fs(e,t){if(e.phase!=="FEEDBACK")return!1;const a=e.feedback.reviewing;return e.phase="NEXT_QUESTION",a||e.index++,e.feedback=null,e.phase=e.index<t?"ANSWERING":e.queue.length?"MISTAKE_REVIEW":"COMPLETED",!0}const Oe=e=>e.phase==="FEEDBACK"?e.feedback.index:e.phase==="MISTAKE_REVIEW"?e.queue[0]:e.index,_n="data:text/markdown;base64,TUlUIExpY2Vuc2UNCg0KQ29weXJpZ2h0IChjKSAyMDI1IEtlbm5leQ0KDQpQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5DQpvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAiU29mdHdhcmUiKSwgdG8gZGVhbA0KaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cw0KdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbA0KY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzDQpmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOg0KDQpUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwNCmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuDQoNClRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAiQVMgSVMiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SDQpJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwNCkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRQ0KQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUg0KTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwNCk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFDQpTT0ZUV0FSRS4=",On="data:text/markdown;base64,IyBMb2NhbCBpbnRlcmZhY2UgZWZmZWN0cw0KDQojIyBTb3VuZCBBc3NldHMgJiBNYXBwaW5ncw0KMS4gKipjb250cm9sLm9nZyoqIChLZW5uZXkgQ0MwKTogQ29udHJvbCByb3RhdGlvbiAvIHRvZ2dsZSBzb3VuZC4NCjIuICoqY29tcGxldGUub2dnKiogKEtlbm5leSBDQzApOiBJbnZlc3RpZ2F0aW9uIGNvbXBsZXRpb24gamluZ2xlLg0KMy4gKipkdW9saW5nby1jb3JyZWN0Lm1wMyoqOiBVcGxpZnRpbmcgdHdvLXRvbmUgbWFqb3IgY2hpbWUgKEM1IC0+IEc1KSB0cmlnZ2VyZWQgdXBvbiB2YWxpZGF0aW5nIGEgaHlwb3RoZXNpcyBvciBhbnN3ZXJpbmcgYSBjaGVja3BvaW50IHF1ZXN0aW9uIGNvcnJlY3RseS4NCjQuICoqZHVvbGluZ28td3JvbmcubXAzKio6IEZyaWVuZGx5LCBzb2Z0IGRlc2NlbmRpbmcgbm9uLXB1bml0aXZlIHRvbmUgdHJpZ2dlcmVkIHdoZW4gYSBwcmVkaWN0aW9uIG9yIHF1aXogYW5zd2VyIG5lZWRzIHJldmlldy4NCjUuICoqZHVvbGluZ28tY29tcGxldGUubXAzKio6IENlbGVicmF0b3J5IGxlc3NvbiAvIHVuaXQgY29tcGxldGlvbiBmYW5mYXJlLg0KNi4gKipkdW9saW5nby1zdHJlYWsubXAzKio6IEFzY2VuZGluZyBwZW50YXRvbmljIGNoaW1lIGZsb3VyaXNoIGZvciBzdHJlYWsgbWlsZXN0b25lcyBhbmQgc3RhciBhY2hpZXZlbWVudHMuDQo3LiAqKmR1b2xpbmdvLXRhcC5tcDMqKjogT3JnYW5pYyB0YWN0aWxlIGJ1YmJsZSBwb3AgZm9yIGludGVyYWN0aXZlIGNhcmQgc2VsZWN0aW9ucywgcmFkaW8gY2hvaWNlcywgYW5kIHNsaWRlciBtb3ZlbWVudHMuDQo4LiAqKmR1b2xpbmdvLWhpbnQubXAzKio6IEdlbnRsZSBpbnF1aXNpdGl2ZSBiZWxsIGNoaW1lIHdoZW4gYWN0aXZhdGluZyByb2JvdCB0dXRvcmluZyBoaW50cyBvciBvcGVuaW5nIGZvcm11bGEgZ3VpZGVzLg0KDQpBbGwgc291bmRzIGFyZSBzdG9yZWQgbG9jYWxseSwgYnVuZGxlZCBvZmZsaW5lIGJ5IGBzY3JpcHRzL2V4cG9ydC1zdGFuZGFsb25lLnB5YCBhcyBpbmxpbmVkIGRhdGEgVVJJcywgYW5kIG9ubHkgcGxheSBhZnRlciBleHBsaWNpdCBzb3VuZCBhY3RpdmF0aW9uIGJ5IHRoZSB1c2VyLg0K",Jn="data:text/markdown;base64,PHAgYWxpZ249ImNlbnRlciI+PGltZyBzcmM9Imljb24ucG5nIi8+PC9wPg0KDQojIFN0YXJ0ZXIgS2l0IENpdHkgQnVpbGRlcg0KDQpUaGlzIHBhY2thZ2UgaW5jbHVkZXMgYSBiYXNpYyB0ZW1wbGF0ZSBmb3IgYSAzRCBjaXR5IGJ1aWxkZXIgaW4gR29kb3QgNC42LiBJbmNsdWRlcyBmZWF0dXJlcyBsaWtlOw0KDQotIEJ1aWxkaW5nIGFuZCByZW1vdmluZyBzdHJ1Y3R1cmVzDQotIFNtb290aCBjYW1lcmEgY29udHJvbHMNCi0gRHluYW1pYyBNZXNoTGlicmFyeSBjcmVhdGlvbg0KLSBTYXZpbmcvbG9hZGluZw0KLSBTcHJpdGVzIGFuZCAzRCBNb2RlbHMgXyhDQzAgbGljZW5zZWQpXw0KDQojIyMgU2NyZWVuc2hvdA0KDQo8cCBhbGlnbj0iY2VudGVyIj48aW1nIHNyYz0ic2NyZWVuc2hvdHMvc2NyZWVuc2hvdC5wbmciLz48L3A+DQoNCiMjIyBDb250cm9scw0KDQp8IEtleSB8IENvbW1hbmQgfA0KfCAtLS0gfCAtLS0gfA0KfCA8a2JkPlc8L2tiZD4gPGtiZD5BPC9rYmQ+IDxrYmQ+Uzwva2JkPiA8a2JkPkQ8L2tiZD4gfCBNb3ZlIGNhbWVyYSB8DQp8IDxrYmQ+Rjwva2JkPiB8IENhbWVyYSB0byBjZW50ZXIgfA0KfCA8a2JkPk1pZGRsZSBtb3VzZSBidXR0b248L2tiZD4gfCBIb2xkIHRvIHJvdGF0ZSBjYW1lcmEgfA0KfCA8a2JkPlNjcm9sbCB3aGVlbDwva2JkPiB8IFpvb20gfA0KfCA8a2JkPkxlZnQgbW91c2UgYnV0dG9uPC9rYmQ+IHwgUGxhY2UgYnVpbGRpbmcgfA0KfCA8a2JkPkRFTDwva2JkPiB8IFJlbW92ZSBidWlsZGluZyB8DQp8IDxrYmQ+UmlnaHQgbW91c2UgYnV0dG9uPC9rYmQ+IHwgUm90YXRlIGJ1aWxkaW5nIHwNCnwgPGtiZD5RPC9rYmQ+IDxrYmQ+RTwva2JkPiAgfCBUb2dnbGUgYmV0d2VlbiBidWlsZGluZ3MgfA0KfCA8a2JkPkYxPC9rYmQ+IHwgU2F2ZSB8DQp8IDxrYmQ+RjI8L2tiZD4gfCBMb2FkIHwNCg0KIyMjIEluc3RydWN0aW9ucw0KDQojIyMjIDEuIEhvdyB0byBhZGQgbW9yZSBidWlsZGluZ3M/DQoNCkR1cGxpY2F0ZSBvbmUgb2YgdGhlIGV4aXN0aW5nIHJlc291cmNlcyBpbiB0aGUgJ3N0cnVjdHVyZXMnIGZvbGRlciwgYWRqdXN0IHRoZSBwcm9wZXJ0aWVzIGluIHRoZSBpbnNwZWN0b3IuIFNlbGVjdCB0aGUgJ0J1aWxkZXInIG5vZGUgaW4gdGhlIHNjZW5lIGFuZCBhZGQgeW91ciBuZXcgcmVzb3VyY2VzIHRvIHRoZSAnU3RydWN0dXJlcycgYXJyYXkuDQoNCiMjIyMgMi4gSG93IHRvIGFkanVzdCBidWlsZGluZyBtb2RlbHM/DQoNClNlbGVjdCB0aGUgcmVzb3VyY2Ugb2YgdGhlIGJ1aWxkaW5nIHlvdSdkIGxpa2UgdG8gY2hhbmdlIGluIHRoZSAnc3RydWN0dXJlcycgZm9sZGVyLCBhZGp1c3QgdGhlIG1vZGVsIGluIHRoZSBpbnNwZWN0b3IuDQoNCiMjIyMgMy4gSG93IHRvIHNhdmUgYW5kIGxvYWQgY2l0aWVzPw0KDQpQcmVzc2luZyBGMSBkdXJpbmcgZ2FtZXBsYXkgd2lsbCBzYXZlIHRoZSBjdXJyZW50IGNpdHkgdG8gZGlzaywgRjIgd2lsbCBsb2FkIGl0IGZyb20gdGhlIHNhbWUgbG9jYXRpb24uIFRoZSBmaWxlIGlzIHNhdmVkIGFzICdtYXAucmVzJyBpbiB0aGUgdXNlciBmb2xkZXIgKHNlZSBiZWxvdykuIFlvdSBjYW4gYWRqdXN0IHRoaXMgaW4gdGhlICdhY3Rpb25fc2F2ZScgYW5kICdhY3Rpb25fbG9hZCcgZnVuY3Rpb25zIGZvdW5kIGluIHRoZSAnYnVpbGRlci5nZCcgc2NyaXB0Lg0KDQpVc2VyIGRhdGEgZm9sZGVyOg0KDQo+IFdpbmRvd3M6IGAlQVBQREFUQSUvR29kb3QvYXBwX3VzZXJkYXRhL1N0YXJ0ZXIgS2l0IENpdHkgQnVpbGRlci9gDQoNCj4gTGludXg6IGB+Ly5sb2NhbC9zaGFyZS9nb2RvdC9hcHBfdXNlcmRhdGEvU3RhcnRlciBLaXQgQ2l0eSBCdWlsZGVyL2ANCg0KPiBNYWNPUzogYH4vTGlicmFyeS9BcHBsaWNhdGlvbiBTdXBwb3J0L0dvZG90L2FwcF91c2VyZGF0YS9TdGFydGVyIEtpdCBDaXR5IEJ1aWxkZXIvYA0KDQojIyMjIDQuIEhvdyB0byBpbmNsdWRlIGNpdHkgZGF0YSBpbiB0aGUgcHJvamVjdCBhbmQgbG9hZCB0aGlzPw0KDQpZb3UnbGwgZmluZCBhIHNhbXBsZSBtYXAgaW4gdGhlICdzYW1wbGUgbWFwJyBmb2xkZXIsIHRvIGxvYWQgdGhpcyBkdXJpbmcgZ2FtZXBsYXkgcHJlc3MgRjMuIFlvdSBjYW4gZmluZCB0aGUgZnVuY3Rpb24gdGhhdCBoYW5kbGVzIHRoaXMgYXMgJ2FjdGlvbl9sb2FkX3Jlc291cmNlcycgZm91bmQgaW4gdGhlICdidWlsZGVyLmdkJyBzY3JpcHQuDQoNCiMjIyBMaWNlbnNlDQoNCk1JVCBMaWNlbnNlDQoNCkNvcHlyaWdodCAoYykgMjAyNiBLZW5uZXkNCg0KUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSAiU29mdHdhcmUiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6DQoNClRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLg0KDQpUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgIkFTIElTIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuDQoNCkFzc2V0cyBpbmNsdWRlZCBpbiB0aGlzIHBhY2thZ2UgKDJEIHNwcml0ZXMsIDNEIG1vZGVscyBhbmQgc291bmQgZWZmZWN0cykgYXJlIFtDQzAgbGljZW5zZWRdKGh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9wdWJsaWNkb21haW4vemVyby8xLjAvKQ0K",ei=""+new URL("complete-DzcFPb_i.ogg",import.meta.url).href,ti=""+new URL("control-B6pvAcd_.ogg",import.meta.url).href,ai=""+new URL("duolingo-complete-CkuzW2a9.mp3",import.meta.url).href,si=""+new URL("duolingo-correct-DreYXE8v.mp3",import.meta.url).href,ni=""+new URL("duolingo-hint-COlLEJc2.mp3",import.meta.url).href,ii=""+new URL("duolingo-streak-s9wiv9dC.mp3",import.meta.url).href,oi="data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU3LjgzLjEwMAAAAAAAAAAAAAAA//tAwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAALAAAJsAAoKCgoKCgoKCg9PT09PT09PT1TU1NTU1NTU1NoaGhoaGhoaGh+fn5+fn5+fn6UlJSUlJSUlJSpqampqampqam/v7+/v7+/v7/U1NTU1NTU1NTq6urq6urq6ur///////////8AAAAATGF2YzU3LjEwAAAAAAAAAAAAAAAAJAJAAAAAAAAACbCdHQM/AAAAAAD/+1DEAAAJQWz8owRNgX6fZ7KeUACACANnzu0rHoXFtt/ILGD5trLTYOX+qFHFiHaST+/ZyUZGIe2qMIckklD/RXcklGtf2/ko1fRvo1rsfvv0ghI4sQFqE9BeKkAOEQC97I2XVaI0L8m5fCWMkE5zXNNbiq89CWLtC5BYAAIHBQaYUEw4yNIToHBQhCKcUEw+5NCPEw+fo5Cank0DhPIRldGz+d8535Lq7HdCNRj9BQxk/g44oGKjmEDnv+GMmgH/9/////v7/f7ch0Ilt/N8//tSxAiADEDDZbiTAAF5kek3nmAAiRT4bpdjaEgrR3vYQg/7cLsEx8r4/JnkCc523P8Ytj3Kdvvl8b5p5pVmnbj///OrGhzTpRCr73IAiXKCQBht3zznGloNJMGk/+vwwBC5wHFqJVutbMDTRJAkg+1CTtSo8+D8PA9C5Pnx3qaCn9gJsogsup3ZkEuJdsf1mfbbMhGzDFTMf/7ef2jRA4oTSB2h7CihwNT8DHlvlp62o9LOSt37LRRR5/pVoLVZmqaLA1Uh15xxNK2xom8fY+n/+1LEBgALyLFNp5huwWQMqXWGDHi9VqSQgpuJpETOScSqeXoSUDCPokA7pfZLooH5Fhw04cm50oMCQGPGqJSWk5BkhInHuZ3HIkQGOBkSFgXNteA0Gnv3IvfBxRn5xv1WZhFH29S7nJNZW2km42RUJUKKOIEBiQDgZAiLGVSEPZ6XicdW1ee31sUJRKC3JtyPOH7JRJgyWKCgBSZGhYAhO0gIVBYCT+PgB9sglTQSHuFHqZCy3Ob/6kXe+xXdZJJVAWbTSEr+oBQDp2MAHD6PpP/7UsQIAAvQn0eGDFKBiZNpNPSNIND07CqEuAu4epIDotJfu978ReAxIpaiRvlQKtybd9LU7FBglKiiGcYIxEdEYSBCHMgQNHRAYGAoU9ral3I/QeVstFs017JNGHjcreKsKICcqbTCTkbaBxJ0mJpJcvMxOj3JQkNjAFHAgBokEs01mWTf2Pg0BmrjqOavBw4jc6RjoDXlgxG+Zg0Se4VDzHigw8eFGm0umikohBh4GcYPsKjxNUHLGMTZ4ps2967POYfnFAjK1WgCopGSUh2B//tSxAWAC0DfS6YkasGHEil09g1QMsDn41G5VOisYCFqDIcE/JGSF3ZyQutPJ2I0jCs00BsRO7hibwaeXzNaav/w4+cuhISfSTSU6X9CnmFRRQnWhTXCg+Ghrf+jK7f/rwnXjDlHm2XG422ghg3BGTpGAm1Acy8eZpuhSnZHho7O4iwsEzMTgbk4dIM1dQABYAimhb2w2GJBAUh0KJhSIIOeBXPOCwDPHwZAySRNBtLElSZdYXgRFUSZwMdQRsbIf6Kv6NWmC9rkOrncdPQtAob/+1LEBYMLsHtWLLDLAXMRrEGnmWiZqYFAOEsRBLgSD2H9iQWCoeHZbLhqCYqBgCByrWP9bw+mYA0gAiMJlTetGRHe2QJqcfAgAAYEcsvWBMuOE+ccXNEzj/7KDJ9lH/l1b1e7P0NUuhd2iaUsZn4EBqwGZPBWMACoYTVrLInnJhZnqtblUfrQSokZDhMR6jFONWavn9qEqAVhIKIHhr07D3vHynz5uO1lNAosuAWGQWOxCoSsiNbqz3/+7+tnV67P2eY6qmp1AZuXI21xpNV7wP/7UsQGAAuobWnsvMphYQ+q9YYZVOk/rl1IDYk04UGONZM4AGtJBVc+LinhwlGnK/2TrRbf3yqcmE/+aOPw7Q6da6ErwrNKaLrpFXzD96A0tzlLJUiyN/3r6L32yXMrW7lg6Z3yQ9VgB+3RyJEgbaa/j0wK9VM8IiInAQhgUKteTHBfKjl5Uv/JnywtpptfSqmIljaKvtfbw2MYXEJU8lZZR+0BiFDp1LBW9uAtqolsLbCQokSa1/yVHX8Ur6rKBqArkMTTaSM4tJ2nIaSLP8zA//tSxAkACmRTTaekykE7ieq09IzkcxhAWloF2CMRnS1piSKFPP1XpMbqjYe2LMAoPJwGhQuD7jAmWRE7w6DRZjj6R5wul3Zw/u6OD/u6Oz/Sxrn7m/dH4BLZHEkkCB+j5L47MqAoUJGQOIuWE7QlthEy25AFXd2MxBduHc2eHAw8aMTOmSIuSFlXmWeouo8WWpICCYlCq3kVf4CTd9I1jH7Gfo+WBTJtabNfAoBmDMmEVKVRmuHoG9zwGgjIBIw4giBoFlbcbhMyCBYLINDQg4D/+1LEFgAKMEFLhjDBgUsK6bD2DHirIHhjkjZZQnlllUgI+1wSHFzRhJyNHiISMV7rPf//Vr1dz81+lLIthQ3beIj53kFUYtHYwJpqdlgqnBQL1MOkwio3b+0s9nJ0DH4ALQQOOVAg0RLJhKLhEiAG0vdvPyFvg6uokyqgqZcaZVesc7//v+q1O4iEotsqINXSbVPXKZ5ij6bSyiHE2zJ1DTJZWGGr1hXBYiwx/Fj0JPaTTi88thChUNfkUqTtYdBAJZdZ0rPEyykajaAkZlmEov/7UsQhgAp0e0mHmG7BRZIpMp5gABYbrt9TNP7Oj6UMRxtGyKdpTbraad61A6R8G4c5pxj/UBfUSaRvzrtRP2BzAElsifaNbV5p+b9urZ7ifXd7VmO32O/+127foPMgATMa4UZUkbCCFpEQhJsIfaq/3///+j/vTdk9vutstsslt0skaQZlTBEXUJjxBNdUjkwlhj/ASKkmcRZxG5gWDgcVyIuX2AcEF8ek6wbD/cZ+ykWwuChbkGo0hFWVainT/b6HBbm+7F488ST4jyWpqTUR//tSxC0AEp0bX7mHgBFIiyXznmAA4io6kzWO3v530fTU4RMTxkUwqpz3CzfOfj2tuXw7PZIULGs5+vj+u8739a38PsxgdEv6sgUJmUs7KCQAUlcRAB8FKN0NSGpENLiZMQ5jlQ1DVDEfXYVaFOCgEijh1T6re8zryRIkSKILA0DR7qBoOYiBoFQVcWBngq/4iDuVOz2DQNBr///ywNP//6wVTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=",ri=""+new URL("duolingo-wrong-BFLC00fe.mp3",import.meta.url).href,li=e=>new URL(Object.assign({"./assets/audio/KENNEY-LICENSE.md":_n,"./assets/audio/README.md":On,"./assets/audio/SOURCE-README.md":Jn,"./assets/audio/complete.ogg":ei,"./assets/audio/control.ogg":ti,"./assets/audio/duolingo-complete.mp3":ai,"./assets/audio/duolingo-correct.mp3":si,"./assets/audio/duolingo-hint.mp3":ni,"./assets/audio/duolingo-streak.mp3":ii,"./assets/audio/duolingo-tap.mp3":oi,"./assets/audio/duolingo-wrong.mp3":ri})[`./assets/audio/${e}`],import.meta.url).href,Ue=e=>typeof Audio<"u"?new Audio(li(e)):{play:()=>Promise.resolve(),pause:()=>{},volume:1,currentTime:0,preload:"none"};function Vs(e,t){try{return localStorage.getItem(e)??t}catch{return t}}const ci=Math.max(0,Math.min(100,Number(Vs("physics-volume","50"))||50));let Ia;try{const e=JSON.parse(Vs("physics-audio-v1","null"));e?.version===1&&typeof e.muted=="boolean"&&Number.isFinite(e.volume)&&e.volume>=0&&e.volume<=100&&(Ia=e)}catch{}let pe=Ia?.volume??ci;pe<=0&&(pe=50);let it=!0,sa=!0,Ot=pe>0?pe:Math.max(1,Math.min(100,Ia?.lastAudibleVolume||50));const ae={control:Ue("control.ogg"),complete:Ue("complete.ogg"),duoCorrect:Ue("duolingo-correct.mp3"),duoWrong:Ue("duolingo-wrong.mp3"),duoComplete:Ue("duolingo-complete.mp3"),duoStreak:Ue("duolingo-streak.mp3"),duoTap:Ue("duolingo-tap.mp3"),duoHint:Ue("duolingo-hint.mp3")};ae.correct=ae.duoCorrect;ae.incorrect=ae.duoWrong;ae.wrong=ae.duoWrong;ae.streak=ae.duoStreak;ae.milestone=ae.duoStreak;ae.tap=ae.duoTap;ae.hint=ae.duoHint;for(const e of Object.values(ae))e.preload="none";let ps=0;function Ea(){try{localStorage.setItem("physics-audio-v1",JSON.stringify({version:1,muted:!it,volume:pe,lastAudibleVolume:Ot})),localStorage.setItem("physics-volume",String(pe)),localStorage.setItem("physics-sound-enabled",String(it))}catch{}}function Me(){return{volume:pe,enabled:it&&sa&&pe>0}}function di(){Me().enabled?Ps():Ns()}function pi(e){pe=Math.max(0,Math.min(100,Number(e)||0)),pe>0?(Ot=pe,it=!0,sa=!0):it=!1,Object.values(ae).forEach(t=>{t.volume=pe/100}),pe||Object.values(ae).forEach(t=>t.pause()),Ea()}function Ns(){sa=it=!0,pe||(pe=Ot||50),Ot=pe,Ea(),B("control")}function Ps(){it=!1,sa=!1,Object.values(ae).forEach(e=>e.pause()),Ea()}function ui(e){return e==="complete"||e==="duoComplete"?.55:e==="correct"||e==="duoCorrect"?.65:e==="incorrect"||e==="wrong"||e==="duoWrong"?.55:e==="streak"||e==="milestone"||e==="duoStreak"?.6:e==="hint"||e==="duoHint"||e==="tap"||e==="duoTap"?.5:.7}function B(e="control"){if(!Me().enabled||typeof document<"u"&&document.hidden)return;const t=typeof performance<"u"?performance.now():Date.now();if(t-ps<120)return;ps=t,Object.values(ae).forEach(s=>s.pause());const a=ae[e]||ae.control;a.volume=pe/100*ui(e),a.currentTime=0,a.play().catch(s=>{typeof window<"u"&&s?.name!=="NotAllowedError"&&window.dispatchEvent(new Event("physics-audio-error"))})}typeof document<"u"&&document.addEventListener("visibilitychange",()=>{document.hidden&&Object.values(ae).forEach(e=>e.pause())});const ne=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Kt(e,t={},a=!1){const s=ne;if(e.type==="choice")return`<div class="activity-choices" role="radiogroup" aria-label="Պատասխանի տարբերակներ">${e.options.map((i,r)=>({v:i,i:r})).sort((i,r)=>!!([...e.question].reduce((c,l)=>c+l.charCodeAt(0),0)%2)!=!!e.reverseChoices?r.i-i.i:i.i-r.i).map(({v:i,i:r},o)=>{const c=t.choice===r,l=a&&r===e.correct,u=a&&c&&r!==e.correct,p=a&&!c&&r!==e.correct,y=["answer",c?"selected":"",l?"is-correct":"",u?"is-incorrect":"",p?"is-neutral":""].filter(Boolean).join(" ");let h='<span class="answer-indicator radio-dot" aria-hidden="true"></span>';return l?h='<span class="answer-indicator icon-check" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg></span><span class="sr-only"> (Ճիշտ պատասխան)</span>':u&&(h='<span class="answer-indicator icon-cross" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></span><span class="sr-only"> (Քո սխալ պատասխանը)</span>'),`<button type="button" role="radio" class="${y}" data-activity-choice="${r}" data-shortcut="${o+1}" aria-checked="${c}" aria-pressed="${c}" ${a?'disabled aria-disabled="true"':""}><span class="answer-badge" aria-hidden="true">${o+1}</span><span class="answer-text">${s(i)}</span>${h}</button>`}).join("")}</div>`;if(e.type==="text")return`<label class="field-label" for="activity-text">Իմ պատասխանը</label><input id="activity-text" type="text" value="${s(t.text||"")}" ${a?"disabled":""} autocomplete="off">`;if(e.type==="number")return`<label class="field-label" for="activity-number">Իմ պատասխանը${e.unit?" ("+s(e.unit)+")":""}</label><input id="activity-number" inputmode="decimal" type="text" value="${s(t.number||"")}" ${a?"disabled":""} autocomplete="off">`;if(e.type==="matching"){const n=e.pairs.map(i=>i[1]).reverse();return`<div class="matching-activity">${e.pairs.map(([i],r)=>`<label><span>${s(i)}</span><select data-activity-match="${r}" ${a?"disabled":""}><option value="">Ընտրիր համապատասխան կապը</option>${n.map(o=>`<option ${t.matches?.[r]===o?"selected":""}>${s(o)}</option>`).join("")}</select></label>`).join("")}</div>`}throw Error("Unsupported activity "+e.type)}function et(e,t){return e.type==="text"?!!t.text?.trim():e.type==="choice"?Number.isInteger(t.choice):e.type==="number"?!!t.number?.trim():e.pairs.every((a,s)=>!!t.matches?.[s])}function va(e,t,a){if(e.type==="text"){const s=n=>String(n).normalize("NFKC").trim().toLocaleLowerCase("hy").replace(/\s+/g," ");return e.acceptedAnswers.some(n=>s(n)===s(t.text||""))?a:0}if(e.type==="choice")return t.choice===e.correct?a:0;if(e.type==="number"){const s=Number(String(t.number??"").trim().replace(",","."));return String(t.number??"").trim()&&Number.isFinite(s)&&Math.abs(s-e.answer)<=(e.tolerance??Math.max(1e-6,Math.abs(e.answer)*.005))?a:0}return e.pairs.reduce((s,n,i)=>s+(t.matches?.[i]===n[1]?a/e.pairs.length:0),0)}function Gs(e,t,a){e.querySelectorAll("[data-activity-choice]").forEach(s=>s.onclick=()=>{t.choice=Number(s.dataset.activityChoice),B("tap"),a(!0)}),e.querySelector("#activity-text")?.addEventListener("input",s=>{t.text=s.target.value,a(!1)}),e.querySelector("#activity-number")?.addEventListener("input",s=>{t.number=s.target.value,a(!1)}),e.querySelectorAll("[data-activity-match]").forEach(s=>s.onchange=()=>{t.matches||={},t.matches[s.dataset.activityMatch]=s.value,a(!1)}),e.addEventListener("keydown",s=>{if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName))return;const n=parseInt(s.key,10);if(n>=1&&n<=9){const i=e.querySelector(`[data-shortcut="${n}"]`);i&&!i.disabled&&(i.click(),i.focus())}})}function Ra(e){if(!e.assessmentFlow){const t=Ts();for(const[s,n]of(e.quiz||[]).entries()){const i=n.correct??n.points===n.weight;t.original.push({index:s,response:typeof n.answer=="number"?{choice:n.answer}:structuredClone(n.answer||{}),correct:i}),i||t.queue.push(s)}const a=t.original.at(-1);t.index=a?t.original.length-1:0,a&&(t.phase="FEEDBACK",t.feedback={index:t.index,correct:a.correct,reviewing:!1}),e.assessmentFlow={machine:t,draft:a?structuredClone(a.response):{},pendingDraft:structuredClone(e.draft||{}),hintLevel:0}}return e.assessmentFlow}function na(e){const t=Ra(e).machine;return t.feedback?t.feedback.correct?"success-answer":"confused":"thinking"}function hi(e,t){return Array.isArray(e.hints)&&e.hints[t-1]?e.hints[t-1]:t===1?"Հուշում 1․ Ուշադրություն դարձրու հիմնական մեծություններին և դրանց ֆիզիկական իմաստին։":t===2?`Հուշում 2․ Մտածիր, թե ինչպես են այս մեծությունները փոխկապակցված փորձում։ ${e.formula?"Հիշիր կապը՝ "+e.formula:""}`:"Հուշում 3․ Համեմատիր տարբերակները և բացառիր նրանք, որոնք հակասում են գրանցված չափումներին։"}function ia(e,t){const a=Ra(e),s=a.machine,n=Oe(s),i=t[n],r=s.phase==="FEEDBACK",o=s.phase==="MISTAKE_REVIEW"||s.feedback?.reviewing;if(!i)return"";const c=o&&i.reviewVariant?{...i.reviewVariant,weight:i.weight}:o?{...i,reverseChoices:!0}:i,l=!r&&a.hintLevel>0?`<div class="assessment-hint-box" role="status"><strong>${ne(hi(c,a.hintLevel))}</strong></div>`:"",u=o?'<div class="review-badge"><span class="robot-speaker">Ռոբոտի օգնականը</span><strong>Սխալների կրկնություն և ամրապնդում</strong><p>Այս հարցում ավելի վաղ սխալվել էիր։ Եկ նորից փորձենք՝ արդեն քննարկված բացատրության հիման վրա։ Կրկնությունը չի ազդի քո պաշտոնական առաջին գնահատականի վրա։</p></div>':"",p=r?`
  <div class="lesson-feedback-dock assessment-feedback ${s.feedback.correct?"correct":"incorrect"}" role="status" aria-live="polite">
   <div class="feedback-dock-inner">
    <div class="feedback-dock-info">
     <div class="feedback-status-row">
      <span class="feedback-badge ${s.feedback.correct?"correct":"incorrect"}" aria-hidden="true">${s.feedback.correct?"✓":"✕"}</span>
      <strong class="feedback-heading ${s.feedback.correct?"correct":"incorrect"}">${s.feedback.correct?"Ճիշտ է":"Դեռ ճիշտ չէ"}</strong>
     </div>
     <div class="feedback-explanation">
      ${fi(c,a.draft,s.feedback.correct)}
     </div>
    </div>
    <div class="feedback-dock-actions">
     <button class="button lesson-primary ${s.feedback.correct?"":"danger"}" id="assessment-continue">Շարունակել</button>
    </div>
   </div>
  </div>`:`
  <div class="lesson-feedback-dock idle" role="region" aria-label="Դասի գործողություններ">
   <div class="feedback-dock-inner">
    <div class="feedback-dock-info">
     <button type="button" class="text-button hint-toggle-btn" id="assessment-hint">
      ${(a.hintLevel||0)>=3?"Բոլոր հուշումները բացված են":a.hintLevel?"Հաջորդ հուշումը":"Հուշում"}
     </button>
    </div>
    <div class="feedback-dock-actions">
     <button class="button lesson-primary" id="assessment-check" ${et(c,a.draft)?"":"disabled"}>Ստուգել</button>
    </div>
   </div>
  </div>`;return`${u}<h2>${c.question}</h2><p class="task-counter">${o?"Սխալների կրկնություն":`Առաջադրանք ${n+1} / ${t.length}`} · ${o?"Կրկնությունը չի փոխում պաշտոնական գնահատականը։":`${c.weight||1} միավոր։ Գնահատվում է առաջին հաստատված պատասխանը։`}</p>${Kt(c,a.draft,r)}${l}${p}`}function oa(e,t,a,s,n,i){const r=Ra(t),o=r.machine,c=Oe(o),l=a[c],p=(o.phase==="MISTAKE_REVIEW"||o.feedback?.reviewing)&&l?.reviewVariant?{...l.reviewVariant,weight:l.weight}:l,y=()=>{s(),n()};return o.phase!=="FEEDBACK"&&Gs(e,r.draft,h=>{if(s(),h)n();else{const v=e.querySelector("#assessment-check");v&&(v.disabled=!et(p,r.draft))}}),e.querySelector("#assessment-hint")?.addEventListener("click",()=>{r.hintLevel=Math.min(3,(r.hintLevel||0)+1),B("hint"),y()}),e.querySelector("#assessment-check")?.addEventListener("click",()=>{if(!et(p,r.draft)||o.phase==="FEEDBACK")return;const h=e.querySelector("#assessment-check");h&&(h.disabled=!0);const v=va(p,r.draft,1)===1;Bs(o,r.draft,v),B(v?"correct":"incorrect"),y(),requestAnimationFrame(()=>{e.querySelector("#assessment-continue")?.focus()})}),e.querySelector("#assessment-continue")?.addEventListener("click",()=>{if(r.hintLevel=0,!!Fs(o,a.length)){if(r.draft=r.pendingDraft||{},delete r.pendingDraft,o.phase==="COMPLETED"){const h=o.original.map(v=>{const g=a[v.index],m=g.weight||1;return{answer:v.response,correct:v.correct,weight:m,points:va(g,v.response,m)}});r.review={corrected:o.corrected.length,unresolved:o.unresolved.map(v=>({question:a[v].question,why:a[v].why}))},B("complete"),i(h,r.review)}y()}}),()=>{}}function ra(e){const t=e.assessmentFlow?.machine;return t?`<div class="evidence"><p>Կրկնության ընթացքում ուղղված սխալներ՝ ${t.corrected.length}։ Սկզբնական գնահատականը չի փոխվել։</p>${t.unresolved.length?`<p>Դեռ կրկնելու կարիք ունեն ${t.unresolved.length} առաջադրանք։ Վերադարձիր դասի փորձին և փորձիր կրկին հանձնել։</p>${(e.assessmentFlow.review?.unresolved||[]).map(a=>`<details><summary>${ne(a.question)}</summary><p>${ne(a.why)}</p></details>`).join("")}`:"<p>Կրկնության փուլում չլուծված առաջադրանք չի մնացել։</p>"}</div>`:""}function fi(e,t,a){if(a)return`<p class="feedback-scientific">${ne(e.why)}</p>`;const s=t.choice!==void 0&&e.misconceptions?.[t.choice]?e.misconceptions[t.choice]:"";return`<p class="feedback-scientific">${s?`<strong>Ինչու այս տարբերակը չի աշխատում․</strong> ${ne(s)} `:""}<strong>Գիտական բացատրություն․</strong> ${ne(e.why)}</p>`}function Hs(e,t){const a=e.investigations?.[t],s=e.electricLessons?.[t],n=t==="motion"?{stage:e.stage,runs:e.runs,prediction:e.prediction,answers:e.answers,assessment:e.assessment,conclusion:e.conclusion,motionFlow:e.motionFlow}:a||s||e.checkpoints?.[t];n&&(e.lessonAttemptArchives||=[],e.lessonAttemptArchives.push({lessonId:t,closed:Date.now(),record:structuredClone(n)})),t==="motion"&&delete e.motionFlow,t==="motion"?Object.assign(e,{stage:0,unlockedStage:0,runs:[],prediction:null,answers:{},assessment:null,conclusion:"",verification:"",reflection:""}):(e.checkpoints&&delete e.checkpoints[t],e.investigations&&delete e.investigations[t],e.electricLessons&&delete e.electricLessons[t],e.investigationMigrations||={},e.investigationMigrations[t]=!0),delete e.lessonSession}function Ds(e,t){return t==="motion"?!!e.assessment||(e.learning?.lessons?.motion?.bestStars||0)>=2:!!(e.checkpoints?.[t]?.completed||e.investigations?.[t]?.completed||e.electricLessons?.[t]?.completed||(e.learning?.lessons?.[t]?.bestStars||0)>=2)}function mi(e){const t=document.activeElement,a=document.createElement("dialog");a.id="lesson-exit-dialog",a.setAttribute("aria-labelledby","lesson-exit-title"),a.setAttribute("aria-describedby","lesson-exit-description"),a.innerHTML='<h2 id="lesson-exit-title">Դո՞ւրս գալ դասից։</h2><p id="lesson-exit-description">Նորից բացելիս այս դասը կսկսվի սկզբից։ Նախկին աստղերն ու տետրի գրառումները կմնան։</p><div class="exit-actions"><button class="button" id="stay-in-lesson" autofocus>Մնալ դասում</button><button class="button secondary" id="leave-lesson">Դուրս գալ դասից</button></div>';const s=()=>{a.close(),a.remove()};a.querySelector("#stay-in-lesson").onclick=()=>{s(),t?.isConnected&&t.focus()},a.querySelector("#leave-lesson").onclick=()=>{s(),e()},a.oncancel=n=>{n.preventDefault(),a.querySelector("#stay-in-lesson").click()},document.body.append(a),a.showModal()}const gi=["id","data-checkpoint-answer","data-checkpoint-practice","data-practice-answer","data-terminal","data-wire-end","data-wire-id","data-component","data-activity-choice","data-activity-match","data-foundation-answer","data-page","data-module","data-topic","data-science-param","data-edit","data-delete","data-predict","data-observe","data-quiz","data-stage","data-remove-wire","data-remove-junction","data-add-component"];function Us(e){return["h1",".lesson-track",".robot-dialogue h2"].map(t=>{const a=e.querySelector(t);return a?.getAttribute("aria-valuenow")||a?.textContent||""}).join("|")}function bi(e){const t=document.activeElement;return!e?.contains(t)||t===e||t===document.body?null:{identity:gi.filter(s=>t.hasAttribute(s)).map(s=>[s,t.getAttribute(s)]),tag:t.tagName,text:t.textContent,view:Us(e),start:t.selectionStart,end:t.selectionEnd}}function yi(e,t){if(!t)return;let a;const s=Us(e)===t.view;if(s&&(a=[...e.querySelectorAll("button,input,select,textarea,a,summary,[tabindex]")].find(n=>n.tagName===t.tag&&(t.identity.length?t.identity.every(([i,r])=>n.getAttribute(i)===r):n.textContent===t.text)),a&&(a.disabled||!a.getClientRects().length)&&(a=null)),s&&!a&&(a=e.querySelector(".assessment-feedback")||e.querySelector(".robot-response:not(:empty)")||(t.identity.some(([n,i])=>n==="id"&&i==="circuit-hint")?e.querySelector("#circuit-diagnostic"):null)),a||=e.querySelector(".robot-dialogue h2")||e.querySelector(".learning-summary h2")||e.querySelector("h1")||e.querySelector("#main-content"),!!a&&(a.matches("button,input,select,textarea,a,summary,[tabindex]")||(a.tabIndex=-1),a.focus({preventScroll:!0}),a.matches("input,textarea")&&t.start!=null&&s))try{a.setSelectionRange(t.start,t.end)}catch{}}const X=(e,t,a,s)=>({type:"choice",question:e,options:t,correct:a,why:s}),se=(e,t,a,s)=>({type:"number",question:e,answer:t,unit:a,why:s}),lt=(e,t)=>({type:"matching",question:"Միացրու պայմանն ու ֆիզիկական հետևանքը։",pairs:e,why:t}),ct=(e,t,a,s,n)=>({id:e,title:t,kind:a,unit:s,classification:s==="electronics"?"supplementary-electronics":"prerequisite-foundation",source:null,...n}),vi="Մեկ իդեալական DC աղբյուր, երկու օհմական բեռ, անտեսված լարերի դիմադրություն։ Չափման տեղն ընտրելիս ցուցադրվում է հենց այդ ճյուղի հաշվարկված մեծությունը։",xi=[ct("ohm","Օհմի օրենքը","electricity","quantities",{context:"Կարո՞ղ ես երկու տարբեր չափումներից բացահայտել նույն դիմադրության օրինաչափությունը։",prediction:X("Նույն R-ի դեպքում U-ն երկու անգամ մեծացնելիս I-ն ի՞նչ է անում։",["Կրկնապատկվում է","Չի փոխվում"],0,"Օհմական բեռի համար I = U/R։"),task:"Ընտրիր 6 Վ և 6 Օմ։ Գրանցիր հոսանքի ուժը։",variation:"R-ը պահիր 6 Օմ և լարումը մեծացրու մինչև 12 Վ։ Համեմատիր երկու չափումները։",observation:X("Նույն R-ի դեպքում U/I հարաբերությունն ինչպիսի՞ն է։",["Հաստատուն է","Անպայման զրո է"],0,"Այդ հարաբերությունը R-ն է։"),explanation:"Օհմի օրենքը կապում է օհմական բեռի լարումն ու հոսանքի ուժը՝ I = U/R։ Այն չի ասում, որ բոլոր նյութերի դիմադրությունը միշտ նույնն է․ այս փորձը հաստատուն ջերմաստիճանով մոտարկում է։",formula:"I = U/R",assumptions:"Օհմական դիմադրիչ՝ հաստատուն ջերմաստիճանով, իդեալական աղբյուր։ LED-ը այս գծային օրենքով միայնակ չենք մոդելավորում։",assessment:[X("U = 6 Վ, R = 3 Օմ։ Եթե երկու թվերն էլ կրկնապատկենք, I-ն ինչպե՞ս կփոխվի։",["Չի փոխվի","Կկրկնապատկվի"],0,"Ե՛վ համարիչը, և՛ հայտարարը նույն գործակցով փոխվեցին։"),se("12 Վ և 6 Օմ բեռի հոսանքի ուժը քանի՞ Ա է։",2,"Ա","I = 12/6 = 2։"),lt([["U-ն մեծացնել, R-ն նույնը","I-ն մեծանում է"],["R-ը մեծացնել, U-ն նույնը","I-ն փոքրանում է"]],"Համեմատելիս նշիր՝ որ պայմանն է նույնը։")]}),...[["series","Հաջորդական միացում",!1,"current","Երկու բեռ իրար հետևից են։ Նրանց միջով տարբեր հոսանքնե՞ր կարող են անցնել կայուն վիճակում։",X("Հաջորդական միացման կայուն հոսանքն ինչպիսի՞ն է տարբեր տեղերում։",["Նույնն է","Պարտադիր տարբեր է"],0,"Միևնույն ճանապարհում լիցք չի կուտակվում։"),se("4 Օմ և 6 Օմ հաջորդական միացման դիմադրությունը քանի՞ Օմ է։",10,"Օմ","Դիմադրությունները գումարվում են։")],["series-current","Հոսանքի ուժը հաջորդական շղթայում",!1,"current","Չափիչը հերթով տեղափոխենք աղբյուրի մոտ և յուրաքանչյուր բեռի մոտ։ Ի՞նչ ենք համեմատում։",X("Նույն հաջորդական շղթայում երկրորդ բեռի հոսանքը առաջինից փոքր կլինի՞։",["Ո՛չ","Այո՛, հոսանքը ծախսվում է"],0,"Հոսանքը չի ծախսվում բեռում․ էներգիան է փոխակերպվում։"),se("Հաջորդական շղթայի աղբյուրի հոսանքը 0.5 Ա է։ Երկրորդ բեռով անցնող հոսանքը քանի՞ Ա է։",.5,"Ա","Բոլոր տարրերով նույն հոսանքն է անցնում։")],["series-voltage","Լարումը հաջորդական շղթայում",!1,"voltage","Նույն հոսանքը տարբեր դիմադրությունների վրա ինչպիսի՞ լարման անկումներ է ստեղծում։",X("Հաջորդական շղթայում մեծ դիմադրության լարման անկումը ինչպիսի՞ն է։",["Ավելի մեծ","Միշտ ավելի փոքր"],0,"U₁ = IR₁, իսկ I-ն նույնն է։"),se("2 Ա հոսանք է անցնում 3 Օմ բեռով։ Այդ բեռի լարումը քանի՞ Վ է։",6,"Վ","U = IR = 2 × 3։")],["branch-current","Հոսանքի բաշխումը զուգահեռ ճյուղերում",!0,"current","Երկու ճյուղերում փոխենք միայն մեկ բեռը։ Ո՞ր չափիչի ցուցմունքն է փոխվում։",X("Նույն աղբյուրի երկու զուգահեռ ճյուղերից մեկի R-ը փոխելիս մյուսի U-ն փոխվո՞ւմ է իդեալական մոդելում։",["Ո՛չ","Այո՛, պարտադիր"],0,"Աղբյուրը պահում է նույն հանգույցների լարումը։"),se("Ճյուղերի հոսանքները 1 Ա և 2 Ա են։ Աղբյուրի հոսանքը քանի՞ Ա է։",3,"Ա","I = I₁ + I₂։")],["equivalent-resistance","Համարժեք դիմադրություն",!1,"current","Կարո՞ղ ենք երկու դիմադրիչը փոխարինել մեկով՝ աղբյուրի նույն հոսանքը ստանալով։",X("Զուգահեռ միացման համարժեք R-ը փոքր կլինի՞ ամենափոքր ճյուղի R-ից։",["Այո՛","Ո՛չ"],0,"Լրացուցիչ ճյուղը մեծացնում է հաղորդականությունը։"),se("6 Օմ և 3 Օմ զուգահեռ միացման համարժեք դիմադրությունը քանի՞ Օմ է։",2,"Օմ","1/R = 1/6 + 1/3 = 1/2։")],["compare-circuits","Համեմատիր երկու շղթա",!1,"current","Նույն բեռերն ու աղբյուրը պահենք, բայց փոխենք միայն միացման կառուցվածքը։",X("Նույն դրական բեռերով զուգահեռ միացման աղբյուրի հոսանքը հաջորդականի համեմատ ինչպիսի՞ն է։",["Ավելի մեծ","Ավելի փոքր"],0,"Զուգահեռ միացման համարժեք դիմադրությունը փոքր է։"),se("Երկու 10 Օմ բեռը հաջորդաբար միացնելիս ընդհանուր R-ը քանի՞ Օմ է։",20,"Օմ","10 + 10 = 20։")]].map(([e,t,a,s,n,i,r])=>ct(e,t,"legacy-series","connections",{context:n,initial:{parallel:a},probeFocus:s,prediction:i,task:"Չափման տեղով ընտրիր աղբյուրը, առաջին և երկրորդ բեռը։ Գրանցիր ընտրած չափման արժեքը և բացիր ճյուղերի չափումները։",variation:e==="compare-circuits"||e==="equivalent-resistance"?"Նույն բեռերով փոխիր միացման ձևը և գրանցիր նոր չափումը։":"Փոխիր միայն երկրորդ դիմադրությունը։ Նույն չափման տեղում գրանցիր արդյունքը, հետո ստուգիր մյուս բեռը։",observation:i,explanation:a?"Զուգահեռ ճյուղերի լարումները նույնն են, իսկ աղբյուրի հոսանքը ճյուղերի հոսանքների գումարն է։ Ճյուղի հոսանքը կախված է իր դիմադրությունից։":"Հաջորդական շղթայում հոսանքը նույնն է։ Բեռների լարումները U₁ = IR₁ և U₂ = IR₂ են, իսկ դրանց գումարը աղբյուրի լարումն է։ Կառուցվածքը փոխելիս ընտրիր ճիշտ բանաձևը։",formula:"Հաջորդական՝ R = R₁ + R₂ · զուգահեռ՝ 1/R = 1/R₁ + 1/R₂",assumptions:vi,assessment:[i,r,lt([["Հաջորդական տարրեր","Նույն հոսանքի ուժ"],["Զուգահեռ ճյուղեր","Նույն լարում"]],"Միացման ձևը որոշում է նույն մնացող մեծությունը։")]})),...[["electric-work","Էլեկտրական հոսանքի աշխատանքը","Լիցքի տեղափոխման ժամանակ փոխանցվող էներգիան ինչպե՞ս է կախված լարումից ու լիցքից։",se("6 Վ լարմամբ 2 Կլ լիցքի տեղափոխման աշխատանքը քանի՞ Ջ է։",12,"Ջ","A = Uq = 6 × 2։")],["power","Էլեկտրական հզորություն","Նույն ժամանակում ավելի մեծ աշխատանք կատարող սարքի հզորությունը ինչպիսի՞ն է։",se("6 Վ և 0.5 Ա հոսանքի դեպքում հզորությունը քանի՞ Վտ է։",3,"Վտ","P = UI = 6 × 0.5։")],["electric-energy","Էլեկտրական էներգիա","Սարքի հզորությունն ու աշխատանքի տևողությունը տարբեր կերպ են որոշում ծախսը։",se("1 կՎտ·ժ էներգիան քանի՞ Ջ է։",36e5,"Ջ","1000 Վտ × 3600 վ = 3 600 000 Ջ։")],["joule-heating","Հոսանքի ջերմային ազդեցությունը","Դիմադրիչի տաքացումը ուսումնասիրելիս ի՞նչ պայման պետք է նույնը պահենք։",se("2 Ա հոսանքի, 3 Օմ բեռի և 5 վ-ի դեպքում անջատված ջերմությունը քանի՞ Ջ է։",60,"Ջ","Q = I²Rt = 4 × 3 × 5։")],["lamp-power","Լամպի հզորությունն ու լուսարձակումը","Էլեկտրական հզորությունը և լույսի հոսքը նույն մեծությունը չեն։ Եկ հետևենք մեր իդեալական բեռի հզորությանը։",se("4 Վ լարման և 2 Ա հոսանքի դեպքում էլեկտրական հզորությունը քանի՞ Վտ է։",8,"Վտ","P = UI։ Սա լույսի հոսքի չափում չէ։")],["energy-experiment","Վիրտուալ էներգետիկ փորձ","Նույն բեռով նախագծենք փոքր ծախսով փորձ։ Ինչպե՞ս կհիմնավորես ընտրությունդ չափումներով։",se("3 Վտ հզորությամբ բեռը 10 վ-ում քանի՞ Ջ էներգիա է փոխակերպում։",30,"Ջ","E = Pt = 3 × 10։")]].map(([e,t,a,s])=>ct(e,t,"legacy-power","electric-energy",{context:a,initial:{voltage:6,resistance:12,time:10,lamp:e==="lamp-power"},prediction:X("Նույն հզորությամբ աշխատանքի ժամանակը կրկնապատկելիս էներգիան ինչպե՞ս կփոխվի։",["Կկրկնապատկվի","Չի փոխվի"],0,"E = Pt։"),task:"Գրանցիր լարումը, դիմադրությունը, հոսանքի ուժը, հզորությունն ու էներգիան։ Դրանք հաշվվում են նույն DC մոդելով։",variation:e==="joule-heating"?"Նույն լարմամբ մեծացրու դիմադրությունը։ Հոսանքն էլ է փոխվում․ ստուգիր՝ ինչ է լինում ջերմային հզորության հետ։":"U-ն ու R-ը պահիր նույնը և աշխատանքի ժամանակը կրկնապատկիր։ Համեմատիր հզորությունն ու էներգիան։",observation:X("Նույն U-ի և R-ի դեպքում ժամանակը մեծացնելիս հզորությունը փոխվո՞ւմ է։",["Ո՛չ","Այո՛, այն ժամանակ է"],0,"Հզորությունը էներգիայի փոխանցման արագությունն է, ոչ ընդհանուր էներգիան։"),explanation:"Հաստատուն DC պայմաններում P = UI, իսկ աշխատանքն ու էներգիան E = Pt են։ Օհմական բեռի համար P = I²R = U²/R։ Միևնույն R-ը մեծացնելիս պատասխանը կախված է նրանից՝ հաստատուն պահում ենք I-ն, թե U-ն։ Էլեկտրական հզորությունը լույսի հոսք չէ․ մեր գունավորումը միայն որակական ցուցիչ է։",formula:"P = UI · E = Pt · Q = I²Rt",assumptions:"Իդեալական DC աղբյուր, հաստատուն օհմական դիմադրություն։ Ջերմային օրինակում ամբողջ աշխատանքը վերածվում է ջերմության, ջերմաստիճանն ու սառեցումը չենք հաշվում։ Լամպի իրական տաքացման դիմադրությունն ու լուսային ՕԳԳ-ն չեն մոդելավորվում։",assessment:[X("Երկու սարք նույն հզորությամբ են։ Երկար աշխատածն ինչքա՞ն էներգիա է ծախսում։",["Ավելի շատ","Միշտ նույնը"],0,"Համեմատիր ամբողջ աշխատանքի տևողությունը։"),s,lt([["Վատտ","Հզորություն"],["Ջոուլ","Աշխատանք կամ էներգիա"]],"1 Վտ = 1 Ջ/վ։")]})),...[["components","Ռեզիստորներ և բաղադրիչների ուսումնասիրություն",0,"Դիմադրիչը հոսանքը սահմանափակում է։ Ծանոթանանք նրա դերին, իսկ ցանկության դեպքում ուսումնասիրենք նաև մյուս բաղադրիչները։",se("5 Վ աղբյուրին միացված 1000 Օմ դիմադրիչի հոսանքը քանի՞ Ա է։",.005,"Ա","I = 5/1000։"),X("Նույն լարմամբ մեծ R-ը հոսանքն ինչպե՞ս է փոխում։",["Փոքրացնում է","Մեծացնում է"],0,"I = U/R։"),[["Դիմադրիչ","Հոսանքի սահմանափակում"],["Լիցք կուտակող տարր","Կոնդենսատոր"]]],["led","Լուսադիոդներ",1,"Ինչո՞ւ է լուսադիոդի ոտքերի ուղղությունը կարևոր, և ինչո՞ւ է պետք սահմանափակող դիմադրիչ։",se("5 Վ աղբյուրի, 2 Վ LED-ի և 300 Օմ դիմադրիչի դեպքում I-ն քանի՞ Ա է։",.01,"Ա","Դիմադրիչի վրա 3 Վ է․ I = 3/300։"),X("Սխալ բևեռականությամբ LED-ը այս ցածր լարման մոդելում վառվո՞ւմ է։",["Ո՛չ","Այո՛"],0,"Հակառակ ուղղությամբ հոսանքը մոտարկում ենք զրոյով։"),[["Ուղիղ միացում","Հոսանք հնարավոր է"],["Հակառակ միացում","Հոսանքը մոտարկվում է զրոյով"]]],["diode","Դիոդի աշխատանքի սկզբունքը",2,"Դիոդը երկու ուղղություններով նույն կերպ չի հաղորդում։ Ստուգենք դրա հետևանքը շղթայում։",se("5 Վ աղբյուրի, 0.7 Վ դիոդի և 1000 Օմ դիմադրիչի դեպքում հոսանքը քանի՞ Ա է։",.0043,"Ա","I = (5 − 0.7)/1000։"),X("Դիոդը փոխում ենք հակառակ ուղղության։ Այս մոդելի հոսանքն ինչքա՞ն է։",["Զրո","Միշտ նույնը"],0,"Հակառակ արտահոսքն ու ծակումը չեն հաշվարկվում։"),[["Դիոդի ուղիղ միացում","Հաղորդող ուղղություն"],["Դիոդի հակառակ միացում","Փակ ուղղության մոտարկում"]]],["capacitor","Կոնդենսատոր",3,"Լիցքավորման հենց սկզբում կոնդենսատորի լարումը միանգամից հասնո՞ւմ է աղբյուրի լարմանը։",se("1000 Օմ և 1000 մկՖ RC շղթայի ժամանակի հաստատունը քանի՞ վ է։",1,"վ","1000 մկՖ = 0.001 Ֆ, τ = RC։"),X("RC լիցքավորման սկզբից լարումը ինչպե՞ս է աճում։",["Աստիճանաբար","Միշտ միանգամից"],0,"Uc = U(1 − exp(−t/RC))։"),[["Լիցքավորման սկզբում","Uc = 0"],["Երկար լիցքավորումից հետո","Uc-ն մոտենում է U-ին"]]],["transistor","Տրանզիստորի հիմունքները",4,"Փոքր կառավարման ազդանշանը կարող է բացել կամ փակել բեռի ճանապարհը։ Էներգիան որտեղի՞ց է գալիս։",se("5 Վ աղբյուրի և 1000 Օմ բեռի իդեալական փակ բանալու դեպքում հոսանքը քանի՞ Ա է։",.005,"Ա","Փակ ճանապարհում I = U/R։"),X("Կառավարվող բանալին ինքն է՞ բեռի էներգիան ստեղծում։",["Ո՛չ, այն գալիս է աղբյուրից","Այո՛"],0,"Կառավարումը փոխում է ճանապարհը, ոչ էներգիայի պահպանման օրենքը։"),[["Կառավարման ազդանշան","Կառավարում է ճանապարհը"],["Սնուցման աղբյուր","Տալիս է բեռի էներգիան"]]],["breadboard","Փորձասալ",5,"Փորձասալի հինգ մոտիկ անցքերը ո՞ր դեպքում են միացված, իսկ երբ՝ բաժանված։ Մոտիկ լինելը բավարար չէ։",se("Այս ուսումնական փորձասալի մեկ կապակցված խմբում քանի՞ անցք կա։",5,"անցք","Հինգ անցքերը նույն հաղորդիչ խմբում են։"),X("Կենտրոնական ակոսի տարբեր կողմերի խմբերը ինքնաբերաբար միացվա՞ծ են։",["Ո՛չ","Այո՛"],0,"Կենտրոնական ակոսը բաժանում է խմբերը։"),[["Նույն կապակցված խումբ","Կապ կա"],["Բաժանված խմբեր","Կապ չկա"]]]].map(([e,t,a,s,n,i,r])=>ct(e,t,"legacy-components","electronics",{context:s,initial:{component:a,voltage:5,resistance:a===1?300:1e3,capacitance:1e3,forward:!0,gate:!1,sameRow:!1},fixedComponent:e==="components"?void 0:a,prediction:i,task:a===3?"Սկսիր RC լիցքավորումը, մի փոքր անց դադարեցրու և գրանցիր լարումը։":a===4?"Միացրու, հետո անջատիր կառավարումը և գրանցիր ելքի վիճակը։":a===5?"Ընտրիր նույն և տարբեր խմբերի փորձերը։ Գրանցիր կապի արդյունքը։":"Ընտրիր այս դասի բաղադրիչը, փոփոխիր դիմադրությունը և գրանցիր հոսանքը։ LED-ի դեպքում պահիր թույլատրելի մինչև 20 մԱ հոսանքը։",variation:a===3?"Մեծացրու դիմադրությունը, սկսիր նոր լիցքավորում և համեմատիր նույն ժամանակի լարումը։":a===4?"Փոխիր կառավարման վիճակը և գրանցիր նոր ելքը։":a===5?"Փոխիր ընտրված կապակցված խումբը և համեմատիր արդյունքը։":a===0?"Նույն լարմամբ կրկնապատկիր դիմադրությունը և գրանցիր նոր հոսանքը։":"Փոխիր միայն բևեռականությունը և համեմատիր հոսանքը։",observation:i,explanation:a===3?"Կոնդենսատորը լիցք ու էներգիա է կուտակում։ RC շղթայի լարումը փոխվում է աստիճանաբար։ Լիցքաթափման նոր փորձը սկսվում է ընտրված U₀ լարումից։":a===4?"Այս փորձը տրանզիստորը ներկայացնում է իդեալական կառավարվող բանալու պես։ Այն չի հաշվարկում կոնկրետ BJT կամ MOSFET-ի ուժեղացումը և բնութագրերը։":a===5?"Սխեմայի կապերը որոշվում են ներքին հաղորդիչ խմբերով։ Մեր մոդելում յուրաքանչյուր հնգյակը միացված է, իսկ հարևան հնգյակներն ու կենտրոնի ակոսը՝ բաժանված։":"Դիմադրիչը հոսանք է սահմանափակում։ Դիոդը նախընտրելի ուղղությամբ է հաղորդում, իսկ LED-ը նաև լույս է տալիս։ Մեր դիոդները կտորային պարզ մոդելներ են․ դրանք ամբողջական տվյալաթերթ չեն փոխարինում։",formula:a===3?"τ = RC · Uc = U(1 − exp(−t/RC))":a===4?"Կառավարում → բանալու վիճակ → բեռի հոսանք":a===5?"Նույն հնգյակ՝ նույն հաղորդիչ խումբ":a===0?"I = U/R":"I = (U − Uուղիղ)/R",assumptions:"Ցածր լարման վիրտուալ շղթաներ։ LED-ի ուղիղ անկումը՝ 2 Վ և առավելագույն ուսումնական հոսանքը՝ 20 մԱ, դիոդինը՝ 0.7 Վ։ Հակառակ արտահոսքն ու ծակումը անտեսված են։ Տրանզիստորը՝ իդեալական բանալի, փորձասալը՝ հնգյակների կապակցություն, RC-ն՝ իդեալական աղբյուր/դիմադրիչ/կոնդենսատոր։ Սա լրացուցիչ էլեկտրոնիկա է, ոչ հաստատված դասագրքային բաժին։",assessment:[i,n,lt(r,"Կիրառիր հենց ընտրված բաղադրիչի ուսումնական մոդելը։")]})),ct("project","LED շղթայի կառուցում","legacy-project","electronics",{context:"Հավաքենք ցածր լարման աշխատող լույս՝ աղբյուր, անջատիչ, LED և սահմանափակող դիմադրիչ։",initial:{resistance:300,forward:!0,closed:!1,source:!1,led:!1,resistor:!1,wires:!1},prediction:X("LED-ը կարո՞ղ ենք այս մոդելում միացնել առանց սահմանափակող դիմադրիչի։",["Ո՛չ","Այո՛"],0,"Առանց սահմանափակման հոսանք չենք հորինում․ LED-ը չի միացվում։"),task:"Ավելացրու չորս մասերը և փակիր անջատիչը։ Գրանցիր աշխատող լույսի հոսանքը։",variation:"Փոխիր միայն LED-ի բևեռականությունը և գրանցիր նոր հոսանքը։ Փորձիր նաև մուլտիմետրի հոսանքի ու լարման ռեժիմները։",observation:X("Ճիշտ հավաքված, բայց հակառակ LED-ով շղթան լուսարձակո՞ւմ է այս մոդելում։",["Ո՛չ","Այո՛"],0,"Հակառակ ուղղությամբ հոսանքը զրո է մոտարկված։"),explanation:"Սնուցման 5 Վ-ից LED-ի վրա մոտ 2 Վ անկում է։ Դիմադրիչի վրա մնում է 3 Վ։ 300 Օմ-ի դեպքում հոսանքը 0.01 Ա է։ Բևեռականությունն ու հոսանքի սահմանափակումը տարբեր պայմաններ են․ երկուսն էլ ստուգիր։",formula:"I = (5 Վ − 2 Վ)/R",assumptions:"Իդեալական ցածր լարման վիրտուալ LED, ուղիղ անկումը՝ 2 Վ, մինչև 20 մԱ։ Հակառակ ծակում, սարքերի ջերմություն և իրական տվյալաթերթի սահմաններ չեն մոդելավորվում։",assessment:[X("LED-ը ճիշտ ուղղությամբ է, բայց R-ը զրո է։ Կարելի՞ է պնդել անվտանգ հոսանքի արժեք։",["Ո՛չ, մոդելը չի տալիս այդ չափումը","Այո՛, միշտ 0.01 Ա"],0,"Պետք է հոսանքի սահմանափակում։"),se("5 Վ, 2 Վ LED և 300 Օմ դիմադրիչ․ I-ն քանի՞ Ա է։",.01,"Ա","I = (5 − 2)/300։"),lt([["Դիմադրիչ","Հոսանքի սահմանափակում"],["LED-ի ուղղություն","Բևեռականություն"]],"Ստուգիր և՛ կապերը, և՛ բաղադրիչի պայմանները։")]}),ct("electronics-project","Պարզ էլեկտրոնային նախագիծ","legacy-sensors","electronics",{context:"Նախագծենք վիրտուալ գիշերային լույս․ այն միանա, երբ լուսավորությունը շեմից ցածր է։",initial:{sensor:"light",reading:50,threshold:30},prediction:X("«Միացնել, երբ մութ է» կանոնը ինչի՞ կարիք ունի։",["Չափման և համեմատության","Միայն պատկերի գույնի"],0,"Սենսորը տալիս է չափում, կանոնը՝ որոշում։"),task:"Ընտրիր լույսի սենսորը, չափումն ու շեմը։ Գրանցիր միացված կամ անջատված ելքը։",variation:"Չափումը պահիր նույնը և փոխիր շեմը, մինչև ելքը փոխվի։ Գրանցիր նոր կանոնը։",observation:X("Շեմը փոխելիս սենսորի իրական չափումը պարտադի՞ր է փոխվում։",["Ո՛չ","Այո՛"],0,"Շեմը որոշման պայմանն է, ոչ չափման արժեքը։"),explanation:"Կառավարումը համեմատում է չափումը շեմի հետ։ Լույսի սենսորի համար մեր կանոնն է «միացնել, եթե չափումը փոքր է շեմից»։ Հավասարության դեպքում այս խիստ անհավասարությունը չի միացնում ելքը։",formula:"Չափում < շեմ → միացնել ելքը",assumptions:"Իդեալական թվային սենսոր և համեմատիչ․ առանց աղմուկի, ուշացման, հիստերեզիսի կամ իրական LDR-ի էլեկտրական բնութագրի։ Սենսորի միավորը ընտրված տեսակից է կախված։",assessment:[X("Չափումը հենց 30 լք է, շեմը՝ 30 լք, պայմանը՝ «փոքր է»։ Ելքը միացվա՞ծ է։",["Ո՛չ","Այո՛"],0,"Հավասարը փոքր չէ։"),se("20 լք < 30 լք կանոնի դեպքում մուտքագրիր 1՝ ելքը միացված է, 0՝ անջատված։",1,"","20-ը փոքր է 30-ից։"),lt([["Սենսոր","Տալիս է չափում"],["Շեմային կանոն","Որոշում է ելքը"]],"Չափելն ու որոշում ընդունելը տարբեր քայլեր են։")]})],$i=(e,t,a,s)=>({type:"choice",question:e,options:t,correct:a,why:s}),wi=(e,t,a,s)=>({type:"number",question:e,answer:t,unit:a,why:s}),ki=(e,t)=>({type:"matching",question:"Միացրու պայմանն ու համապատասխան հետևանքը։",pairs:e,why:t}),me=(e,t,a,s,n)=>({id:e,title:t,kind:a,unit:s,classification:"prerequisite-foundation",source:null,...n}),P=$i,re=wi,ie=ki,ze=[me("charges","Էլեկտրական լիցք","charges","charge",{context:"Երկու թեթև գնդիկներ երբեմն իրար մոտենում են, երբեմն՝ հեռանում։ Եկ պարզենք՝ լիցքի նշանն ու հեռավորությունն ինչ են փոխում։",prediction:P("Տարբեր նշանով լիցքերը ինչպե՞ս կփոխազդեն։",["Կձգեն իրար","Կվանեն իրար"],0,"Տարալիցք մարմինները ձգում են իրար։"),task:"Նախ գրանցիր տարանուն լիցքերի չափումը։ Հետո ընտրիր «Նույնանուն» և նորից գրանցիր։ Ուշադիր նայիր ուժի սլաքներին․ ի՞նչն է փոխվում։",variation:"Լիցքերի նշանն ու մեծությունը պահիր նույնը։ Կրկնապատկիր կամ կիսիր հեռավորությունը և գրանցիր նոր չափումը։ Համեմատիր ուժերը՝ ի՞նչ չափով փոխվեց ուժը։",observation:P("Երբ երկու լիցքերն էլ նույն նշանն ունեին, սլաքներն ի՞նչ ցույց տվեցին։",["Գնդիկները վանում էին իրար","Գնդիկները ձգում էին իրար"],0,"Նույնանուն լիցքերի ուժերն ուղղված են իրարից հեռու․ նրանք վանում են իրար։"),explanation:"Քո երկու փորձերում նշանը փոխելիս ուժի ուղղությունը փոխվեց։ Նույնանուն լիցքերը վանում են, տարանունները՝ ձգում։ Հիմա ստուգենք երկրորդ կապը՝ հեռավորության ազդեցությունը։ Բանաձևում r-ը հենց գնդիկների միջև քո չափած հեռավորությունն է։",formula:"F = k |q₁q₂| / r²",assumptions:"Կետային անշարժ լիցքեր՝ վակուումում, k ≈ 8.99 × 10⁹ Ն·մ²/Կլ²։ Լիցքերը՝ նԿլ, 1 նԿլ = 10⁻⁹ Կլ։ Ուժի փոքր արժեքները ցույց ենք տալիս նՆ-ով՝ 1 նՆ = 10⁻⁹ Ն։ Առարկաների չափերն ու միջավայրի բևեռացումն անտեսված են։ Լիցքի սահիչով ընտրում ենք այլ սկզբնական կոնֆիգուրացիա, ոչ մեկուսացված համակարգում լիցք ստեղծում։",assessment:[P("Երկու դրական լիցքերի հեռավորությունը փոքրացրինք։ Ի՞նչ սպասենք։",["Ավելի ուժեղ վանման","Ավելի ուժեղ ձգման"],0,"Նշանները նույնն են, իսկ փոքր հեռավորությունը մեծացնում է ուժը։"),re("Հեռավորությունը կրկնապատկելիս ուժը քանի՞ անգամ է փոքրանում։",4,"անգամ","(2r)² = 4r²։"),ie([["Նույնանուն լիցքեր","Վանում"],["Տարանուն լիցքեր","Ձգում"]],"Նշանն է որոշում ձգում կամ վանում լինելը։")]}),me("atom","Ատոմի կառուցվածքը և էլեկտրոնները","atom","charge",{context:"Լիցքավորված մարմնի ներսում ի՞նչ է փոխվել։ Դիտենք միջուկի ու էլեկտրոնների պայմանական պատկերը՝ առանց այն իրական ուղեծրերի հետ շփոթելու։",prediction:P("Չեզոք ատոմը մեկ էլեկտրոն կորցնելիս ի՞նչ լիցք կունենա։",["Դրական","Բացասական"],0,"Էլեկտրոնը բացասական լիցք ունի․ դրա կորուստը թողնում է դրական ավելցուկ։"),task:"Ընտրիր երեք պրոտոն և երեք էլեկտրոն։ Հետո մեկ էլեկտրոն տեղափոխիր արտաքին պահոց՝ սահիչը նվազեցնելով։",variation:"Պահիր պրոտոնները նույնը և մեկ էլեկտրոն ավելացրու։ Հետևիր ատոմի ու պահոցի լիցքերի գումարին։",observation:P("Պրոտոնների ու էլեկտրոնների թվերը հավասար լինելիս լիցքը որքա՞ն է։",["Զրո","Միշտ դրական"],0,"+e և −e լիցքերը հավասար քանակով փոխհատուցվում են։"),explanation:"Միջուկում պրոտոնները դրական են, նեյտրոնները՝ չեզոք։ Էլեկտրոնները բացասական լիցք ունեն։ Պրոտոնների թիվն ընտրելիս ընտրում ենք այլ ատոմի մոդել․ միջուկային ռեակցիա չենք կատարում։",formula:"q = (Nպրոտոն − Nէլեկտրոն) e",assumptions:"e = 1.602176634 × 10⁻¹⁹ Կլ։ Ամպն ու մասնիկների դիրքերը պայմանական սխեմա են, ոչ քվանտային վիճակի հաշվարկ կամ դասական ուղեծրեր։ Պահոցը հաշվառում է տեղափոխված լիցքը։",assessment:[P("Ո՞ր մասնիկի տեղափոխությունն է սովորաբար կարևոր մարմինների էլեկտրականացման մեջ։",["Էլեկտրոնի","Միջուկից պոկված պրոտոնի"],0,"Հաղորդիչներում շարժունակ լիցքակիրները սովորաբար էլեկտրոններն են։"),re("Չորս պրոտոն և երեք էլեկտրոն ունեցող ատոմի լիցքը քանի՞ e է։",1,"e","4 − 3 = +1։"),ie([["Պրոտոն","Դրական"],["Էլեկտրոն","Բացասական"]],"Նեյտրոնի էլեկտրական լիցքը զրո է։")]}),me("electrification","Էլեկտրականացում","transfer","charge",{context:"Փուչիկը շփելուց հետո կարող է գրավել թեթև թղթիկներ։ Մեր պարզ փորձով կհետևենք լիցքի տեղափոխման հաշվեկշռին։",prediction:P("Երկու չեզոք մարմինների միջև էլեկտրոն փոխանցելիս ընդհանուր լիցքը փոխվո՞ւմ է։",["Ո՛չ","Այո՛, լիցք է ստեղծվում"],0,"Լիցքը փոխանցվում է, ոչ թե ստեղծվում։"),task:"Սահիչով կամ կենտրոնի սլաքը քաշելով մեկ պայմանական էլեկտրոն փոխանցիր Ա-ից Բ։ Գրանցիր երկու մարմնի լիցքերը։",variation:"Փոխանցիր ևս երկու էլեկտրոն, հետո փոխիր փոխանցման ուղղությունը։ Համեմատիր ընդհանուր լիցքը։",observation:P("Էլեկտրոն ստացող մարմինն ինչպե՞ս լիցքավորվեց։",["Բացասական","Դրական"],0,"Այն ստացավ բացասական լիցքի ավելցուկ։"),explanation:"Էլեկտրականացման ժամանակ լիցքակիրները կարող են անցնել մի մարմնից մյուսը։ Փոխանցվող բացասական լիցքին համապատասխանում է մյուս մարմնի դրական ավելցուկը։",formula:"qԱ + qԲ = հաստատուն",assumptions:"Երկու սկզբնապես չեզոք մարմին և արտաքին լիցքակիրների բացակայություն։ Էլեկտրոնների փոքր ամբողջ թիվը պայմանական հաշվառում է․ սա շփման միկրոսկոպիկ մեխանիզմի հաշվարկ չէ։",assessment:[P("Ա մարմնից Բ մարմին անցան էլեկտրոններ։ Ո՞րն է ճիշտ։",["Ա-ն դրական է, Բ-ն՝ բացասական","Երկուսն էլ պարտադիր դրական են"],0,"Ա-ն կորցրել է բացասական լիցք, Բ-ն ստացել է այն։"),re("Եթե Ա-ի լիցքը +3e է, Բ-ինը −3e, ընդհանուր լիցքը քանի՞ e է։",0,"e","+3e + (−3e) = 0։"),ie([["Էլեկտրոն կորցնել","Դրական ավելցուկ"],["Էլեկտրոն ստանալ","Բացասական ավելցուկ"]],"Ընդհանուր լիցքը մնում է նույնը։")]}),me("electric-field","Էլեկտրական դաշտ","field","charge",{context:"Լիցքերը կարող են փոխազդել առանց դիպչելու։ Եկ փորձնական փոքր լիցքով ուսումնասիրենք աղբյուրի ազդեցությունը։",prediction:P("Դրական աղբյուրի մոտ դրական փորձնական լիցքի վրա ուժը ո՞ւր է ուղղված։",["Աղբյուրից հեռու","Դեպի աղբյուրը"],0,"Երկու դրական լիցքերը վանում են իրար։"),task:"Քաշիր ոսկեգույն փորձնական լիցքը տարբեր դիրքեր։ Պահիր աղբյուրի նշանը և գրանցիր դաշտի լարվածությունը։",variation:"Փոխիր միայն փորձնական լիցքի նշանը։ Համեմատիր ուժն ու դաշտի լարվածությունը։",observation:P("Փորձնական լիցքի նշանը փոխելիս աղբյուրի դաշտը փոխվե՞ց։",["Ո՛չ, փոխվեց ուժի ուղղությունը","Այո՛, աղբյուրը պարտադիր շրջվեց"],0,"Դաշտը որոշում է աղբյուրը, իսկ ուժը՝ նաև փորձնական լիցքը։"),explanation:"Էլեկտրական դաշտի ուղղությունը որոշում ենք դրական փոքր փորձնական լիցքի վրա ազդող ուժով։ Բացասական փորձնական լիցքի ուժը հակառակ ուղղությունն ունի։",formula:"E = k |Q| / r² · F⃗ = qE⃗",assumptions:"Մեկ անշարժ կետային աղբյուր՝ վակուումում։ Փորձնական լիցքը չի փոխում աղբյուրի տեղը։ Սլաքները ուղղություններ են, ոչ ուժի մասշտաբային չափեր։ Ուժի շառավղային բաղադրիչի դրական նշանը աղբյուրից հեռու ուղղությունն է։",assessment:[P("Բացասական փորձնական լիցքի վրա ուժն ինչպե՞ս է ուղղված E⃗-ի նկատմամբ։",["Հակառակ","Միշտ նույն ուղղությամբ"],0,"q < 0-ի դեպքում F⃗ = qE⃗-ն հակառակ է։"),re("Եթե E = 10 Ն/Կլ և q = 2 Կլ, ուժի մոդուլը քանի՞ Ն է։",20,"Ն","F = |q|E = 2 × 10։"),ie([["Դրական փորձնական լիցք","Ուժը՝ դաշտի ուղղությամբ"],["Բացասական փորձնական լիցք","Ուժը՝ դաշտին հակառակ"]],"Դաշտը և փորձնական լիցքի վրա ուժը տարբեր մեծություններ են։")]}),me("current-origin","Էլեկտրական հոսանքի առաջացումը","current","charge",{initial:{closed:!1},context:"Մարտկոցը կա, բայց անջատիչը բաց է։ Էլեկտրոնները լարում շարժվում են նաև անկանոն․ ի՞նչ է պետք ուղղորդված հոսքի համար։",prediction:P("Կայուն հոսանքի համար միայն փակ մետաղյա ճանապարհը բավարա՞ր է՝ առանց աղբյուրի ազդեցության։",["Ո՛չ, պետք է նաև պոտենցիալների տարբերություն","Այո՛, ցանկացած լարը ինքն է աղբյուր"],0,"Աղբյուրը պահպանում է շարժմանը նպաստող պոտենցիալների տարբերությունը։"),task:"Բացիր կառավարման պայմանը և փակիր անջատիչը։ Սկսիր փորձը ու գրանցիր անցած լիցքը։",variation:"Բացիր անջատիչը և կրկին սկսիր փորձը։ Համեմատիր նույն տևողությամբ անցած լիցքը։",observation:P("Բաց շղթայում կայուն հոսանքի ուժն ինչքա՞ն է։",["Զրո","Միշտ աղբյուրի լարմանը հավասար"],0,"Ճանապարհն ընդհատված է։"),explanation:"Հոսանքը լիցքակիրների ուղղորդված շարժումն է։ Մետաղում էլեկտրոնների դրեյֆը հակառակ է պայմանական հոսանքի ուղղությանը։ Ազդանշանի տարածումն ու մասնիկների դրեյֆը տարբեր երևույթներ են։",formula:"I = Δq / Δt",assumptions:"Իդեալական հաստատուն աղբյուր և օհմական բեռ։ Դրեյֆի օրինակում n = 8.5 × 10²⁸ մ⁻³, A = 10⁻⁶ մ²։ Ազդանշանի տարածման արագությունը չենք մոդելավորում։",assessment:[P("Մետաղյա լարում էլեկտրոնների դրեյֆը ո՞ր ուղղությամբ է պայմանական հոսանքի համեմատ։",["Հակառակ","Միշտ նույն ուղղությամբ"],0,"Պայմանական հոսանքի ուղղությունը դրական լիցքի ուղղությամբ է։"),re("2 վայրկյանում անցել է 6 Կլ լիցք։ Հոսանքի ուժը քանի՞ Ա է։",3,"Ա","I = 6 Կլ / 2 վ։"),ie([["Փակ ճանապարհ և աղբյուր","Կայուն հոսանք հնարավոր է"],["Բաց ճանապարհ","Կայուն հոսանքը զրո է"]],"Պետք են և՛ ճանապարհ, և՛ աղբյուրի ազդեցություն։")]}),...[["sources","Էլեկտրական հոսանքի աղբյուրներ","Քիմիական էներգիան կարո՞ղ է արտաքին շղթայում էլեկտրական աշխատանք կատարել։","Աղբյուրը քիմիական էներգիան փոխակերպում է էլեկտրական էներգիայի։ Այն լիցք չի ստեղծում։","Ո՞րն է Դանիելի տարրի էներգիայի աղբյուրը։",["Քիմիական ռեակցիան","Միայն լարի երկարությունը"],0],["galvanic","Գալվանական տարրի կառուցվածքը","Երկու տարբեր էլեկտրոդներ, համապատասխան լուծույթներ և երկու տեսակի կապ։ Հավաքենք ամբողջ պատկերը։","Դանիելի տարրը կազմված է ցինկի և պղնձի կիսատարրերից։ Արտաքին մետաղյա կապն ու ներքին իոնային կապը տարբեր դերեր ունեն։","Կայուն հոսանքի համար ո՞ր կապերն են անհրաժեշտ։",["Արտաքին մետաղյա և ներքին իոնային","Միայն արտաքին մետաղյա"],0],["electrolytes","Էլեկտրոդներ և էլեկտրոլիտ","Ինչո՞ւ միայն երկու մետաղյա թիթեղը դեռ ամբողջական տարր չէ։ Հեռացնենք ու վերադարձնենք լուծույթները։","Ցինկի էլեկտրոդը ZnSO₄, պղնձինը՝ CuSO₄ լուծույթում է։ Իոնները լուծույթում լիցք են տեղափոխում։ Էլեկտրոնները լուծույթով չեն անցնում մետաղյա լարի պես։","Այս տարրի լուծույթներում լիցքը հիմնականում ի՞նչն է տեղափոխում։",["Իոնները","Մետաղյա լարի պես ազատ էլեկտրոնները"],0],["anode-cathode","Անոդ և կաթոդ","Ո՞ր էլեկտրոդն է էլեկտրոն տալիս, իսկ որը՝ ընդունում։ Դիտենք ցինկի և պղնձի դերերը։","Գալվանական տարրի անոդում օքսիդացում է՝ Zn → Zn²⁺ + 2e⁻։ Կաթոդում վերականգնում է՝ Cu²⁺ + 2e⁻ → Cu։ Այստեղ անոդը բացասական է, կաթոդը՝ դրական։","Դանիելի տարրի ցինկի էլեկտրոդում ի՞նչ է կատարվում։",["Օքսիդացում","Պղնձի իոնների վերականգնում"],0],["charge-transport","Էլեկտրոնների և իոնների շարժումը","Արտաքին լարում ու աղային կամրջում նույն մասնիկնե՞րն են շարժվում։ Ստուգենք ճանապարհների դերերը։","Էլեկտրոններն արտաքին շղթայում անցնում են ցինկից դեպի պղինձ։ Պայմանական հոսանքը հակառակն է։ Կամրջի անիոնները գնում են անոդային, կատիոնները՝ կաթոդային լուծույթ։","Արտաքին շղթայում էլեկտրոններն ո՞ւր են ուղղվում։",["Ցինկից դեպի պղինձ","Պղնձից դեպի ցինկ"],0],["cell-assembly","Գալվանական տարրի վիրտուալ հավաքում","Այս անգամ դու ես հավաքում տարրը։ Միացրու ճիշտ էլեկտրոդները, էլեկտրոլիտները և երկու ճանապարհները։","Միայն այս աջակցվող Zn/Cu զույգի ստանդարտ մոդելն ենք չափում։ Մասերի բացակայության դեպքում կայուն ԷԼՇ չենք հորինում։","Հեռացված աղային կամրջով երկարատև կայուն հոսանք հնարավո՞ր է։",["Ո՛չ","Այո՛, արտաքին լարը միշտ բավարար է"],0]].map(([e,t,a,s,n,i,r])=>me(e,t,"cell","cell",{context:a,explanation:s,initial:e==="cell-assembly"?{zinc:!1,copper:!1,solution:!1,bridge:!1,wire:!1,meter:!0}:{},prediction:P("Արտաքին լարը միացնենք, բայց աղային կամուրջը հանենք։ Կայուն հոսանքը կշարունակվի՞։",["Ո՛չ","Այո՛"],0,"Ներքին իոնային կապը ևս անհրաժեշտ է։"),task:e==="cell-assembly"?"Բացիր տարրի մասերի ցանկը։ Ավելացրու երկու էլեկտրոդները, լուծույթները, կամուրջը և արտաքին լարը։ Գրանցիր աջակցվող ամբողջական տարրը։":"Մասերի ցանկում հերթով անջատիր էլեկտրոլիտները, կամուրջը և արտաքին լարը։ Վերականգնիր ամբողջական տարրը և գրանցիր չափումը։",variation:"Մնացած մասերը պահելով՝ փոխիր արտաքին բեռի դիմադրությունը։ Համեմատիր ԷԼՇ-ն ու հոսանքի ուժը։",observation:P(n,i,r,s),formula:"E° = 0.34 − (−0.76) = 1.10 Վ",assumptions:"298 Կ, Zn²⁺ և Cu²⁺ իոնների միավոր ակտիվություններ, համապատասխան սուլֆատային լուծույթներ և իներտ աղային կամուրջ։ Իդեալական աղբյուր՝ անտեսված ներքին դիմադրությամբ։ Սլաքները որակական ուղղություններ են, ոչ մասնիկների արագություն։ Այլ էլեկտրոդների զույգեր չենք հաշվարկում։",assessment:[P(n,i,r,s),re("Ստանդարտ պոտենցիալներն են +0.34 Վ և −0.76 Վ։ Տարրի ԷԼՇ-ն քանի՞ Վ է։",1.1,"Վ","Կաթոդի պոտենցիալից հանում ենք անոդինը՝ 0.34 − (−0.76)։"),ie([["Ցինկի անոդ","Օքսիդացում"],["Պղնձի կաթոդ","Վերականգնում"]],"Այս գալվանական տարրի անոդը էլեկտրոն է տալիս, կաթոդը՝ ընդունում։")]})),me("current","Էլեկտրական հոսանքի ուժ","current","quantities",{context:"Լարով անցնող լիցքի քանակը չափենք։ Նույն ժամանակում ավելի շատ լիցք անցնելը ի՞նչ է ասում հոսանքի ուժի մասին։",prediction:P("Նույն ժամանակում երկու անգամ ավելի շատ լիցք անցնելիս հոսանքի ուժն ինչպե՞ս է փոխվում։",["Կրկնապատկվում է","Կիսվում է"],0,"I = Δq/Δt։"),task:"Սկսիր փորձը և գրանցիր հոսանքի ուժը, ժամանակն ու անցած լիցքը։",variation:"Մեծացրու աղբյուրի լարումը՝ նույն դիմադրությամբ։ Համեմատիր նույն ժամանակի չափումները։",observation:P("Նույն ժամանակում ավելի մեծ I-ի դեպքում լիցքն ինչպե՞ս փոխվեց։",["Մեծացավ","Փոքրացավ"],0,"Δq = IΔt։"),explanation:"Հոսանքի ուժը ցույց է տալիս հաղորդչի լայնական հատույթով միավոր ժամանակում անցնող լիցքը։ Մեկ ամպերը մեկ կուլոն է մեկ վայրկյանում։",formula:"I = Δq / Δt · 1 Ա = 1 Կլ/վ",assumptions:"Հաստատուն DC հոսանք, իդեալական աղբյուր, օհմական բեռ։ Լիցքը կուտակվում է հաշվիչում, ոչ թե լարում։",assessment:[P("3 վ-ում անցել է 6 Կլ, իսկ 6 վ-ում՝ 6 Կլ։ Ո՞ր հոսանքն է մեծ։",["Առաջինը","Երկրորդը"],0,"Նույն լիցքն ավելի կարճ ժամանակում նշանակում է մեծ հոսանք։"),re("4 վ-ում անցել է 12 Կլ։ Հոսանքի ուժը քանի՞ Ա է։",3,"Ա","12 / 4 = 3։"),ie([["Ամպեր","Հոսանքի ուժ"],["Կուլոն","Լիցք"]],"Լիցքը և դրա անցնելու արագությունը տարբեր մեծություններ են։")]}),me("voltage","Էլեկտրական լարում","electricity","quantities",{context:"Երկու աղբյուր կարող են նույն լիցքին տարբեր չափով էներգիա փոխանցել։ Եկ կապենք լարումն ու էներգիան։",prediction:P("Նույն լիցքին ավելի մեծ էներգիա փոխանցող աղբյուրի լարումն ինչպիսի՞ն է։",["Ավելի մեծ","Ավելի փոքր"],0,"U = A/q։"),task:"Պահիր դիմադրությունը նույնը, լարումը փոխիր 3 Վ-ից 6 Վ և գրանցիր հոսանքի ուժը։",variation:"Լարումը պահիր նույնը և փոխիր միայն դիմադրությունը։ Աղբյուրի լարումն ու հոսանքի ուժը տարբեր մեծություններ են։",observation:P("Դիմադրությունը փոխելիս իդեալական աղբյուրի ընտրված լարումը փոխվե՞ց։",["Ո՛չ","Այո՛, միշտ"],0,"Այս աղբյուրը պահում է ընտրված պոտենցիալների տարբերությունը։"),explanation:"Լարումը երկու կետերի պոտենցիալների տարբերությունն է։ Այն կապում է փոխանցված էներգիան լիցքի հետ։ Վոլտը ջոուլ է՝ բաժանած կուլոնի։",formula:"U = A / q · 1 Վ = 1 Ջ/Կլ",assumptions:"Իդեալական հաստատուն լարման աղբյուր և օհմական բեռ։ Ներքին դիմադրությունն ու ջերմաստիճանի փոփոխությունն անտեսված են։",assessment:[P("Լարումն ու հոսանքի ուժը նույն մեծությո՞ւնն են։",["Ո՛չ","Այո՛"],0,"Լարումը էներգիա/լիցք է, հոսանքի ուժը՝ լիցք/ժամանակ։"),re("2 Կլ լիցքին փոխանցվել է 12 Ջ։ Լարումը քանի՞ Վ է։",6,"Վ","U = 12 / 2։"),ie([["Վոլտ","Լարում"],["Ամպեր","Հոսանքի ուժ"]],"Չափման միավորները տարբեր են։")]}),me("resistance","Դիմադրություն","electricity","quantities",{context:"Նույն մարտկոցով տարբեր բեռեր տարբեր հոսանք են անցկացնում։ Ի՞նչ կապ ունի դիմադրությունը։",prediction:P("Նույն լարման դեպքում դիմադրությունը կրկնապատկելիս I-ն ի՞նչ կանի։",["Կկիսվի","Կկրկնապատկվի"],0,"I = U/R։"),task:"Ընտրիր 6 Վ և 10 Օմ։ Գրանցիր հոսանքի ուժը։",variation:"Պահիր 6 Վ-ը և դիմադրությունը մեծացրու մինչև 20 Օմ։ Համեմատիր չափումները։",observation:P("Մեծ R-ի դեպքում I-ն ինչպե՞ս փոխվեց։",["Փոքրացավ","Մեծացավ"],0,"Նույն լարումն ավելի մեծ դիմադրությամբ փոքր հոսանք է տալիս։"),explanation:"Օհմական բեռի դիմադրությունը կապում է դրա լարումն ու հոսանքի ուժը։ Օհմը վոլտ է՝ բաժանած ամպերի։",formula:"R = U / I · 1 Օմ = 1 Վ/Ա",assumptions:"Օհմական դիմադրիչ՝ հաստատուն ջերմաստիճանով։ Իրական շիկացման լամպի դիմադրությունը կարող է փոխվել տաքանալիս։",assessment:[P("Նույն R-ի դեպքում U-ն մեծացնելիս I-ն ինչպե՞ս է փոխվում։",["Մեծանում է","Միշտ մնում է նույնը"],0,"I-ն համեմատական է U-ին։"),re("12 Վ-ի դեպքում հոսանքի ուժը 2 Ա է։ R-ը քանի՞ Օմ է։",6,"Օմ","R = 12 / 2։"),ie([["R-ը մեծացնել, U-ն նույնը","I-ն փոքրանում է"],["U-ն մեծացնել, R-ը նույնը","I-ն մեծանում է"]],"Պահիր մեկ պայմանը նույնը։")]}),...[["ammeter","Ամպերաչափ","Հոսանքը չափելու համար սարքը պետք է նույն ճանապարհի մե՞ջ տեղադրել, թե՞ բեռի կողքին։"],["voltmeter","Վոլտաչափ","Երկու կետերի պոտենցիալների տարբերությունը չափելու համար ընտրենք ճիշտ երկու ելքերը։"],["meters","Չափիր և բացատրի՛ր","Պատրա՞ստ ես երկու սարքը տեղադրել ու չափումներով ստուգել Օհմի օրենքը։"]].map(([e,t,a])=>me(e,t,"meters","quantities",{context:a,initial:{ammeter:"missing",voltmeter:"missing"},prediction:P("Հոսանքի ուժը ճիշտ չափելու համար ամպերաչափը ո՞նց միացնենք։",["Հաջորդաբար","Աղբյուրին զուգահեռ"],0,"Այն պետք է լինի չափվող ճյուղի ճանապարհի մեջ։"),task:"Տեսարանի «Ա» և «Վ» տեղերը սեղմելով կամ ընտրացանկերով տեղադրիր սարքերը։ Ամպերաչափը՝ հաջորդաբար, վոլտաչափը՝ բեռին զուգահեռ։",variation:"Ճիշտ միացումներով մեծացրու դիմադրությունը՝ լարումը նույնը պահելով։ Գրանցիր նոր I-ն ու U-ն։",observation:P("Իդեալական վոլտաչափը հաջորդաբար տեղադրելիս ի՞նչ է կատարվում։",["Շղթան բացվում է, I = 0","Միշտ հոսանքը մեծանում է"],0,"Իդեալական վոլտաչափի դիմադրությունը անվերջ է։"),explanation:"Իդեալական ամպերաչափը զրոյական դիմադրությամբ է և չափում է իր ճյուղի հոսանքը։ Վոլտաչափը անվերջ դիմադրությամբ է և չափում է երկու հանգույցների պոտենցիալների տարբերությունը։ Շղթայի հավաքիչում կարող ես փոխել նաև ելքերի բևեռականությունն ու սարքի սահմանը։",formula:"Ամպերաչափ՝ հաջորդաբար · վոլտաչափ՝ զուգահեռ",assumptions:"Իդեալական սարքեր, մեկ DC աղբյուր և օհմական բեռ։ Ցուցմունքները հաշվվում են հանգուցային հավասարումներով։ Սարքը աղբյուրին սխալ միացնելիս հոսանք չենք հորինում։",assessment:[P("Վոլտաչափը ո՞ր երկու կետին միացնել՝ բեռի լարումը չափելու համար։",["Բեռի երկու ելքերին","Միայն մեկ ելքին"],0,"Լարումը միշտ երկու կետերի տարբերություն է։"),re("12 Վ և 6 Օմ ճիշտ շղթայում ամպերաչափը քանի՞ Ա ցույց կտա։",2,"Ա","Հանգույցների լուծումը տալիս է I = 12/6 = 2 Ա։"),ie([["Ամպերաչափ","Հաջորդական միացում"],["Վոլտաչափ","Զուգահեռ միացում"]],"Բևեռականությունը հակադարձելիս ցուցմունքի նշանը կարող է փոխվել։")]})),me("parallel","Զուգահեռ միացում","parallel","connections",{context:"Երկու առանձին ճյուղ միացնենք նույն աղբյուրին։ Մի ճյուղի փոփոխությունն ինչպե՞ս է ազդում աղբյուրի հոսանքի վրա։",prediction:P("Զուգահեռ ճյուղերում ո՞ր մեծությունն է նույնը։",["Լարումը","Հոսանքը՝ ցանկացած դիմադրությունների դեպքում"],0,"Ճյուղերը միացված են նույն երկու հանգույցներին։"),task:"Ընտրիր 6 Վ, R₁ = 6 Օմ և R₂ = 3 Օմ։ Գրանցիր երկու ճյուղերի ու աղբյուրի հոսանքները։",variation:"Փոխիր միայն R₂-ը։ Համեմատիր I₁-ը, I₂-ը և դրանց գումարը։",observation:P("Աղբյուրի հոսանքը ինչպե՞ս է կապված ճյուղերի հոսանքների հետ։",["Դրանց գումարն է","Միշտ դրանց տարբերությունն է"],0,"Հանգույցում լիցք չի կուտակվում։"),explanation:"Զուգահեռ դիմադրիչների վրա լարումը նույնն է։ Աղբյուրի հոսանքը բաժանվում է ճյուղերի միջև, իսկ ընդհանուր դիմադրությունը փոքր է ամենափոքր ճյուղի դիմադրությունից։",formula:"1/R = 1/R₁ + 1/R₂ · I = I₁ + I₂",assumptions:"Իդեալական աղբյուր, լարերի զրոյական դիմադրություն, երկու օհմական բեռ։",assessment:[P("6 Օմ և 3 Օմ ճյուղերից ո՞րով է ավելի մեծ հոսանք անցնում նույն լարմամբ։",["3 Օմ ճյուղով","6 Օմ ճյուղով"],0,"Փոքր R-ը նույն U-ի դեպքում մեծ I է տալիս։"),re("6 Օմ և 3 Օմ զուգահեռ միացման R-ը քանի՞ Օմ է։",2,"Օմ","1/R = 1/6 + 1/3 = 1/2։"),ie([["Զուգահեռ ճյուղեր","Նույն լարումը"],["Աղբյուրի հոսանք","Ճյուղերի հոսանքների գումարը"]],"Սա բխում է նույն հանգույցներից և լիցքի պահպանումից։")]})];ze.push(me("symbols","Էլեկտրական շղթայի պայմանական նշանները","symbols","circuit",{context:"Իրական լամպի նկարը և շղթայի պայմանական նշանը տարբեր տեսք ունեն։ Եկ սովորենք պարզ սխեման կարդալ։",prediction:P("Պայմանական նշանը պարտադի՞ր է նման լինի սարքի իրական նկարին։",["Ո՛չ, այն համաձայնեցված նշան է","Այո՛, պետք է լուսանկար լինի"],0,"Սխեման փոխանցում է մասերի դերն ու կապերը։"),task:"Ընտրիր մարտկոցը, լամպը, անջատիչն ու դիմադրիչը։ Յուրաքանչյուրի դեպքում համեմատիր պատկերը և սխեմայի նշանը։",variation:"Ընտրիր մեկ այլ տարր և գրանցիր նրա նշանը։ Բաց անջատիչի գծիկն ու բացը տարբերիր փակ կապից։",observation:P("Լամպի տարածված պայմանական նշանն ո՞րն է։",["Շրջան՝ ներսում խաչով","Երկու անհավասար զուգահեռ գծեր"],0,"Շրջանով խաչը նշում է լամպը, անհավասար գծերը՝ տարրը կամ մարտկոցի հատվածը։"),explanation:"Սխեման սարքերի լուսանկարը չէ։ Նշանները կարճ ձևով ցույց են տալիս տարրի տեսակը, իսկ միացնող գծերը՝ կապերը։ Այստեղ դիմադրիչի համար օգտագործում ենք IEC ուղղանկյուն նշանը։",formula:"Պատկեր → պայմանական նշան → կապերի սխեմա",assumptions:"Օգտագործվում են դասական պարզ DC նշանների տարածված տարբերակները։ Նշանների գծապատկերը չի ենթադրում սարքի ֆիզիկական չափը։",assessment:[P("Բաց անջատիչի նշանի բացն ի՞նչ է նշանակում։",["Կոնտակտների ընդհատում","Աղբյուրի ավելի մեծ լարում"],0,"Բացը ցույց է տալիս հաղորդող ճանապարհի բաց լինելը։"),re("Մարտկոցը, անջատիչն ու լամպը քանի՞ տարբեր դեր ներկայացնող տարր են այս պարզ շղթայում։",3,"տարր","Աղբյուր, կառավարում և բեռ։"),ie([["Շրջան՝ ներսում խաչով","Լամպ"],["Երկու անհավասար զուգահեռ գծեր","Հոսանքի քիմիական տարր"]],"Դիմադրիչը մեր սխեմայում ուղղանկյուն է։")]}),me("acceleration","Արագացում","acceleration","motion",{context:"Ռոբոտը սկսում է դանդաղ, հետո ամեն վայրկյան ավելի արագ է գնում։ Ինչպե՞ս նկարագրենք արագության փոփոխությունը։",prediction:P("Հաստատուն դրական արագացմամբ արագության գրաֆիկը ինչպիսի՞ն կլինի։",["Աճող ուղիղ գիծ","Հորիզոնական գիծ"],0,"Արագությունը հավասար ժամանակներում աճում է նույն չափով։"),task:"Սկսիր 1 մ/վ-ից և ընտրիր 1 մ/վ² արագացում։ Դիտիր արագության գրաֆիկը և գրանցիր չափումը։",variation:"Նույն սկզբնական արագությամբ կրկնապատկիր արագացումը և համեմատիր նույն ժամանակի արդյունքները։",observation:P("Նույն ժամանակում մեծ արագացմամբ վերջնական արագությունն ինչպիսի՞ն է։",["Ավելի մեծ","Նույնը"],0,"v = v₀ + at։"),explanation:"Արագացումը արագության փոփոխությունն է միավոր ժամանակում։ Այս փորձը մի ուղղությամբ հաստատուն արագացմամբ է։ Տեղափոխության ու ժամանակի կապը քառակուսային է։",formula:"v = v₀ + at · x = v₀t + at²/2",assumptions:"Ուղղագիծ շարժում, հաստատուն ոչ բացասական արագացում, դիմադրության բացակայություն։",assessment:[P("v–t գրաֆիկի մեծ թեքությունն ի՞նչ է նշանակում։",["Ավելի մեծ արագացում","Պարտադիր ավելի մեծ զանգված"],0,"Թեքությունը Δv/Δt-ն է։"),re("Սկզբնական արագությունը 1 մ/վ է, a = 2 մ/վ²։ 3 վ-ից արագությունը քանի՞ մ/վ է։",7,"մ/վ","v = 1 + 2 × 3։"),ie([["Հորիզոնական v–t գիծ","Զրոյական արագացում"],["Աճող ուղիղ v–t գիծ","Հաստատուն դրական արագացում"]],"Գրաֆիկի թեքությունը արագացումն է։")]}),me("forces-intro","Ուժ և Նյուտոնի երկրորդ օրենքը","force","force",{context:"Նույն հրումը թեթև և ծանր սայլակների վրա նույն արդյունքը կտա՞։ Փորձով կապենք ուժը, զանգվածն ու արագացումը։",prediction:P("Նույն համազոր ուժով մեծ զանգվածի արագացումն ինչպիսի՞ն է։",["Ավելի փոքր","Ավելի մեծ"],0,"a = Fհամ/m։"),task:"Ընտրիր 10 Ն ուժ և 2 կգ զանգված։ Սկսիր փորձը և գրանցիր արագացումը։",variation:"Ուժը պահիր նույնը, բայց կրկնապատկիր զանգվածը։ Համեմատիր արագացումները։",observation:P("Այս առանց շփման փորձի մեջ զրոյական ուժով արագացումն ինչքա՞ն է։",["Զրո","Միշտ 5 մ/վ²"],0,"Արագացումը համեմատական է համազոր ուժին։"),explanation:"Նյուտոնի երկրորդ օրենքում օգտագործում ենք բոլոր ուժերի համազորը։ Մեծ զանգվածը նույն ուժի դեպքում ավելի փոքր արագացում ունի։ Ուժի նշանը սահմանում է ընտրված առանցքի ուղղությունը։",formula:"Fհամ = ma",assumptions:"Հորիզոնական շարժում՝ առանց շփման։ Բեռը սկզբում հանգստանում է։ Պատկերի մասշտաբը հարմարեցվում է փորձի առավելագույն տեղափոխությանը։",assessment:[P("Մեծ ուժը միշտ մեծ արագությո՞ւն է նշանակում հենց սկզբից։",["Ո՛չ, այն մեծ արագացում է առաջացնում","Այո՛, ժամանակը նշանակություն չունի"],0,"Արագությունը կախված է նաև սկզբնական վիճակից ու ժամանակից։"),re("Համազոր ուժը 10 Ն է, զանգվածը՝ 2 կգ։ Արագացումը քանի՞ մ/վ² է։",5,"մ/վ²","a = 10 / 2։"),ie([["Նույն m, մեծ Fհամ","Մեծ a"],["Նույն Fհամ, մեծ m","Փոքր a"]],"Ուժն ու զանգվածը տարբեր կերպ են ազդում արագացման վրա։")]}),me("incline","Թեք հարթություն և շփում","incline","force",{context:"Տուփը քիչ թեքված հարթության վրա չի սահում, բայց ավելի մեծ թեքության դեպքում սկսում է շարժվել։ Ինչո՞ւ։",prediction:P("Թեքությունը փոքր լինելու դեպքում շփումը կարո՞ղ է պահել մարմինը տեղում։",["Այո՛","Ո՛չ"],0,"Ստատիկ շփումը կարող է հավասարակշռել ներքև ուղղված բաղադրիչը։"),task:"Ընտրիր փոքր թեքություն ու ոչ զրոյական շփում։ Սկսիր փորձը և գրանցիր արագացումը։",variation:"Մեծացրու միայն թեքությունը, մինչև մարմինը սահի։ Համեմատիր արագացումն ու հակազդեցության ուժը։",observation:P("Թեքությունը մեծացնելիս ծանրության ներքև ուղղված բաղադրիչն ինչպե՞ս է փոխվում։",["Մեծանում է","Փոքրանում է"],0,"Այն mg sin θ է։"),explanation:"Ծանրության մի բաղադրիչը ձգտում է շարժել մարմինը հարթությամբ ներքև։ Հակազդեցության ուժը mg cos θ է։ Ստատիկ շփումը պահում է մարմինը մինչև իր սահմանը, իսկ սահելիս գործում է կինետիկ շփումը։",formula:"N = mg cos θ · a = g(sin θ − μկ cos θ)",assumptions:"Մարմինը բաց ենք թողնում հանգստից։ μստ = 1.25μկ։ Քանի դեռ mg sin θ ≤ μստ N, շարժումը չի սկսվում։ Բանաձևի a-ն կիրառվում է սահելու դեպքում։",assessment:[P("Հանգստացող մարմինը միշտ պե՞տք է սահի ոչ զրոյական թեքությամբ։",["Ո՛չ, ստատիկ շփումը կարող է պահել","Այո՛"],0,"Սահելը սկսվում է ստատիկ շփման սահմանից հետո։"),re("Առանց շփման 30° հարթության վրա g = 9.81 մ/վ²։ a-ն քանի՞ մ/վ² է։",4.905,"մ/վ²","a = g sin 30° = 9.81 × 0.5։"),ie([["Մինչև սահելու սկիզբը","Ստատիկ շփում"],["Սահելու ընթացքում","Կինետիկ շփում"]],"Շփման երկու ռեժիմները պետք է տարբերել։")]}));const vt=e=>ze.find(t=>t.id===e);Object.assign(vt("sources"),{prediction:P("Գալվանական աղբյուրը արտաքին շղթային էներգիա է տալիս ինչի՞ հաշվին։",["Քիմիական փոխակերպման","Նոր լիցք ստեղծելու"],0,"Աղբյուրը էներգիա է փոխակերպում, ոչ լիցք ստեղծում։"),task:"Անջատիր արտաքին բեռի լարը։ Տես՝ ինչու ԷԼՇ-ն կարող է լինել, իսկ բեռի հոսանքը՝ զրո։ Գրանցիր չափումը։",variation:"Միացրու արտաքին բեռի լարը՝ մնացած մասերը նույնը պահելով։ Համեմատիր հոսանքը։",assessment:[P("Մարտկոցի աշխատանքում ո՞րն է ճիշտ։",["Քիմիական էներգիան փոխակերպվում է էլեկտրականի","Մարտկոցը լիցք է ստեղծում ոչնչից"],0,"Մեկուսացված համակարգի ընդհանուր լիցքը պահպանվում է։"),re("Աղբյուրը 1.1 Վ լարմամբ տեղափոխում է 2 Կլ լիցք։ Աշխատանքը քանի՞ Ջ է։",2.2,"Ջ","A = Uq = 1.1 × 2։"),ie([["Գալվանական տարր","Քիմիական աղբյուր"],["Արեգակնային տարր","Լուսային էներգիայի փոխակերպիչ"]],"Աղբյուրները կարող են տարբեր տեսակի էներգիա փոխակերպել։")]});vt("galvanic").assessment[2]=ie([["Ցինկի կիսատարր","ZnSO₄ լուծույթ"],["Պղնձի կիսատարր","CuSO₄ լուծույթ"]],"Աջակցվում է հենց այս երկու էլեկտրոդների ու լուծույթների զույգը։");Object.assign(vt("electrolytes"),{prediction:P("Աղային կամրջով էլեկտրոննե՞րն են անցնում մետաղյա լարի պես։",["Ո՛չ, լիցքը տեղափոխում են իոնները","Այո՛"],0,"Լուծույթում հաղորդականությունը իոնային է։"),task:"Հեռացրու էլեկտրոլիտները և հետևիր՝ ինչու չափում չկա։ Վերադարձիր ճիշտ լուծույթներին և գրանցիր չափումը։",variation:"Առանց էլեկտրոլիտները փոխելու՝ բացիր արտաքին բեռի լարը։ Գրանցիր ԷԼՇ-ն ու զրոյական հոսանքը։",assessment:[P("Ինչո՞ւ է պետք իոնային ճանապարհը։",["Լուծույթների լիցքային հավասարակշռությունը պահելու համար","Որպեսզի էլեկտրոնները կամրջով վազեն"],0,"Աղային կամուրջը կապում է երկու լուծույթների իոնային ճանապարհները։"),re("1.1 Վ իդեալական աղբյուրին միացված է 100 Օմ բեռ։ Հոսանքի ուժը քանի՞ Ա է։",.011,"Ա","I = 1.1 / 100։"),ie([["Կամրջի անիոններ","Դեպի անոդային լուծույթ"],["Կամրջի կատիոններ","Դեպի կաթոդային լուծույթ"]],"Իոնների ուղղությունները պահում են լուծույթների լիցքային հավասարակշռությունը։")]});Object.assign(vt("anode-cathode"),{prediction:P("Ցինկի ատոմը Zn²⁺ դառնալիս քանի՞ էլեկտրոն է տալիս։",["Երկու","Մեկ"],0,"Zn → Zn²⁺ + 2e⁻։"),task:"Բացիր կիսառեակցիաները։ Հեռացրու, հետո վերադարձրու ցինկի էլեկտրոդը և գրանցիր ամբողջական տարրի չափումը։",variation:"Բացիր միայն արտաքին շղթան։ Համեմատիր արտաքին հոսանքը և պարզաբանիր՝ որ ճանապարհն ընդհատվեց։",assessment:[P("Գալվանական տարրի անոդում ի՞նչ գործընթաց է կատարվում։",["Օքսիդացում","Վերականգնում"],0,"Անոդը սահմանվում է օքսիդացման գործընթացով։"),re("Մոդելի հինգ Zn ատոմը Zn²⁺ դառնալիս քանի՞ էլեկտրոն կտա։",10,"էլեկտրոն","Յուրաքանչյուր ատոմից՝ 2, ընդհանուր՝ 5 × 2։"),ie([["Zn → Zn²⁺ + 2e⁻","Օքսիդացում"],["Cu²⁺ + 2e⁻ → Cu","Վերականգնում"]],"Կիսառեակցիաներում էլեկտրոնների տեղը ցույց է տալիս դրանց դերը։")]});Object.assign(vt("charge-transport"),{prediction:P("Էլեկտրոնների ու պայմանական հոսանքի ուղղությունները նույնն ե՞ն։",["Ո՛չ, հակառակ են","Այո՛"],0,"Պայմանական հոսանքն ընտրված է դրական լիցքի ուղղությամբ։"),task:"Ամբողջական տարրի դեպքում հետևիր արտաքին էլեկտրոնային և ներքին իոնային ճանապարհների նշումներին։ Գրանցիր չափումը։",variation:"Բացիր արտաքին լարը, հետո վերականգնիր այն։ Գրանցիր բաց արտաքին շղթայի վիճակը և համեմատիր կայուն հոսանքը։",assessment:[P("Լուծույթով ու լարով լիցքի տեղափոխությունը նույն մասնիկնե՞րով է։",["Ո՛չ","Այո՛, երկուսում էլ միայն էլեկտրոններ են"],0,"Մետաղյա լարում՝ էլեկտրոններ, էլեկտրոլիտում՝ իոններ։"),re("0.01 Ա հոսանքի դեպքում 5 վ-ում անցած լիցքը քանի՞ Կլ է։",.05,"Կլ","q = It = 0.01 × 5։"),ie([["Արտաքին մետաղյա շղթա","Էլեկտրոնների դրեյֆ"],["Էլեկտրոլիտ և կամուրջ","Իոնային տեղափոխություն"]],"Սրանք տարբեր ֆիզիկական ճանապարհներ են։")]});vt("sources").explanation+=" Արեգակնային տարրը լույսի էներգիան է փոխակերպում էլեկտրականի։";ze.push(...xi);const js=(e,t,a=[])=>{const s=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(n=>{s.setAttribute(n,String(t[n]))}),a.length&&a.forEach(n=>{const i=js(...n);s.appendChild(i)}),s};var Mi=([e,t,a])=>js(e,t,a);const Si=e=>Array.from(e.attributes).reduce((t,a)=>(t[a.name]=a.value,t),{}),Ci=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",Ai=e=>e.flatMap(Ci).map(a=>a.trim()).filter(Boolean).filter((a,s,n)=>n.indexOf(a)===s).join(" "),qi=e=>e.replace(/(\w)(\w*)(_|-|\s*)/g,(t,a,s)=>a.toUpperCase()+s.toLowerCase()),us=(e,{nameAttr:t,icons:a,attrs:s})=>{const n=e.getAttribute(t);if(n==null)return;const i=qi(n),r=a[i];if(!r)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const o=Si(e),[c,l,u]=r,p={...l,"data-lucide":n,...s,...o},y=Ai(["lucide",`lucide-${n}`,o,s]);y&&Object.assign(p,{class:y});const h=Mi([c,p,u]);return e.parentNode?.replaceChild(h,e)};const z={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};const Ii=["svg",z,[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]]];const Ei=["svg",z,[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]]];const Ri=["svg",z,[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]]];const Li=["svg",z,[["path",{d:"M12 16v5"}],["path",{d:"M16 14v7"}],["path",{d:"M20 10v11"}],["path",{d:"m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"}],["path",{d:"M4 18v3"}],["path",{d:"M8 14v7"}]]];const Ti=["svg",z,[["path",{d:"M20 6 9 17l-5-5"}]]];const Bi=["svg",z,[["path",{d:"m6 9 6 6 6-6"}]]];const Fi=["svg",z,[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m9 12 2 2 4-4"}]]];const Vi=["svg",z,[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7"}]]];const Ni=["svg",z,[["circle",{cx:"12",cy:"12",r:"10"}],["circle",{cx:"12",cy:"12",r:"1"}]]];const Pi=["svg",z,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16.5 12"}]]];const Gi=["svg",z,[["path",{d:"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"}],["path",{d:"M6.453 15h11.094"}],["path",{d:"M8.5 2h7"}]]];const Hi=["svg",z,[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}],["path",{d:"m15 9-3-3 3-3"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"M12 18H7a2 2 0 0 1-2-2V9"}],["path",{d:"m9 15 3 3-3 3"}]]];const Di=["svg",z,[["line",{x1:"22",x2:"2",y1:"12",y2:"12"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"}],["line",{x1:"6",x2:"6.01",y1:"16",y2:"16"}],["line",{x1:"10",x2:"10.01",y1:"16",y2:"16"}]]];const Ui=["svg",z,[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]]];const ji=["svg",z,[["circle",{cx:"12",cy:"16",r:"1"}],["rect",{x:"3",y:"10",width:"18",height:"12",rx:"2"}],["path",{d:"M7 10V7a5 5 0 0 1 10 0v3"}]]];const Zi=["svg",z,[["line",{x1:"4",x2:"20",y1:"12",y2:"12"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18"}]]];const zi=["svg",z,[["path",{d:"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"}],["path",{d:"M2 6h4"}],["path",{d:"M2 10h4"}],["path",{d:"M2 14h4"}],["path",{d:"M2 18h4"}],["path",{d:"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"}]]];const Wi=["svg",z,[["circle",{cx:"12",cy:"12",r:"3"}],["circle",{cx:"19",cy:"5",r:"2"}],["circle",{cx:"5",cy:"19",r:"2"}],["path",{d:"M10.4 21.9a10 10 0 0 0 9.941-15.416"}],["path",{d:"M13.5 2.1a10 10 0 0 0-9.841 15.416"}]]];const Ki=["svg",z,[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}]]];const Yi=["svg",z,[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]]];const Qi=["svg",z,[["path",{d:"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"}]]];const Xi=["svg",z,[["polygon",{points:"6 3 20 12 6 21 6 3"}]]];const _i=["svg",z,[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]]];const Oi=["svg",z,[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"}]]];const Ji=["svg",z,[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]]];const eo=["svg",z,[["circle",{cx:"6",cy:"19",r:"3"}],["path",{d:"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"}],["circle",{cx:"18",cy:"5",r:"3"}]]];const to=["svg",z,[["line",{x1:"21",x2:"14",y1:"4",y2:"4"}],["line",{x1:"10",x2:"3",y1:"4",y2:"4"}],["line",{x1:"21",x2:"12",y1:"12",y2:"12"}],["line",{x1:"8",x2:"3",y1:"12",y2:"12"}],["line",{x1:"21",x2:"16",y1:"20",y2:"20"}],["line",{x1:"12",x2:"3",y1:"20",y2:"20"}],["line",{x1:"14",x2:"14",y1:"2",y2:"6"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14"}],["line",{x1:"16",x2:"16",y1:"18",y2:"22"}]]];const ao=["svg",z,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]];const so=["svg",z,[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]]];const no=["svg",z,[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]]];const io=["svg",z,[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2"}]]];const oo=["svg",z,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];const La=({icons:e={},nameAttr:t="data-lucide",attrs:a={}}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const s=document.querySelectorAll(`[${t}]`);if(Array.from(s).forEach(n=>us(n,{nameAttr:t,icons:e,attrs:a})),t==="data-lucide"){const n=document.querySelectorAll("[icon-name]");n.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(n).forEach(i=>us(i,{nameAttr:"icon-name",icons:e,attrs:a})))}};function Ve(e,t){return e*t}function ro(e,t,a){return Math.min(a,Math.max(0,e+t))}function hs(e,t,a,s){return{x:52+t/a*400,y:170-Ve(e,t)/s*140}}function Zs(e){return e/.15*180/Math.PI}const lo=[["path","Թեմաներ","route"],["aerolab","Թռչող սարքեր","rocket"],["progress","Իմ առաջընթացը","chart-no-axes-combined"],["notebook","Հետազոտողի տետր","notebook-pen"]],co=["Իրավիճակ","Կանխատեսում","Փորձ","Դիտարկում","Բացատրություն","Կիրառում"],Jt=["Կանցնի նույն ճանապարհը","Կանցնի երկու անգամ ավելի մեծ ճանապարհ","Կանցնի երկու անգամ ավելի փոքր ճանապարհ"],ht=[{q:"Նույն ժամանակում արագությունը կրկնապատկելիս ի՞նչ է փոխվում։",options:["Ճանապարհը կրկնապատկվում է","Ժամանակը կրկնապատկվում է","Ճանապարհը չի փոխվում"],correct:0,hints:["Համեմատիր երկու փորձերի ավարտի դիրքերը։","Երկու փորձերում ժամանակը նույնն է։","Ամեն վայրկյան ռոբոտն անցնում է երկու անգամ ավելի մեծ ճանապարհ։"],why:"Նույն ժամանակում ավելի մեծ արագությունը նշանակում է ավելի մեծ ճանապարհ։ Ժամանակը դու չես փոխել։"},{q:"Իսկ նույն արագությամբ երկու անգամ երկար շարժվելիս ի՞նչ կլինի։",options:["Արագությունը կաճի","Ճանապարհը կրկնապատկվի","Ճանապարհը չի փոխվի"],correct:1,hints:["Փորձիր 2 մ/վ արագությամբ՝ 5 և 10 վայրկյան։","Ամեն վայրկյան անցնում է նույն ճանապարհը։","Երկու անգամ ավելի շատ վայրկյան՝ երկու անգամ ավելի մեծ ճանապարհ։"],why:"Արագությունը հաստատուն է։ Ավելի երկար շարժվելիս անցած ճանապարհն է աճում։"},{q:"Այս փորձի ընթացքում ո՞ր մեծությունն է մնում հաստատուն։",options:["Անցած ճանապարհը","Անցած ժամանակը","Արագությունը"],correct:2,hints:["Դիտիր ցուցումները շարժման ընթացքում։","Ժամանակն ու ճանապարհն աճում են։","Սահիչով ընտրված արագությունը չի փոխվում։"],why:"Սա հավասարաչափ շարժում է. հավասար ժամանակահատվածներում անցնում է հավասար ճանապարհներ։"}],po=[{q:"Հեծանվորդը 4 մ/վ արագությամբ շարժվում է 5 վ։ Որքա՞ն ճանապարհ է անցնում։",options:["9 մ","20 մ","1.25 մ"],correct:1},{q:"Դու 2 մ/վ արագությամբ քայլում ես 10 վ։ Ընկերդ նույն արագությամբ՝ 5 վ։ Ո՞վ է ավելի մեծ ճանապարհ անցնում։",options:["Դու՝ երկու անգամ ավելի մեծ","Ընկերդ՝ երկու անգամ ավելի մեծ","Երկուսդ էլ նույնը"],correct:0},{q:"Ռոբոտը 10 մ անցնում է 5 վ-ում, հետո կանգնում է 5 վ։ Ամբողջ 10 վ-ի միջին արագությունը որքա՞ն է։",options:["2 մ/վ","0 մ/վ","1 մ/վ"],correct:2}],zs="physics-journal-v1";function uo(){try{return{runs:[],notes:[],stage:0,prediction:null,answers:{},assessment:null,...JSON.parse(localStorage.getItem(zs)||"{}")}}catch{return{runs:[],notes:[],stage:0,prediction:null,answers:{},assessment:null}}}function Ws(e){try{return localStorage.setItem(zs,JSON.stringify(e)),!0}catch{return!1}}function Ks(e="scene",t=0){const a=s=>`${s}-${e}`;return`<svg class="corridor" viewBox="0 0 900 390" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Առաքման ռոբոտը միջանցքում։ Հատակին 0-ից 60 մետր սանդղակ է։"><defs>
  <linearGradient id="${a("wall")}" x2="0" y2="1"><stop stop-color="#f3f0e5"/><stop offset="1" stop-color="#e4e4d5"/></linearGradient>
  <linearGradient id="${a("floor")}" x1="0" y1="0" x2=".3" y2="1"><stop stop-color="#d2d4c3"/><stop offset=".4" stop-color="#e2dfcd"/><stop offset="1" stop-color="#e6e2d1"/></linearGradient>
  <linearGradient id="${a("glass")}" x2=".5" y2="1"><stop stop-color="#e9edde"/><stop offset="1" stop-color="#cbd7be"/></linearGradient>
  <linearGradient id="${a("body")}" x1="0" x2=".8" y2="1"><stop stop-color="#fffdf2"/><stop offset=".45" stop-color="#efeddf"/><stop offset="1" stop-color="#c0c5af"/></linearGradient>
  <linearGradient id="${a("side")}" x2="1" y2=".3"><stop stop-color="#cbd0bd"/><stop offset="1" stop-color="#8c997b"/></linearGradient>
  <linearGradient id="${a("face")}" x2=".7" y2="1"><stop stop-color="#51574a"/><stop offset="1" stop-color="#272d25"/></linearGradient>
  <linearGradient id="${a("box")}" x2="1" y2="1"><stop stop-color="#d7b388"/><stop offset="1" stop-color="#b48b62"/></linearGradient>
  <radialGradient id="${a("shadow")}"><stop stop-color="#646d50" stop-opacity=".3"/><stop offset="1" stop-color="#646d50" stop-opacity="0"/></radialGradient>
  <linearGradient id="${a("sun")}" x2=".6" y2="1"><stop stop-color="#fffde9" stop-opacity=".65"/><stop offset="1" stop-color="#fffde9" stop-opacity="0"/></linearGradient>
  </defs><path fill="url(#${a("wall")})" d="M0 0h900v237H0z"/><path fill="url(#${a("floor")})" d="M0 237h900v153H0z"/>
  <path d="M0 239h900" stroke="#bcc4ac" stroke-width="4"/><path d="M0 244h900" stroke="#f1f0e2" stroke-width="2"/>
  <path d="M30 390 195 241m180 149 20-149m210 149-124-149m390 149L702 241M0 322h900" fill="none" stroke="#c6cbb8" stroke-width="1"/>
  <path d="m205 230 230-4 170 164H273Z" fill="url(#${a("sun")})"/>
  <rect x="209" y="64" width="229" height="133" rx="3" fill="#b9c3a9"/><rect x="215" y="70" width="217" height="121" fill="url(#${a("glass")})"/>
  <path d="m217 137 38-38 43 22 51-32 82 44v56H217Z" fill="#b9c9ad" opacity=".52"/><path d="m217 166 64-33 47 19 49-25 54 38v24H217Z" fill="#9daf92" opacity=".22"/>
  <path d="M324 70v120M215 131h217" stroke="#f5f3e7" stroke-width="6"/><path d="M215 191h217" stroke="#9ead8e" stroke-width="4"/><path d="M199 198h250v8H199Z" fill="#e9e8da"/><path d="M199 206h250" stroke="#c1c9b2" stroke-width="2"/>
  <rect x="665" y="51" width="125" height="190" rx="3" fill="#bdc5b0"/><rect x="673" y="59" width="110" height="179" rx="2" fill="#d1d7c1"/><path d="M681 68h94v163h-94z" stroke="#c2ccb1" fill="none"/><path d="M763 143h10" stroke="#66765b" stroke-width="4" stroke-linecap="round"/><rect x="707" y="74" width="42" height="11" rx="2" fill="#e4e7d7"/>
  <g opacity=".85"><rect x="78" y="92" width="74" height="79" rx="2" fill="#ececde" stroke="#bac4a7"/><path d="M95 114h40m-40 13h32m-32 14h37" stroke="#a6b393" stroke-width="3"/><circle cx="98" cy="155" r="3" fill="#c49671"/></g>
  <ellipse cx="836" cy="247" rx="27" ry="8" fill="url(#${a("shadow")})"/><path d="m815 213 6 30q16 8 31 0l6-30" fill="#be9b7b"/><ellipse cx="836" cy="213" rx="21" ry="5" fill="#9e8066"/>
  <path d="M836 214v-55" fill="none" stroke="#788766" stroke-width="3"/><path d="M836 188c-33-1-28-29-28-29 27 1 31 20 28 29m0-15c29-1 28-32 28-32-23 1-31 16-28 32m0 34c-27-1-25-23-25-23 20-2 28 14 25 23" fill="#81916f"/><path d="M836 176c-15-7-16-31-16-31 20 3 22 21 16 31" fill="#97a782"/>
  <path d="M90 295h720" stroke="#f7f3df" stroke-width="3" stroke-dasharray="9 8"/>
  ${Array.from({length:7},(s,n)=>`<path d="M${110+n*680/6} 308v15" stroke="#8c977a" stroke-width="1.5"/><text x="${110+n*680/6}" y="349" font-size="16" fill="#657654" text-anchor="middle">${n*10} մ</text>`).join("")}
  <g id="robot-${e}" transform="translate(${110+t*680} 270)">
    <ellipse cy="18" rx="60" ry="16" fill="url(#${a("shadow")})"/>
    <g><ellipse cx="-31" cy="5" rx="13" ry="17" fill="#353c2e"/><ellipse cx="30" cy="5" rx="13" ry="17" fill="#353c2e"/><ellipse cx="-31" cy="5" rx="8" ry="11" fill="#879576"/><ellipse cx="30" cy="5" rx="8" ry="11" fill="#879576"/><ellipse cx="-31" cy="5" rx="4" ry="6" fill="#bac5a8"/><ellipse cx="30" cy="5" rx="4" ry="6" fill="#bac5a8"/></g>
    ${[-31,30].map(s=>`<g transform="translate(${s} 5) scale(.7 1)"><g data-wheel-rotor transform="rotate(${typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches?0:Zs(t*60)})"><path d="M-10 0h20M0-10v20" stroke="#c6cebb" stroke-width="1.8"/><circle r="3" fill="#6a7b59"/></g></g>`).join("")}
    <path d="M-40-56q0-18 18-20h47q20 2 21 22l-3 47q-2 13-15 13h-55q-16-1-17-15Z" fill="url(#${a("side")})"/>
    <path d="M-44-52q0-21 20-22h39q21 0 23 22l-2 44q-1 12-15 14h-47q-15-2-16-16Z" fill="url(#${a("body")})" stroke="#afbba0" stroke-width=".8"/>
    <path d="M-40-25q37 8 75 0" stroke="#cbd2bd" fill="none"/>
    <rect x="-32" y="-61" width="56" height="29" rx="13" fill="url(#${a("face")})"/>
    <ellipse cx="-15" cy="-46" rx="5" ry="6" fill="#d8bb74"/><ellipse cx="8" cy="-46" rx="5" ry="6" fill="#d8bb74"/><ellipse cx="-15" cy="-47" rx="2.5" ry="3" fill="#34392f"/><ellipse cx="8" cy="-47" rx="2.5" ry="3" fill="#34392f"/>
    <path d="M-9-38q5 4 10 0" fill="none" stroke="#d5d8c9" stroke-width="1.4" stroke-linecap="round"/><path d="M-22-56q5-3 10-1m13 0q5-2 10 1" fill="none" stroke="#e5e4d6" stroke-width="1.3" stroke-linecap="round"/>
    <rect x="-17" y="-19" width="30" height="14" rx="6" fill="#879576"/><path d="m-5-16 3 5 3-5" fill="#c88f62"/>
    <path d="M-25-74v-27l39-1 10 5v24" fill="url(#${a("box")})" stroke="#b2936a" stroke-width=".8"/><path d="M-25-101 14-102 24-97-15-96Z" fill="#e0c199"/><path d="M-15-96v23M-5-100 4-99" stroke="#ead0a6" stroke-width="6"/><path d="M32-66v-27" stroke="#6d7c5d" stroke-width="3"/><circle cx="32" cy="-95" r="4" fill="#c88a61"/>
    <path d="M-37-51q0-16 17-18" stroke="#fffef7" stroke-width="3" fill="none" opacity=".7"/>
  </g></svg>`}const Lt={question:300,feedback:380,achievement:480,stagger:45},Tt={standard:"cubic-bezier(.2,0,0,1)",arrive:"cubic-bezier(.05,.7,.1,1)"};function Ta(e=.75){return Array.from({length:19},(t,a)=>{const s=a/18,n=a===18?1:1-Math.exp(-7*s)*Math.cos(8*s);return{transform:`scale(${e+(1-e)*n})`,opacity:Math.min(1,.45+n*.55),offset:s}})}let ce;const He=matchMedia("(prefers-reduced-motion: reduce)"),ea=new Set;function ee(e,t,a={}){if(!e||He.matches||typeof e.animate!="function")return;const s=e.animate(t,{duration:240,easing:Tt.standard,...a});return ea.add(s),s.finished.catch(()=>{}).finally(()=>ea.delete(s)),s}He.addEventListener("change",()=>{if(He.matches)for(const e of ea)e.cancel()});let Mt;function ta(e,t=0){ee(e,[{opacity:.35,transform:"translateY(12px)"},{opacity:1,transform:"translateY(0)"}],{duration:380,delay:t})}function ho(e){if(Mt?.disconnect(),He.matches)return;const t=[...e.querySelectorAll(".topic-option,.path-unit,.mastery-row,.note,.progress-stats > div,.home-next,.welcome-dialogue,.path-robot-dialogue")];if(!("IntersectionObserver"in window)){t.forEach((a,s)=>ta(a,Math.min(s,3)*55));return}Mt=new IntersectionObserver(a=>{let s=0;for(const n of a)n.isIntersecting&&(Mt.unobserve(n.target),n.target.isConnected&&(ta(n.target,s++*Lt.stagger),Ys(n.target)))},{threshold:.08}),t.forEach(a=>Mt.observe(a))}He.addEventListener("change",()=>{He.matches&&Mt?.disconnect()});function fo(e,t){for(const p of ea)p.cancel();Ba(e);const a=e.querySelector(".robot-dialogue h2")?.textContent||"",s=(e.querySelector("h1")?.textContent||"")+":"+!!e.querySelector(".topic-options"),n=[...e.querySelectorAll(".answer.selected")].map(p=>p.textContent).join("|"),i=e.querySelector(".assessment-feedback")||e.querySelector(".feedback:not(:empty)"),r=i?.textContent||t.feedback,o=e.querySelector(".measurement-journal")?.textContent||"",c=e.querySelector(".lesson-track > span"),l=c?.style.width;if(!ce||ce.view!==t.view||ce.prompt!==a||ce.composition!==s){const p=e.querySelector("[data-mascot-state]")?e.querySelector(".student-work")||e.querySelector(".robot-dialogue")||e.querySelector(".welcome-dialogue"):e.querySelector(".lesson-content")||e.querySelector(".page-heading"),y=!ce||!l||parseFloat(l)>=parseFloat(ce.progress||0);ee(p,[{opacity:.6,transform:`translateX(${y?12:-12}px)`},{opacity:1,transform:"translateX(0)"}],{duration:Lt.question,easing:Tt.arrive}),[...e.querySelectorAll(".student-work .answer")].slice(0,6).forEach((g,m)=>ee(g,[{opacity:.5,transform:"translateY(5px)"},{opacity:1,transform:"translateY(0)"}],{duration:220,delay:m*25})),(e.querySelector(".learning-summary")||e.querySelector(".concept-results"))&&[...e.querySelectorAll(".student-work .earned-stars .earned svg")].forEach((g,m)=>ee(g,Ta(.6),{duration:Lt.achievement,delay:m*90,easing:"linear"}));const v=e.querySelector(".robot-dialogue h2");v&&ee(v,[{opacity:.4,transform:"translateY(5px)"},{opacity:1,transform:"translateY(0)"}],{duration:280}),ho(e)}if(ce&&(ce.selection!==t.selection||ce.selectedText!==n))for(const p of e.querySelectorAll(".answer.selected"))ee(p,[{backgroundColor:"#f8f7ee",borderColor:"#9acb74"},{backgroundColor:"#dfe8d3",borderColor:"#58a65c"},{backgroundColor:"#e8eddd",borderColor:"#58a65c"}],{duration:280});if(r&&(!ce||ce.response!==r)&&(ee(i,[{opacity:.35,transform:"translateY(9px)"},{opacity:1,transform:"translateY(0)"}],{duration:320}),ms(i),i?.classList.contains("correct")&&ee(i,[{boxShadow:"inset 0 0 0 2px #88b879"},{boxShadow:"inset 0 0 0 0px transparent"}],{duration:650})),ce&&c&&ce.progress!==l){const p=parseFloat(ce.progress),y=parseFloat(l);Number.isFinite(p)&&y>0&&ee(c,[{transform:`scaleX(${Math.min(1,p/y)})`},{transform:"scaleX(1)"}],{duration:420})}if(ce&&(t.runs>ce.runs||o&&o!==ce.journal)){ee(e.querySelector(".readouts,.science-readouts,#circuit-status"),[{backgroundColor:"#dcebcf"},{backgroundColor:"#f2f5ed"}],{duration:650});const p=e.querySelector(".measurement-journal p:last-child");ta(p)}i?.classList.contains("assessment-feedback")&&!i.querySelector(".motion-feedback-mark")&&ms(i,!1),ce={...t,prompt:a,composition:s,selectedText:n,response:r,journal:o,progress:l}}document.addEventListener("pointerdown",e=>{if(He.matches||e.button!==0)return;const t=e.target.closest("button.button,button.answer,button.lesson-node,button.icon-button,button.text-button,button.nav-item");if(!t||t.disabled||t.getAttribute("aria-disabled")==="true")return;const a=t.getBoundingClientRect(),s=document.createElement("span");s.className="interaction-ripple",s.setAttribute("aria-hidden","true");const n=Math.max(a.width,a.height)*2;Object.assign(s.style,{width:`${n}px`,height:`${n}px`,left:`${e.clientX-a.left-n/2}px`,top:`${e.clientY-a.top-n/2}px`}),t.append(s);const i=ee(s,[{opacity:.2,transform:"scale(0)"},{opacity:0,transform:"scale(1)"}],{duration:480});i?i.finished.catch(()=>{}).finally(()=>s.remove()):s.remove()});document.addEventListener("toggle",e=>{const t=e.target;if(!(t instanceof HTMLDetailsElement)||!t.open||He.matches)return;const a=[...t.querySelectorAll(".unit-lesson")].slice(0,7);a.length?(a.forEach((s,n)=>ta(s,n*35)),Ys(t)):xa(t)},!0);function xa(e){e.open&&ee([...e.children].find(t=>t.tagName!=="SUMMARY"),[{opacity:.3,transform:"translateY(-4px)"},{opacity:1,transform:"translateY(0)"}],{duration:220})}function mo(e){ee(e,[{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}])}function Ba(e=document){for(const t of e.querySelectorAll('input[type="range"]')){const a=t.min===""?0:Number(t.min),s=t.max===""?100:Number(t.max),n=Number(t.value);t.style.setProperty("--range-fill",`${s>a?Math.max(0,Math.min(100,(n-a)/(s-a)*100)):0}%`)}for(const t of e.querySelectorAll("#run,#science-run,#pendulum-run,#rc-start"))t.dataset.motionRunning=String(!!t.querySelector(".lucide-pause")||t.textContent.includes("Դադար"))}const fs=new WeakMap;document.addEventListener("input",e=>{const t=e.target;t.matches('input[type="range"]')&&(Ba(t.closest("main,dialog")||document),requestAnimationFrame(()=>{const a=t.id?document.getElementById(t.id):t;if(!a?.isConnected)return;const n=(a.closest("label")||(a.id?document.querySelector(`label[for="${CSS.escape(a.id)}"]`):null)||a.parentElement)?.querySelector("strong,output,[data-parameter-label]"),i=performance.now();n&&i-(fs.get(n)||0)>140&&(fs.set(n,i),ee(n,[{color:"#285b20",transform:"scale(1.04)"},{color:"inherit",transform:"scale(1)"}],{duration:200}))}))},!0);document.addEventListener("focusin",e=>{const t=e.target;t.matches('input:not([type="range"]):not([type="checkbox"]),textarea,select')&&ee(t,[{boxShadow:"0 0 0 0 rgba(88,99,77,0)"},{boxShadow:"0 0 0 5px rgba(88,99,77,.12)"},{boxShadow:"0 0 0 2px rgba(88,99,77,.05)"}],{duration:400})});document.addEventListener("keydown",e=>{if(e.repeat||!["Enter"," "].includes(e.key))return;const t=e.target.closest("button");!t||t.disabled||ee(t.querySelector("svg"),[{opacity:.55},{opacity:1}],{duration:180})});document.addEventListener("click",()=>requestAnimationFrame(()=>Ba()));document.addEventListener("change",e=>{const t=e.target;t.matches('select,input[type="checkbox"],input[type="radio"]')&&ee(t.closest("label")||t,[{backgroundColor:"#edf5e4"},{backgroundColor:"transparent"}],{duration:360})});function ms(e,t=!0){if(!e?.classList.contains("assessment-feedback"))return;let a=e.querySelector(".motion-feedback-mark");if(!a){a=document.createElementNS("http://www.w3.org/2000/svg","svg"),a.setAttribute("viewBox","0 0 32 32"),a.setAttribute("aria-hidden","true"),a.setAttribute("focusable","false"),a.classList.add("motion-feedback-mark");const i=document.createElementNS("http://www.w3.org/2000/svg","path");i.setAttribute("d",e.classList.contains("correct")?"M8 16l5 5L24 10":"M24 13a9 9 0 1 0 0 8M24 7v6h-6"),i.setAttribute("fill","none"),i.setAttribute("stroke","currentColor"),i.setAttribute("stroke-width","2.5"),i.setAttribute("stroke-linecap","round"),i.setAttribute("stroke-linejoin","round"),a.append(i),e.prepend(a)}if(!t)return;e.classList.contains("correct")?ee(a,Ta(.7),{duration:Lt.feedback,easing:"linear"}):ee(a,[{transform:"rotate(-18deg)",opacity:.5},{transform:"rotate(0deg)",opacity:1}],{duration:Lt.feedback,easing:Tt.arrive});const s=a.querySelector("path"),n=s.getTotalLength();ee(s,[{strokeDasharray:`${n}`,strokeDashoffset:n},{strokeDasharray:`${n}`,strokeDashoffset:0}],{duration:280,delay:60,easing:Tt.standard})}function Ys(e){if(!He.matches)for(const t of e.querySelectorAll(".path-connector path")){if(!t.getClientRects().length)continue;const a=t.getTotalLength();a&&ee(t,[{strokeDasharray:`${a}`,strokeDashoffset:a,opacity:.3},{strokeDasharray:`${a}`,strokeDashoffset:0,opacity:1}],{duration:620,easing:Tt.arrive})}}document.addEventListener("pointerup",e=>{const t=e.target.closest("button");if(!t||t.disabled||t.getAttribute("aria-disabled")==="true")return;const a=t.querySelector("svg");a&&ee(a,Ta(.9),{duration:260,easing:"linear"})});const Bt=[{id:"pendulum",title:"Ճոճանակի գաղտնիքները",context:"Ժամացույցի ճոճանակի շարժումը կրկնվում է։ Եկ պարզենք՝ ինչն է փոխում նրա պարբերությունը։",prediction:"Երկարությունն ավելացնելիս ճոճանակի պարբերությունն ինչպե՞ս կփոխվի։",choices:["Կմեծանա","Կփոքրանա","Չի փոխվի"],correct:0,observe:"Նույն փոքր անկյան դեպքում երկարությունն ավելացնելիս պարբերությունն ինչպե՞ս փոխվեց։",observations:["Մեծացավ","Փոքրացավ"],observed:0,explanation:"Փոքր անկյունների դեպքում T ≈ 2π√(L/g)։ Երկար ճոճանակն ավելի դանդաղ է տատանվում։ Մեծ անկյունների դեպքում պարբերությունը կախված է նաև ամպլիտուդից։ Մեր մոդելը լուծում է ամբողջ sin θ հավասարումը, առանց շփման։",challenge:"Փոքր անկյան դեպքում երկարությունը 4 անգամ ավելացնելիս պարբերությունը քանի՞ անգամ է մեծանում։",answer:2,unit:"",formula:"T ≈ 2π√(L/g)",hint:"Պարբերությունը համեմատական է երկարության քառակուսի արմատին։ √4 = 2։",settings:[]},{id:"circuits",title:"Էլեկտրական շղթայի հիմունքներ",context:"Օգնի՛ր ինձ միացնել փոքր լամպը։ Ունենք մարտկոց, լարեր, անջատիչ և լամպ։",prediction:"Լամպը կվառվի՞, եթե լարերից մեկը միացված չլինի։",choices:["Այո՛, մարտկոցը բավական է","Ո՛չ, պետք է փակ ճանապարհ"],correct:1,observe:"Փակիր, հետո բացիր անջատիչը։ Ե՞րբ է լամպը վառվում։",observations:["Փակ շղթայում","Բաց շղթայում"],observed:0,explanation:"Հոսանքի համար աղբյուրից դեպի լամպ և հետադարձ կապով փակ ճանապարհ է պետք։ Մետաղյա լարը հաղորդիչ է, իսկ դրա պլաստիկ պատյանը՝ մեկուսիչ։ Մեր լամպը մոտարկված է 20 Օմ դիմադրությամբ։",challenge:"9 Վ աղբյուրին միացված 20 Օմ բեռի հոսանքի ուժը որքա՞ն է։",answer:.45,unit:"Ա",formula:"I = U / R",hint:"Բաժանիր լարումը դիմադրության վրա։",settings:[]},{id:"ohm",title:"Լարում, հոսանքի ուժ և դիմադրություն",context:"Պատկերացրու՝ չափում ենք կայուն ջերմաստիճանի դիմադրիչի հոսանքը։ Կարո՞ղ ենք կառավարել այն։",prediction:"Նույն դիմադրության դեպքում լարումը կրկնապատկելիս ի՞նչ կլինի հոսանքի ուժի հետ։",choices:["Կկրկնապատկվի","Կկիսվի","Կմնա նույնը"],correct:0,observe:"Դիմադրությունը մեծացնելիս ի՞նչ է կատարվում հոսանքի ուժի հետ։",observations:["Մեծանում է","Փոքրանում է"],observed:1,explanation:"Օհմական դիմադրիչի համար I = U / R։ Այս մոտարկման մեջ դիմադրությունն ու ջերմաստիճանը հաստատուն են։ Համեմատիր քո պահպանած չափումները։",challenge:"12 Վ լարման և 6 Օմ դիմադրության դեպքում հոսանքի ուժը որքա՞ն է։",answer:2,unit:"Ա",formula:"I = U / R",hint:"12 Վ լարումը բաժանիր 6 Օմ դիմադրության վրա։",settings:[["voltage","Լարում","Վ",1,12,1,6],["resistance","Դիմադրություն","Օմ",2,40,1,10]]},{id:"galvanic",title:"Գալվանական տարրեր",context:"Կարո՞ղ է քիմիական ռեակցիան մեզ էլեկտրական էներգիա տալ։ Եկ ուսումնասիրենք ցինկ–պղինձ Դանիելի տարրը։",prediction:"Կայուն հոսանքի համար միայն արտաքին լա՞րն է բավարար։",choices:["Այո՛","Ո՛չ, նաև իոնային կապ է պետք"],correct:1,observe:"Աղային կամուրջը հեռացնելիս կայուն հոսանքը շարունակվո՞ւմ է։",observations:["Այո՛","Ո՛չ"],observed:1,explanation:"Ցինկի անոդում՝ Zn → Zn²⁺ + 2e⁻։ Պղնձի կաթոդում՝ Cu²⁺ + 2e⁻ → Cu։ Էլեկտրոններն արտաքին լարով անցնում են ցինկից պղինձ։ Պայմանական հոսանքի ուղղությունը հակառակն է։ Կամուրջը լուծույթների լիցքային հավասարակշռությունն է պահում։",challenge:"Ստանդարտ պոտենցիալներն են +0.34 Վ և −0.76 Վ։ Տարրի ԷԼՇ-ն որքա՞ն է։",answer:1.1,unit:"Վ",formula:"E° = 0.34 − (−0.76) = 1.10 Վ",hint:"Կաթոդի պոտենցիալից հանիր անոդինը․ բացասական թիվ հանելիս այն գումարվում է։",settings:[]},{id:"series",title:"Հաջորդական և զուգահեռ միացումներ",context:"Մի աղբյուրով երկու լամպ միացնենք։ Միացման ձևը կփոխի՞ լամպերի հոսանքը։",prediction:"Նույն երկու դիմադրիչների ընդհանուր դիմադրությունը ո՞ր միացման դեպքում է ավելի փոքր։",choices:["Հաջորդական","Զուգահեռ"],correct:1,observe:"Զուգահեռ ճյուղերում ի՞նչն է նույնը։",observations:["Լարումը","Հոսանքը՝ ցանկացած դիմադրությունների դեպքում"],observed:0,explanation:"Հաջորդաբար՝ R = R₁ + R₂, հոսանքը նույնն է։ Զուգահեռ՝ 1/R = 1/R₁ + 1/R₂, լարումը նույնն է։ Լամպերն այստեղ իդեալական դիմադրիչներ են․ իրական շիկացման լամպի դիմադրությունը տաքանալիս փոխվում է։",challenge:"Երկու 10 Օմ դիմադրիչների զուգահեռ միացման դիմադրությունը որքա՞ն է։",answer:5,unit:"Օմ",formula:"Rհաջ = R₁ + R₂ · 1/Rզուգ = 1/R₁ + 1/R₂",hint:"Նույն դիմադրությամբ երկու զուգահեռ ճյուղերի ընդհանուր դիմադրությունը կիսվում է։",settings:[["voltage","Լարում","Վ",1,12,1,6],["r1","Առաջին դիմադրություն","Օմ",5,40,5,10],["r2","Երկրորդ դիմադրություն","Օմ",5,40,5,10]]},{id:"components",title:"Էլեկտրոնային բաղադրիչներ",context:"Եկ ծանոթանանք վեց բաղադրիչի։ Ընտրիր մեկը և փորձիր՝ ինչ է փոխում այն շղթայում։",prediction:"LED-ի երկու ելքերը փոխելիս այն նույնպե՞ս կվառվի։",choices:["Այո՛","Ո՛չ, բևեռականությունը կարևոր է"],correct:1,observe:"RC շղթայում կոնդենսատորի լարումն ինչպե՞ս է աճում։",observations:["Աստիճանաբար","Միանգամից՝ մինչև աղբյուրի լարումը"],observed:0,explanation:"Դիմադրիչը սահմանափակում է հոսանքը։ Դիոդը նախընտրելի ուղղությամբ է հաղորդում, LED-ը նաև լույս է տալիս։ Կոնդենսատորը լիցք է կուտակում։ Տրանզիստորը կարող է կառավարել հոսանքը։ Մակետային տախտակի որոշ անցքեր ներսից միացված են։ Այստեղ դրանց պարզ ուսումնական մոդելներն են։",challenge:"1000 Օմ և 1000 մկՖ RC շղթայի ժամանակի հաստատունը որքա՞ն է։",answer:1,unit:"վ",formula:"τ = R × C",hint:"1000 մկՖ = 0.001 Ֆ։ Բազմապատկիր 1000 Օմ-ով։",settings:[["voltage","Լարում","Վ",1,9,1,5],["resistance","Դիմադրություն","Օմ",100,2e3,100,1e3],["capacitance","Ունակություն","մկՖ",100,2e3,100,1e3]]},{id:"project",title:"Իմ առաջին էլեկտրոնային նախագիծը",context:"Եկ վիրտուալ փոքր լույս հավաքենք՝ 5 Վ աղբյուր, անջատիչ, կարմիր LED և հոսանքը սահմանափակող դիմադրիչ։",prediction:"Կարելի՞ է LED-ը անմիջապես միացնել աղբյուրին՝ առանց դիմադրիչի։",choices:["Այո՛","Ո՛չ, հոսանքը կարող է չափազանց մեծ լինել"],correct:1,observe:"Սխալ բևեռականությամբ LED-ն այս մոդելում վառվո՞ւմ է։",observations:["Այո՛","Ո՛չ"],observed:1,explanation:"Այս մոդելում կարմիր LED-ի ուղիղ լարման անկումը մոտ 2 Վ է։ Հոսանքը՝ (U − 2 Վ) / R։ Ընտրում ենք մինչև 20 մԱ հոսանք։ Սա վիրտուալ ցածր լարման փորձ է․ իրական սարքի տվյալաթերթը ևս պետք է հաշվի առնել։",challenge:"5 Վ աղբյուրի, 2 Վ LED-ի և 300 Օմ դիմադրիչի հոսանքը որքա՞ն է ամպերով։",answer:.01,unit:"Ա",formula:"I = (U − ULED) / R",hint:"Դիմադրիչի վրա մնում է 5 − 2 = 3 Վ։ 3 Վ-ը բաժանիր 300 Օմ-ի։",settings:[["resistance","Սահմանափակող դիմադրություն","Օմ",0,1e3,50,300]]},{id:"power",title:"Էլեկտրական հզորություն և էներգիա",context:"Երկու սարք կարող են նույնքան ժամանակ աշխատել, բայց տարբեր էներգիա ծախսել։ Ի՞նչն է որոշում դա։",prediction:"Նույն հզորությամբ երկու անգամ ավելի երկար աշխատելիս ի՞նչ կլինի ծախսված էներգիայի հետ։",choices:["Կկրկնապատկվի","Չի փոխվի"],correct:0,observe:"Հաստատուն դիմադրության դեպքում լարումը մեծացնելիս հզորությունն ինչպե՞ս է փոխվում։",observations:["Մեծանում է","Փոքրանում է"],observed:0,explanation:"Հաստատուն DC պայմաններում P = U × I և E = P × t։ Դիմադրիչի հոսանքն ինքնուրույն հաշվում ենք՝ I = U/R։ Լարումը փոխելիս հոսանքի ուժն էլ է փոխվում, ուստի անկախ թվեր չենք ընտրում։",challenge:"6 Վ լարման և 0.5 Ա հոսանքի դեպքում 10 վ-ում ծախսված էներգիան որքա՞ն է։",answer:30,unit:"Ջ",formula:"P = U × I · E = P × t",hint:"Նախ հաշվիր 6 × 0.5 Վտ հզորությունը, հետո բազմապատկիր 10 վ-ով։",settings:[["voltage","Լարում","Վ",1,12,1,6],["resistance","Դիմադրություն","Օմ",2,40,1,12],["time","Աշխատանքի ժամանակ","վ",1,60,1,10]]},{id:"sensors",title:"Սենսորներ և ռոբոտաշինության հիմունքներ",context:"Օգնի՛ր ինձ ինքնուրույն արձագանքել միջավայրին։ Ընտրենք սենսոր, չափենք և սահմանենք մի պարզ կանոն։",prediction:"Ավտոմատ լույսը կարող է աշխատե՞լ «եթե մութ է, միացրու» կանոնով։",choices:["Այո՛","Ո՛չ"],correct:0,observe:"Սահմանային արժեքը փոխելիս ի՞նչ է փոխվում։",observations:["Արձագանքելու պայմանը","Միշտ հենց սենսորի չափումը"],observed:0,explanation:"Սենսորը տալիս է չափում։ Կառավարման կանոնը համեմատում է այն սահմանային արժեքի հետ և կառավարում LED-ը։ Այստեղ թվային իդեալական չափումներ են՝ առանց իրական սարքերի աղմուկի ու ուշացման։",challenge:"Եթե կանոնն է «միացրու, երբ հեռավորությունը փոքր է 30 սմ-ից», ապա 20 սմ-ի դեպքում ելքը միացվա՞ծ է։ Մուտքագրիր 1՝ այո, 0՝ ոչ։",answer:1,unit:"",formula:"Չափում → համեմատում → ելք",hint:"Համեմատիր 20 սմ-ն ու 30 սմ-ն։ 20-ը փոքր է 30-ից։",settings:[]}],ke="charge-checkpoint",go=["charges","atom","electrification","conductors","electric-field","current-origin"],Yt={charges:"Լիցքերի փոխազդեցություն",atom:"Ատոմ և էլեկտրոններ",electrification:"Էլեկտրականացում",conductors:"Հաղորդիչներ և մեկուսիչներ","electric-field":"Էլեկտրական դաշտ","current-origin":"Էլեկտրական հոսանք"},oe=(e,t,a,s,n,i,r="")=>({id:e,topic:t,prompt:a,options:s,answer:n,why:i,visual:r,type:"choice"}),fa=(e,t,a,s,n,i)=>({id:e,topic:t,prompt:a,answer:s,why:n,unit:i,type:"number"}),St=[oe("q01","charges","Երկու գնդիկներն ազատ են շարժվելու։ Ի՞նչ կլինի։",["Կհեռանան իրարից","Կմոտենան իրար","Չեն փոխազդի"],0,"Նույնանուն լիցքերը վանում են իրար։","+     +"),oe("q02","charges","Գտիր սխալ պնդումը։",["Տարանուն լիցքերը ձգվում են","Բացասական լիցքերը վանում են իրար","Բոլոր լիցքերը ձգվում են իրար"],2,"Փոխազդեցության ուղղությունը կախված է նշաններից․ նույնանունները վանում են։"),{id:"q03",topic:"charges",type:"simulation",simulation:"distance",prompt:"Երկու անփոփոխ լիցքերի հեռավորությունը 1 մ է։ Կարգավորիր այն այնպես, որ ուժը դառնա սկզբնականի մեկ քառորդը, ապա գրանցիր չափումը։",why:"Կուլոնի օրենքով F ∝ 1/r²․ հեռավորությունը 1 մ-ից 2 մ դարձնելիս ուժը փոքրանում է 4 անգամ։"},fa("q04","atom","Ատոմն ունի 11 պրոտոն և 10 էլեկտրոն։ Որքա՞ն է ընդհանուր լիցքը՝ տարրական լիցքի միավորներով։",1,"11 դրական և 10 բացասական լիցքերի գումարը +1e է։","e"),oe("q05","atom","Նկարում ատոմի ո՞ր մասնիկներն են կարող անցնել մեկ մարմնից մյուսին սովորական էլեկտրականացման ժամանակ։",["Պրոտոնները","Էլեկտրոնները","Միջուկի նեյտրոնները"],1,"Սովորական շփման ժամանակ տեղափոխվում են էլեկտրոնները, իսկ միջուկները մնում են նյութում։","Միջուկ՝ +8e     էլեկտրոններ՝ 8 × −e"),{id:"q06",topic:"atom",type:"simulation",simulation:"atom",prompt:"Մոդելի միջուկն ունի 10 պրոտոն։ Փոխիր էլեկտրոնների թիվը, որպեսզի մասնիկը ստանա −2e լիցք։ Գրանցիր ստացված վիճակը։",why:"Q=(10−N)e․ −2e ստանալու համար պետք է 12 էլեկտրոն։"},oe("q07","electrification","Շփումից հետո չեզոք ձողը ստացել է էլեկտրոններ։ Ի՞նչ լիցք ունի այն։",["Դրական","Բացասական","Մնում է չեզոք"],1,"Էլեկտրոնների ավելցուկը մարմնին տալիս է բացասական լիցք։"),fa("q08","electrification","Երկու մարմինների սկզբնական ընդհանուր լիցքը 0 է։ Փոխազդեցությունից հետո մեկը ունի +3 նԿլ։ Որքա՞ն է մյուսի լիցքը։",-3,"Մեկուսացված համակարգում ընդհանուր լիցքը պահպանվում է․ +3+(−3)=0 նԿլ։","նԿլ"),oe("q09","electrification","Աշակերտն ասում է. «Շփումը ստեղծում է նոր էլեկտրոններ»։ Ինչպե՞ս կուղղես։",["Էլեկտրոնները տեղափոխվում են մարմինների միջև","Շփումը ստեղծում է միայն պրոտոններ","Լիցքը միշտ անհետանում է"],0,"Շփումը վերաբաշխում է լիցքը, նոր էլեկտրոններ չի ստեղծում։"),oe("q10","conductors","Ո՞ր զույգը կընտրես լարի միջուկի և արտաքին ծածկույթի համար։",["Պղինձ և պլաստիկ","Պլաստիկ և պղինձ","Չոր ապակի և պղինձ"],0,"Պղինձը հաղորդում է հոսանք, իսկ պլաստիկ ծածկույթը մեկուսացնում է։"),oe("q11","conductors","Նույն փորձի ժամանակ լամպը վառվում է պղնձով, բայց չի վառվում չոր պլաստիկով։ Ի՞նչն է հիմնավորված։",["Այս պայմաններում պղինձը լավ հաղորդիչ է","Պլաստիկի մեջ մասնիկներ չկան","Լամպի համար լարում պետք չէ"],0,"Միայն նյութը փոխելով՝ համեմատում ենք հաղորդունակությունը նույն պայմաններում։"),{id:"q12",topic:"conductors",type:"simulation",simulation:"circuit",prompt:"Մարտկոցն ու լամպը միացված են անջատիչի և նմուշի միջոցով։ Ընտրիր նյութն ու անջատիչի վիճակը, որպեսզի լամպով հոսանք անցնի։ Գրանցիր վիճակը։",why:"Լամպը վառվում է հաղորդիչ նմուշով փակ շղթայում։ Բաց անջատիչը կամ պլաստիկ նմուշը ընդհատում են ճանապարհը։"},oe("q13","electric-field","Դրական աղբյուրից աջ դրված դրական փորձնական լիցքի վրա ո՞ր ուղղությամբ է ուժը։",["Աջ՝ աղբյուրից հեռու","Ձախ՝ դեպի աղբյուրը","Ուղղություն չունի"],0,"Դաշտի ուղղությունը սահմանվում է դրական փորձնական լիցքի վրա ազդող ուժի ուղղությամբ։","Աղբյուր +     փորձնական +"),oe("q14","electric-field","Նույն կետում դրական փորձնական լիցքը փոխարինեցինք բացասականով։ Ի՞նչ փոխվեց։",["Աղբյուրի դաշտը հակադարձվեց","Լիցքի վրա ուժի ուղղությունը հակադարձվեց","Աղբյուրի լիցքն անհետացավ"],1,"Աղբյուրի դաշտը նույնն է, բայց F=qE ուժը բացասական q-ի դեպքում հակառակ ուղղություն ունի։"),oe("q15","electric-field","Ո՞ր դիտարկումն է ցույց տալիս, որ մարմինները կարող են փոխազդել առանց հպման։",["Լիցքավորված ձողը հեռվից շեղում է լիցքավորված թեթև գնդիկը","Մատը հրում է գնդիկը","Սեղանը պահում է տետրը"],0,"Էլեկտրական դաշտը կարող է ուժով ազդել տարածության մեջ գտնվող լիցքի վրա։"),oe("q16","current-origin","Մետաղում էլեկտրական հոսանքն ի՞նչ է։",["Էլեկտրոնների ուղղորդված շարժում","Պրոտոնների շարժում լարի երկայնքով","Միայն մասնիկների անկանոն շարժում"],0,"Մետաղում ազատ էլեկտրոնների ուղղորդված շարժումն է ստեղծում հոսանքը։"),oe("q17","current-origin","Մարտկոցով պարզ շղթայի անջատիչը բաց է։ Ինչո՞ւ լամպը չի վառվում։",["Չկա ամբողջական հաղորդող ճանապարհ","Մարտկոցի բոլոր էլեկտրոնները վերջացել են","Լամպը հեռու է մարտկոցից"],0,"Կայուն հոսանքի համար անհրաժեշտ է ամբողջական շղթա և աղբյուր։"),oe("q18","current-origin","Մետաղում էլեկտրոնները շարժվում են ձախ։ Ո՞րն է պայմանական հոսանքի ուղղությունը։",["Ձախ","Աջ","Երկու ուղղությամբ հավասար"],1,"Պայմանական հոսանքի ուղղությունը դրական լիցքերի շարժման ուղղությունն է՝ մետաղի էլեկտրոնների շարժմանը հակառակ։","էլեկտրոններ ← ← ←"),oe("q19","atom","Մարմինն ունի հավասար թվով պրոտոններ և էլեկտրոններ։ Ընտրիր ճիշտ մեկնաբանությունը։",["Լիցքավորված մասնիկներ չունի","Ընդհանուր լիցքը զրո է","Բոլոր էլեկտրոնները կանգնած են"],1,"Չեզոք լինելը նշանակում է լիցքերի գումարի զրո լինել, ոչ թե լիցքավորված մասնիկների բացակայություն։"),oe("q20","electrification","Լիցքավորված փուչիկը ձգում է չեզոք պատը։ Ո՞ր բացատրությունն է տեղին։",["Պատի լիցքերը փոքր-ինչ վերաբաշխվում են","Պատը անպայման ամբողջությամբ բացասական է","Ձգում հնարավոր է միայն նույնանուն լիցքերի միջև"],0,"Չեզոք մարմնի լիցքերի վերաբաշխումը կարող է առաջացնել ձգողություն՝ առանց ընդհանուր լիցքը փոխելու։"),oe("q21","charges","Ուժը հեռավորությունից կախված ուսումնասիրելու համար ո՞ր փորձն է արդար համեմատություն։",["Փոխել միայն հեռավորությունը՝ լիցքերը պահելով նույնը","Միաժամանակ փոխել երկու լիցքն ու հեռավորությունը","Ամեն անգամ ընտրել այլ մարմիններ"],0,"Մեկ փոփոխական փոխելը թույլ է տալիս արդյունքի փոփոխությունը կապել հենց դրա հետ։"),oe("q22","conductors","Վնասված լարի պղնձե միջուկը բաց է։ Ի՞նչ անես։",["Չդիպչել, անջատել սնուցումը և դիմել մեծահասակի","Փորձել դիպչելով՝ հոսանք կա՞","Թաց կտորով փաթաթել"],0,"Բաց հաղորդիչը վտանգավոր է․ փորձերը կատարում ենք միայն անվտանգ ցածր լարման մոդելներով։"),oe("q23","electric-field","Դրական աղբյուրի շուրջ ո՞ր սխեման է ցույց տալիս դաշտի ճիշտ ուղղությունը։",["← + →","→ + ←","→ + →"],0,"Դրական կետային աղբյուրի դաշտն ուղղված է աղբյուրից դուրս։"),fa("q24","electrification","Մեկուսացված զույգի լիցքերն են +5 նԿլ և −2 նԿլ։ Փոխազդեցությունից հետո մեկի լիցքը +1 նԿլ է։ Գտիր մյուսինը։",2,"Սկզբում ընդհանուր լիցքը +3 նԿլ է։ Վերջում +1+Q=+3, հետևաբար Q=+2 նԿլ։","նԿլ"),oe("q25","current-origin","Աղբյուրն աշխատում է, լամպը սարքին է, բայց չի վառվում։ Ո՞րն է ամենահիմնավոր հաջորդ քայլը։",["Ստուգել փակ հաղորդող ճանապարհի առկայությունը","Եզրակացնել, որ հոսանք գոյություն չունի","Անպայման ավելացնել լարերի երկարությունը"],0,"Ստուգում ենք միացումները, անջատիչը և հաղորդիչ նյութը՝ մեկ պայմանը մեկ անգամ փոխելով։")],ma={charges:{prompt:"Կրկնություն․ երկու բացասական լիցքերն ինչպե՞ս են փոխազդում։",options:["Վանվում են","Ձգվում են"],answer:0,why:"Նույնանուն լիցքերը վանում են իրար։"},atom:{prompt:"Կրկնություն․ 6 պրոտոն և 7 էլեկտրոն ունեցող մասնիկի լիցքն ի՞նչ է։",options:["+1e","−1e","0"],answer:1,why:"6−7=−1․ մեկ ավելորդ էլեկտրոնը տալիս է −1e։"},electrification:{prompt:"Կրկնություն․ չեզոք մարմինը կորցրեց էլեկտրոններ։ Ինչպիսի՞ն է նրա լիցքը։",options:["Դրական","Բացասական"],answer:0,why:"Էլեկտրոնների կորուստը թողնում է դրական լիցքի ավելցուկ։"},conductors:{prompt:"Կրկնություն․ փակ շղթայի պղնձե նմուշը փոխարինեցինք չոր ապակիով։ Ի՞նչ կսպասես։",options:["Լամպը կշարունակի նույն կերպ վառվել","Հոսանքը գործնականում կընդհատվի"],answer:1,why:"Չոր ապակին այս ցածր լարման փորձի պայմաններում մեկուսիչ է։"},"electric-field":{prompt:"Կրկնություն․ դրական աղբյուրը ինչպե՞ս է ազդում բացասական փորձնական լիցքի վրա։",options:["Ձգում է դեպի իրեն","Վանում է իրենից"],answer:0,why:"Տարանուն լիցքերը ձգվում են․ բացասական լիցքի ուժը հակառակ է դաշտի ուղղությանը։"},"current-origin":{prompt:"Կրկնություն․ մետաղում էլեկտրոնների միայն անկանոն շարժումը արդյո՞ք հոսանք է։",options:["Այո","Ոչ․ պետք է ուղղորդված շարժում"],answer:1,why:"Հոսանքը պահանջում է լիցքակիրների ուղղորդված շարժում։"}},Ft=e=>Array.isArray(e)?e:[e?.start,e?.end],Fa=e=>e&&typeof e=="object"&&Number.isFinite(e.x)&&Number.isFinite(e.y);function Qs(e){return e.junctions||=[],e.wires=e.wires.map((t,a)=>Array.isArray(t)?{id:`legacy-${a}-${t.join("-")}`,start:t[0],end:t[1]}:t),e}const Vt=(e,t)=>t>0?e/t:null;function Xs(e,t,a,s=!1){const n=s?1/(1/t+1/a):t+a,i=Vt(e,n);return{resistance:n,current:i,i1:s?e/t:i,i2:s?e/a:i,v1:s?e:i*t,v2:s?e:i*a}}function gs(e,t,a=!0){if(t<=0)return{current:0,lit:!1,unsafe:!0};const s=a?Math.max(0,(e-2)/t):0;return{current:s,lit:s>0&&s<=.02,unsafe:s>.02}}function bo(e=!0,t=!0){return{potential:1.1,sustained:e&&t,anode:"Zn",cathode:"Cu"}}function _s(e,t,a){const s=Vt(e,t),n=e*s;return{current:s,watts:n,joules:n*a}}function Os(e,t,a,s,n=!1){const i=t*a/1e6;return{tau:i,voltage:e*(n?Math.exp(-s/i):1-Math.exp(-s/i))}}function yo(e,t){const a=t.length;for(let s=0;s<a;s++){let n=s;for(let r=s+1;r<a;r++)Math.abs(e[r][s])>Math.abs(e[n][s])&&(n=r);if(Math.abs(e[n][s])<1e-10)return null;[e[s],e[n]]=[e[n],e[s]],[t[s],t[n]]=[t[n],t[s]];const i=e[s][s];for(let r=s;r<a;r++)e[s][r]/=i;t[s]/=i;for(let r=0;r<a;r++)if(r!==s){const o=e[r][s];for(let c=s;c<a;c++)e[r][c]-=o*e[s][c];t[r]-=o*t[s]}}return t}function ot(e,t,a=[]){const s=A=>({status:A,current:0,lamps:{},branchCurrents:{},nodeVoltages:{},meters:{},powers:{},voltageDrops:{}});if(!Array.isArray(e)||!Array.isArray(t)||!Array.isArray(a)||e.some(A=>!A||typeof A.id!="string"||!A.id||A.id.includes(":"))||new Set(e.map(A=>A.id)).size!==e.length||new Set(a.map(A=>A.id)).size!==a.length)return s("invalid");const n=e.filter(A=>A.type==="battery");if(!n.length)return s("no-source");if(n.length!==1||e.some(A=>!["battery","switch","lamp","resistor","ammeter","voltmeter"].includes(A.type)))return s("unsupported");const i=n[0],r=i.voltage??9;if(!Number.isFinite(r)||r<0)return s("unsupported");const o=new Map;for(const A of e)for(const F of["a","b"])o.set(`${A.id}:${F}`,`${A.id}:${F}`);for(const A of a)o.set("j:"+A.id,"j:"+A.id);if(t.some(A=>{const F=Ft(A);return F.length!==2||F.some(j=>typeof j=="string"?!o.has(j):!Fa(j))}))return s("invalid");const c=A=>{const F=o.get(A);return F===void 0?null:(F!==A&&o.set(A,c(F)),o.get(A))},l=(A,F)=>{const j=c(A),O=c(F);j&&O&&j!==O&&o.set(j,O)};for(const A of t){const[F,j]=Ft(A);typeof F=="string"&&typeof j=="string"&&l(F,j)}for(const A of e)A.type==="switch"&&A.closed&&l(A.id+":a",A.id+":b");const u=c(i.id+":a"),p=c(i.id+":b");if(u===p)return s("short");const y=e.filter(A=>["lamp","resistor"].includes(A.type)).map(A=>({id:A.id,a:c(A.id+":a"),b:c(A.id+":b"),r:A.resistance??20}));if(y.some(A=>!Number.isFinite(A.r)||A.r<=0))return s("unsupported");const h=e.filter(A=>A.type==="ammeter").map(A=>({id:A.id,a:c(A.id+":a"),b:c(A.id+":b")})),v=new Set([u]);let g=!0;for(;g;){g=!1;for(const A of h)if(v.has(A.a)||v.has(A.b))for(const F of[A.a,A.b])v.has(F)||(v.add(F),g=!0)}if(v.has(p)&&r!==0)return s("meter-short");const m=new Set([u,p]);for(g=!0;g;){g=!1;for(const A of[...y,...h])if(m.has(A.a)||m.has(A.b))for(const F of[A.a,A.b])m.has(F)||(m.add(F),g=!0)}const d=h.filter(A=>m.has(A.a)&&m.has(A.b)),f=[...m].filter(A=>A!==u&&A!==p),x=new Map(f.map((A,F)=>[A,F])),b=f.length+d.length,w=Array.from({length:b},()=>Array(b).fill(0)),$=Array(b).fill(0),k=new Map([[u,r],[p,0]]);for(const A of y)for(const[F,j]of[[A.a,A.b],[A.b,A.a]])if(x.has(F)){const O=x.get(F),qe=1/A.r;w[O][O]+=qe,x.has(j)?w[O][x.get(j)]-=qe:k.has(j)&&($[O]+=qe*k.get(j))}d.forEach((A,F)=>{const j=f.length+F;for(const[O,qe]of[[A.a,1],[A.b,-1]])x.has(O)?(w[x.get(O)][j]+=qe,w[j][x.get(O)]+=qe):k.has(O)&&($[j]-=qe*k.get(O))});const M=yo(w,$);if(!M||M.some(A=>!Number.isFinite(A)))return s("unsupported");f.forEach((A,F)=>k.set(A,M[F]));const q={},I={},L={},E={},T={};let V=0;for(const A of y){const F=k.has(A.a)&&k.has(A.b)?(k.get(A.a)-k.get(A.b))/A.r:0;q[A.id]=Math.abs(F),I[A.id]=F,T[A.id]=F*A.r,E[A.id]=F*F*A.r,A.a===u&&(V+=F),A.b===u&&(V-=F)}d.forEach((A,F)=>{const j=M[f.length+F];L[A.id]=j,A.a===u&&(V+=j),A.b===u&&(V-=j)});for(const A of e)if(A.type==="voltmeter"){const F=k.get(c(A.id+":a")),j=k.get(c(A.id+":b"));L[A.id]=F===void 0||j===void 0?null:F-j}const D={};for(const A of o.keys())D[A]=k.get(c(A))??null;if(!Number.isFinite(V)||Object.values(E).some(A=>!Number.isFinite(A)))return s("unsupported");const Z=new Set([u]);for(g=!0;g;){g=!1;for(const A of[...y,...h])if(Z.has(A.a)||Z.has(A.b))for(const F of[A.a,A.b])Z.has(F)||(Z.add(F),g=!0)}return{status:Z.has(p)?"closed":"open",current:Math.max(0,V),lamps:q,branchCurrents:I,nodeVoltages:D,meters:L,powers:E,voltageDrops:T}}const ye=9.81,Ce=e=>e*Math.PI/180;function Nt(e,{v0:t=0,a=0}={}){return{x:t*e+.5*a*e*e,v:t+a*e,a}}function vo({force:e,mass:t,mu:a=0},s=0){const n=t*ye,i=1.25*a*n,r=Math.abs(e)>i,o=r?-Math.sign(e)*a*n:-e,c=e+o,l=c/t;return{...Nt(s,{a:l}),normal:n,friction:o,net:c,sliding:r}}function bs({angle:e,mass:t,mu:a=0},s=0){const n=Ce(e),i=t*ye*Math.cos(n),r=t*ye*Math.sin(n),o=r>1.25*a*i+1e-10,c=o?a*i:r,l=(r-c)/t;return{...Nt(s,{a:l}),normal:i,down:r,friction:c,sliding:o}}function It({height:e,mass:t=1},a=0){const s=Math.sqrt(2*e/ye),n=Math.min(Math.max(a,0),s),i=Math.max(0,e-.5*ye*n*n),r=ye*n;return{t:n,duration:s,y:i,v:r,potential:t*ye*i,kinetic:.5*t*r*r,total:t*ye*e}}const xo=({mass:e,area:t})=>e*ye/t,$o=({density:e=1e3,depth:t})=>e*ye*t;function wo({density:e,volume:t=.002,fluid:a=1e3}){const s=Math.min(1,e/a),n=e*t*ye,i=a*t*s*ye;return{fraction:s,weight:n,force:i,net:i-n,floating:e<=a}}function ga({mass:e=1,temperature:t=80,conductance:a=100},s=0){const n=e*4180,i=4180,r=(n*t+i*20)/(n+i),o=Math.exp(-a*(1/n+1/i)*s),c=r+(t-r)*o,l=(n*t+i*20-n*c)/i;return{hot:c,cold:l,equilibrium:r,energy:n*c+i*l,flow:a*(c-l)}}function $a({frequency:e=1,amplitude:t=.2,speed:a=2},s,n=0){const i=a/e;return{y:t*Math.sin(2*Math.PI*(e*n-s/i)),wavelength:i,period:1/e,speed:a}}function ko({incoming:e=30,tilt:t=0}){const a={x:Math.sin(Ce(e)),y:Math.cos(Ce(e))},s={x:Math.sin(Ce(t)),y:-Math.cos(Ce(t))},n=a.x*s.x+a.y*s.y,i={x:a.x-2*n*s.x,y:a.y-2*n*s.y},r=Math.acos(Math.min(1,Math.abs(n)))*180/Math.PI;return{d:a,n:s,reflected:i,incidence:r,reflection:r}}function Mo({angle:e,n1:t=1,n2:a=1.5}){const s=t*Math.sin(Ce(e))/a;return{tir:Math.abs(s)>1,angle:Math.abs(s)>1?null:Math.asin(s)*180/Math.PI}}function So({focal:e=.3,object:t=.8}){const a=1/e-1/t;if(Math.abs(a)<1e-10)return{infinite:!0,image:null,magnification:null};const s=1/a;return{infinite:!1,image:s,magnification:-s/t,real:s>0}}function Js({x:e=1,y:t=.5,moment:a=2}){const s=e*e+t*t;if(s<.01)throw new RangeError("Point inside dipole exclusion region");const n=1e-7*a/Math.pow(s,1.5),i=n*(3*e*e/s-1),r=n*3*e*t/s;return{bx:i,by:r,magnitude:Math.hypot(i,r),angle:Math.atan2(r,i)}}function ys({position:e=0,velocity:t=.5,turns:a=100},s=0){const r=e+t*s,o=.002*Math.exp(-r*r/(2*.6*.6));return{x:r,flux:o,emf:a*r/(.6*.6)*o*t}}function Co(e,{left:t,right:a,track:s=.4},n){const i=(t+a)/2,r=(a-t)/s,o=e.angle+r*n,c=e.x+(Math.abs(r)<1e-9?i*Math.cos(e.angle)*n:i/r*(Math.sin(o)-Math.sin(e.angle))),l=e.y+(Math.abs(r)<1e-9?i*Math.sin(e.angle)*n:-i/r*(Math.cos(o)-Math.cos(e.angle)));return{x:c,y:l,angle:o,distance:e.distance+Math.abs(i)*n,leftDistance:(e.leftDistance||0)+t*n,rightDistance:(e.rightDistance||0)+a*n}}function Ao(e,t,a,s){const n=Math.cos(a),i=Math.sin(a);let r=-1/0,o=1/0;for(const[c,l,u,p]of[[e,n,s.x,s.x+s.w],[t,i,s.y,s.y+s.h]]){if(Math.abs(l)<1e-10){if(c<u||c>p)return 1/0;continue}const y=(u-c)/l,h=(p-c)/l;r=Math.max(r,Math.min(y,h)),o=Math.min(o,Math.max(y,h))}return o>=Math.max(0,r)?Math.max(0,r):1/0}const Xe={x:4,y:1.2,w:.6,h:1.6};function en(e){const t=Math.cos(e.angle),a=Math.sin(e.angle),s=[];return t>1e-9&&s.push((8-e.x)/t),t<-1e-9&&s.push(-e.x/t),a>1e-9&&s.push((4-e.y)/a),a<-1e-9&&s.push(-e.y/a),Math.max(0,Math.min(...s.filter(n=>n>=0),Ao(e.x,e.y,e.angle,Xe))-.2)}function qo(e,t,a){const s=en(e),n=t.avoid&&s<.8,i=n?{...t,left:-.25,right:.25}:t,r=Co(e,i,a),o=.2,c=Math.max(Xe.x,Math.min(r.x,Xe.x+Xe.w)),l=Math.max(Xe.y,Math.min(r.y,Xe.y+Xe.h)),u=r.x<o||r.x>8-o||r.y<o||r.y>4-o||Math.hypot(r.x-c,r.y-l)<o;return{...u?e:r,collision:u,turning:n,actualLeft:i.left,actualRight:i.right}}const tn=1602176634e-28,an=89875517923e-1;function we(e){const t=(e.x2??.7)-(e.x1??-.7),a=(e.y2??0)-(e.y1??0),s=Math.hypot(t,a);if(s<.1)throw new RangeError("Charges must remain separated by 0.1 m");const n=an*e.q1*1e-9*e.q2*1e-9/(s*s);return{distance:s,force:Math.abs(n),fx:n*t/s,fy:n*a/s,attract:n<0,total:e.q1+e.q2}}function sn(e){const t=e.x??.7,a=e.y??.4,s=Math.hypot(t,a);if(s<.1)throw new RangeError("Probe too near source");const n=an*(e.charge??2)*1e-9/(s*s);return{ex:n*t/s,ey:n*a/s,magnitude:Math.abs(n),force:n*(e.test??1)*1e-9}}function Io({protons:e=3,neutrons:t=4,electrons:a=3}){return{protons:e,neutrons:t,electrons:a,charge:e-a,reservoir:a-e,coulombs:(e-a)*tn}}function Eo({electrons:e=0}){return{a:e,b:-e,total:0}}function Ro(e){const t=e.zinc!==!1&&e.copper!==!1&&e.solution!==!1&&e.bridge!==!1,a=e.wire!==!1,s=t&&a?1.1/(e.resistance||100):0;return{valid:t,current:s,voltage:t&&e.meter!==!1?1.1:null,sustained:t&&a,oxidation:"Zn → Zn²⁺ + 2e⁻",reduction:"Cu²⁺ + 2e⁻ → Cu"}}function nn(e,t=25){if(!Number.isFinite(e)||!Number.isFinite(t)||t<=0||e<0||e>t)throw new RangeError("Invalid checkpoint score");return e/t>=.9?3:e/t>=.7?2:e/t>=.5?1:0}function Qt(e,t){if(e==="distance")return{force:we({q1:1,q2:1,x1:0,x2:t,y1:0,y2:0}).force*1e9,ratio:1/t**2};if(e==="atom")return{charge:10-t};if(e==="circuit"){const a={components:[{id:"source",type:"battery",voltage:3},{id:"lamp",type:"resistor",resistance:30},{id:"contact",type:"switch",closed:!!t.closed&&t.material==="copper"}],wires:[["source:a","contact:a"],["contact:b","lamp:a"],["lamp:b","source:b"]]};return{current:ot(a.components,a.wires).current}}throw new Error("Unknown experiment")}function Ct(e,t){if(t==null)return!1;if(e.type==="simulation"){if(!t.measured)return!1;const a=t.value;return e.simulation==="distance"?Number.isFinite(a)&&Math.abs(Qt("distance",a).ratio-.25)<1e-8:e.simulation==="atom"?Number.isInteger(a)&&Qt("atom",a).charge===-2:Qt("circuit",a).current>0}if(e.type==="number"){if(String(t).trim()==="")return!1;const a=Number(String(t).replace(",","."));return Number.isFinite(a)&&a===e.answer}return t===e.answer}function Lo(e){const t=St.map(n=>({id:n.id,topic:n.topic,answered:e[n.id]!==void 0,correct:Ct(n,e[n.id])})),a=t.filter(n=>n.correct).length,s=Object.entries(Yt).map(([n,i])=>{const r=t.filter(o=>o.topic===n);return{id:n,title:i,earned:r.filter(o=>o.correct).length,possible:r.length}});return{earned:a,possible:25,percent:a*4,stars:nn(a),results:t,concepts:s,weak:s.filter(n=>n.earned<n.possible).map(n=>n.id)}}const To=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Pt(e){const t={bolt:'<path d="m14 2-9 12h7l-2 8 9-12h-7z"/>',battery:'<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M9 3h6M8 13h3m3-2v4m-2-2h4"/>',atom:'<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1"/>',switch:'<path d="M2 16h5m10 0h5M7 16l10-8"/><circle cx="7" cy="16" r="2"/><circle cx="17" cy="16" r="2"/>',lamp:'<path d="M8 16a7 7 0 1 1 8 0v3H8zm1 6h6m-4-5-2-6m4 6 2-6"/>',meter:'<rect x="3" y="2" width="18" height="20" rx="4"/><path d="M7 7h10M7 11h10m-2 5-3 3-3-3"/>',circuit:'<path d="M8 5H3v14h5m8 0h5V5h-5"/><rect x="8" y="2" width="8" height="6" rx="1"/><circle cx="12" cy="18" r="4"/>',motion:'<path d="M2 16h4m-2-5h3m1 5V8h10l3 8z"/><circle cx="10" cy="18" r="2"/><circle cx="19" cy="18" r="2"/>',force:'<path d="M3 19h18M5 18 17 5l4 13M3 6h8m-3-3 3 3-3 3"/>',check:'<path d="m5 12 5 5L20 6"/>',lock:'<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',star:'<path d="m12 2 3 6 7 1-5 5 1 8-6-3-6 3 1-8-5-5 7-1z"/>'};return`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${t[e]||t.bolt}</svg>`}function Bo(e){return/atom|electrification|field|charges|transport/.test(e)?"atom":/source|galvanic|cell|electrolyte|anode/.test(e)?"battery":/switch|open-closed/.test(e)?"switch":/lamp|led|light/.test(e)?"lamp":/meter|current|voltage|ohm|resistance/.test(e)?"meter":/motion|pendulum|acceleration/.test(e)?"motion":/force|incline/.test(e)?"force":"circuit"}function Fo(e,{open:t,best:a,current:s}){return`<button class="lesson-node" data-${t?"module":"locked"}="${e.id}" aria-label="${To(e.title)}․ ${t?a>=2?"Ավարտված դաս":"Հասանելի դաս":e.playable?"Փակ դաս":"Նախապատրաստվող դաս"}" ${t?"":'aria-disabled="true"'}>${Pt(a>=2?"check":Bo(e.id))}${t?"":`<span class="node-lock">${Pt("lock")}</span>`}</button>`}const Vo=e=>`<div class="earned-stars" aria-label="${e} աստղ՝ 3-ից">${[1,2,3].map(t=>`<span class="${t<=e?"earned":""}" aria-hidden="true">${Pt("star")}</span>`).join("")}</div>`,vs={charge:"Բացահայտիր լիցքը, դաշտը և հոսանքի սկիզբը։",cell:"Հավաքիր և հետազոտիր էներգիայի աղբյուրը։",circuit:"Կապիր տարրերը և ստեղծիր աշխատող շղթա։",quantities:"Չափիր հոսանքն ու լարումը և գտիր կապը։",connections:"Համեմատիր միացումների տարբեր կառուցվածքներ։","electric-energy":"Պարզիր՝ ինչպես է էներգիան փոխակերպվում։",electronics:"Կառուցիր քո առաջին էլեկտրոնային փորձը։",main:"Կանխատեսիր, փորձարկիր և բացատրիր։"},on=(e,t)=>{if(!Number.isFinite(e)||!Number.isFinite(t)||!(t>0)||e<0||e>t)throw new RangeError("Invalid assessment points");if(t===3)return e===3?3:e===2?2:e===1?1:0;const a=e/t;return a>=.9?3:a>=.7?2:a>=.5?1:0};function No(e,t){e.learning||={version:1,selectedTopic:null,lessons:{},unlocked:[]};const a=e.learning;a.lessons||={},a.unlocked||=[],(a.version||1)<3&&(a.legacyAccess=[...a.unlocked]),a.legacyAccess||=[];for(const s of t){const n=s.lessons.find(i=>i.playable);n&&!a.unlocked.includes(n.id)&&a.unlocked.push(n.id)}for(const[s,n]of Object.entries(e.electricLessons||{}))(n.stage>0||n.completed||e.currentLesson===s)&&!a.unlocked.includes(s)&&(a.unlocked.push(s),a.legacyAccess.push(s));e.assessment&&!a.lessons.motion&&xt(e,"motion",e.assessment.score,3,{legacy:!0},t);for(const s of t){const n=s.lessons.filter(i=>i.playable);for(let i=0;i<n.length-1;i++){const r=n[i],o=n[i+1];(a.lessons[r.id]?.bestStars||0)>=2&&Va(e,o.id)&&!a.unlocked.includes(o.id)&&a.unlocked.push(o.id)}}return a.version=3,a}function Va(e,t){return e.learning?.legacyAccess?.includes(t)?!0:t===ke?go.every(a=>(e.learning?.lessons[a]?.bestStars||0)>=2):t==="sources"?(e.learning?.lessons[ke]?.bestStars||0)>=2:!0}function We(e,t,a){const s=a.find(l=>l.lessons.some(u=>u.id===t&&u.playable));if(!s||!Va(e,t))return!1;if(e.learning?.legacyAccess?.includes(t))return!0;const n=s.lessons.filter(l=>l.playable),i=n.findIndex(l=>l.id===t);if(i===0)return!0;if(i<0)return!1;const r=n[i-1],c=(e.learning?.lessons?.[r.id]?.bestStars||0)>=2;return c&&e.learning&&!e.learning.unlocked.includes(t)&&e.learning.unlocked.push(t),c}function xt(e,t,a,s,n,i){const r=e.learning,o=t===ke?nn(a,s):on(a,s),c=i.find(h=>h.lessons.some(v=>v.id===t));if(!c)throw new Error("Unknown lesson: "+t);const l=r.lessons[t]||={lessonId:t,bestScore:0,bestStars:0,completedAt:null,lastAttemptAt:0,attemptCount:0,reviewStatus:"completed",attempts:[]},u={id:crypto.randomUUID(),created:Date.now(),earned:a,possible:s,stars:o,activities:n};l.attempts.push(u),l.attemptCount=l.attempts.length,l.lastAttemptAt=u.created,l.bestScore=Math.max(l.bestScore||0,a),l.bestStars=Math.max(l.bestStars||0,o),l.bestStars>=2&&!l.completedAt&&(l.completedAt=u.created),l.completedActivities=n;const p=c.lessons.filter(h=>h.playable),y=p.findIndex(h=>h.id===t);if(y>=0&&y<p.length-1){const h=p[y+1];l.bestStars>=2&&Va(e,h.id)&&!r.unlocked.includes(h.id)&&r.unlocked.push(h.id)}return u}function Ht(e,t,a){const s=a.find(o=>o.lessons.some(c=>c.id===t));if(!s)return null;const n=s.lessons.filter(o=>o.playable),i=n.findIndex(o=>o.id===t);if(i<0||i>=n.length-1)return null;const r=n[i+1];return r&&We(e,r.id,a)?r:null}const rt=Vo,Qe=(e,t)=>({id:e,title:t,playable:!0}),Te=(e,t)=>({id:e,title:t,playable:!1}),xs=[{id:"charge",title:"Լիցք, ատոմ և հոսանք",lessons:[["charges","Էլեկտրական լիցք","E01"],["atom","Ատոմի կառուցվածքը և էլեկտրոնները","E02"],["electrification","Էլեկտրականացում","E03"],["conductors","Հաղորդիչներ և մեկուսիչներ","E04"],["electric-field","Էլեկտրական դաշտ","E05"],["current-origin","Էլեկտրական հոսանքի առաջացումը","E06"],["charge-checkpoint","Լիցք, ատոմ և հոսանք․ ամփոփիչ ստուգում","Ամփոփում"]]},{id:"cell",title:"Գալվանական տարրեր և աղբյուրներ",lessons:[["sources","Էլեկտրական հոսանքի աղբյուրներ","E07"],["galvanic","Գալվանական տարրի կառուցվածքը","E08"],["electrolytes","Էլեկտրոդներ և էլեկտրոլիտ","E09"],["anode-cathode","Անոդ և կաթոդ","E10"],["charge-transport","Էլեկտրոնների և իոնների շարժումը","E11"],["cell-assembly","Գալվանական տարրի վիրտուալ հավաքում","E12"]]},{id:"circuit",title:"Մասերից՝ աշխատող շղթա",lessons:[["circuits","Էլեկտրական շղթայի հիմնական մասերը","E13"],["open-closed","Բաց և փակ շղթաներ","E14"],["circuit-parts","Մարտկոց, լամպ և անջատիչ","E14ա"],["switch-types","Անջատիչների տեսակները","E15"],["symbols","Շղթայի պայմանական նշանները","E16"],["wiring","Հաղորդալարեր և միացումներ","E17"],["first-circuit","Հավաքիր աշխատող շղթա","E18"]]},{id:"quantities",title:"Հոսանք, լարում և չափումներ",lessons:[["current","Էլեկտրական հոսանքի ուժ","E19"],["ammeter","Ամպերաչափ","E20"],["voltage","Էլեկտրական լարում","E21"],["voltmeter","Վոլտաչափ","E22"],["resistance","Դիմադրություն","E23"],["ohm","Օհմի օրենքը","E24"],["meters","Չափիր և բացատրի՛ր","E25"]]},{id:"connections",title:"Հաջորդական և զուգահեռ կապեր",lessons:[["series","Հաջորդական և զուգահեռ միացումներ","E26"],["parallel","Զուգահեռ միացում","E27"],["series-current","Հոսանքի ուժը հաջորդական շղթայում","E28",!1],["series-voltage","Լարումը հաջորդական շղթայում","E29",!1],["branch-current","Հոսանքի բաշխումը ճյուղերում","E30",!1],["equivalent-resistance","Համարժեք դիմադրություն","E31",!1],["compare-circuits","Համեմատիր երկու շղթա","E32",!1]]},{id:"electric-energy",title:"Էլեկտրական աշխատանք և էներգիա",lessons:[["electric-work","Հոսանքի աշխատանքը","E33",!1],["power","Էլեկտրական հզորություն","E34"],["electric-energy","Էլեկտրական էներգիա","E35",!1],["joule-heating","Հոսանքի ջերմային ազդեցությունը","E36",!1],["lamp-power","Լամպի հզորությունն ու լուսարձակումը","E37",!1],["energy-experiment","Վիրտուալ էներգետիկ փորձ","E38",!1]]},{id:"electronics",title:"Լրացուցիչ էլեկտրոնիկա",supplementary:!0,lessons:[["components","Ռեզիստորներ և էլեկտրոնային բաղադրիչներ","E39"],["led","Լուսադիոդներ","E40",!1],["diode","Դիոդի աշխատանքի սկզբունքը","E41",!1],["capacitor","Կոնդենսատոր","E42",!1],["transistor","Տրանզիստորի հիմունքները","E43",!1],["breadboard","Փորձասալ","E44",!1],["project","LED շղթայի կառուցում","E45"],["electronics-project","Պարզ էլեկտրոնային նախագիծ","E46",!1]]}],W=[{id:"electricity",title:"Էլեկտրականություն և էլեկտրոնիկա",description:"Լիցքի գաղափարից՝ քո առաջին չափված շղթան։",color:"green",art:"circuit",units:xs.map(e=>({id:e.id,title:e.title,supplementary:!!e.supplementary})),lessons:xs.flatMap(e=>e.lessons.map(([t,a,s,n=!0])=>({id:t,title:a,code:s,unit:e.id,playable:!0,classification:e.supplementary?"supplementary-electronics":"prerequisite-foundation",source:null})))},{id:"mechanics",title:"Մեխանիկա և շարժում",description:"Ճանապարհ, ժամանակ և շարժման օրինաչափություններ։",color:"blue",art:"motion",lessons:[Qe("motion","Շարժում և արագություն"),Qe("aerolab","Թռչող սարքերի լաբորատորիա"),Qe("pendulum","Ճոճանակի գաղտնիքները"),Qe("acceleration","Արագացում"),Te("free-fall","Ազատ անկում"),Te("velocity-graphs","Շարժման գրաֆիկների հետազոտություն")]},{id:"forces",title:"Ուժեր և շարժման օրենքներ",description:"Պարզենք՝ ինչու են մարմինները սկսում շարժվել։",color:"orange",art:"force",lessons:[Qe("forces-intro","Ուժ և Նյուտոնի երկրորդ օրենքը"),Qe("incline","Թեք հարթություն և շփում"),Te("friction","Շփման ուժ")]},{id:"energy",title:"Աշխատանք և էներգիա",description:"Հետազոտենք էներգիայի փոխակերպումները։",color:"yellow",art:"energy",lessons:[Te("energy-intro","Աշխատանք և էներգիա")]},{id:"heat",title:"Ջերմային երևույթներ",description:"Ինչպե՞ս են մարմինները տաքանում ու սառչում։",color:"orange",art:"heat",lessons:[Te("heat-intro","Ջերմություն և ջերմաստիճան")]},{id:"waves",title:"Ալիքներ և ձայն",description:"Տեսնենք ձայնի տատանումներն ու ալիքները։",color:"blue",art:"waves",lessons:[Te("waves-intro","Ձայնի ալիքներ")]},{id:"light",title:"Լույս և օպտիկա",description:"Հետևենք ճառագայթների ճանապարհին։",color:"yellow",art:"light",lessons:[Te("light-intro","Լույս և անդրադարձում")]},{id:"magnetism",title:"Մագնիսականություն",description:"Բացահայտենք մագնիսների անտեսանելի ազդեցությունը։",color:"green",art:"magnet",lessons:[Te("magnet-intro","Մագնիսական դաշտ")]},{id:"electromagnetism",title:"Էլեկտրամագնիսական երևույթներ",description:"Կապենք շարժումը, մագնիսն ու էլեկտրականությունը։",color:"blue",art:"coil",lessons:[Te("induction","Էլեկտրամագնիսական ինդուկցիա")]},{id:"robotics",title:"Ռոբոտաշինության ֆիզիկա",description:"Սենսորի չափումից՝ խելացի արձագանք։",color:"green",art:"robot",lessons:[Qe("sensors","Սենսորներ և ռոբոտաշինություն")]}];function Po(e){const t={circuit:'<path d="M37 56V23H139V76H37V56"/><rect x="23" y="39" width="28" height="34" rx="5" fill="#5b8866"/><path d="M32 45h10m-5-5v10" stroke="white"/><path d="M107 28c-21 0-22 23-9 32v10h18V60c13-9 12-32-9-32Z" fill="#ffe8a1"/><path d="M99 75h16"/>',motion:'<path d="M12 76H155m-130-7h20m9 0h20m9 0h20"/><rect x="56" y="27" width="61" height="39" rx="13" fill="#d5e8ec"/><circle cx="69" cy="69" r="9" fill="#557789"/><circle cx="108" cy="69" r="9" fill="#557789"/><path d="M17 39h27m-21 12h21"/>',force:'<rect x="65" y="36" width="42" height="38" rx="4" fill="#edcaa5"/><path d="M12 55h45m-10-9 10 9-10 9M113 55h37m-9-9 9 9-9 9M22 81h123"/>',energy:'<path d="M24 77H144M45 75V50m0-10V14m-8 11 8-11 8 11"/><rect x="84" y="26" width="38" height="35" rx="6" fill="#efdc9d"/><path d="M103 62v14m-8-10 8 10 8-10"/>',heat:'<path d="M66 55V22a10 10 0 0 1 20 0v33a19 19 0 1 1-20 0Z" fill="#f4d9c9"/><path d="M76 32v34" stroke="#c87953" stroke-width="7"/><circle cx="76" cy="70" r="9" fill="#c87953"/><path d="M103 24h13m-13 13h9m-9 13h13"/>',waves:'<path d="M10 50Q25 3 40 50T70 50T100 50T130 50T160 50" stroke="#6694a8" stroke-width="5"/><path d="M17 80h126" opacity=".3"/>',light:'<path d="M21 18 81 66l60-48" stroke="#d2a346" stroke-width="5"/><path d="M50 77h65" stroke="#648898" stroke-width="7"/><path d="M83 77V15" stroke-dasharray="4 5"/>',magnet:'<path d="M48 22v34a30 30 0 0 0 60 0V22" stroke="#88a8ac" stroke-width="22"/><path d="M48 20v18" stroke="#d68a69" stroke-width="22"/><path d="M108 20v18" stroke="#6b97b4" stroke-width="22"/>',coil:'<path d="M16 53H36m91 0h25"/><path d="M36 53q0-55 15-35t0 56q0 20 15-1t0-55q0-20 15 0t0 55q0 20 15 0t0-55q0-20 15 0t0 55q0 20 15-20" stroke="#bc9369" stroke-width="5"/>',robot:'<rect x="50" y="20" width="65" height="47" rx="15" fill="#ece7d7"/><rect x="59" y="31" width="47" height="24" rx="9" fill="#53625f"/><circle cx="72" cy="42" r="4" fill="#edc778"/><circle cx="93" cy="42" r="4" fill="#edc778"/><path d="M83 20v-9m-21 64v13m41-13v13"/>'};return`<svg viewBox="0 0 170 100" aria-hidden="true" fill="none" stroke="#587174" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${t[e]||t.circuit}</svg>`}const Go=""+new URL("celebration-transparent-BXXDyihK.webm",import.meta.url).href,Ho=""+new URL("celebration-transparent-poster-DOHVav0s.png",import.meta.url).href,Do=""+new URL("celebration-transparent-idle-B_uxERcw.png",import.meta.url).href,Uo=""+new URL("celebration-transparent-animated-XSRtRwSa.webp",import.meta.url).href,jo=""+new URL("confused-transparent-BkcWg7WE.webm",import.meta.url).href,Zo=""+new URL("confused-transparent-poster-BBy_o0ys.png",import.meta.url).href,zo=""+new URL("confused-transparent-idle-B9uI3wbE.png",import.meta.url).href,Wo=""+new URL("confused-transparent-animated-CWqPe6X3.webp",import.meta.url).href,Ko=""+new URL("eureka-transparent-D7qAStzA.webm",import.meta.url).href,Yo=""+new URL("eureka-transparent-poster-DAVdHLwP.png",import.meta.url).href,Qo=""+new URL("eureka-transparent-idle-DnnPfzOw.png",import.meta.url).href,Xo=""+new URL("eureka-transparent-animated-TiM75mEy.webp",import.meta.url).href,_o=""+new URL("idle-primary-transparent-yf546e_I.webm",import.meta.url).href,Oo=""+new URL("idle-primary-transparent-poster-DnbjWpJT.png",import.meta.url).href,Jo=""+new URL("idle-primary-transparent-idle-BnteYx7f.png",import.meta.url).href,er=""+new URL("idle-primary-transparent-animated-D8sBmzkQ.webp",import.meta.url).href,tr=""+new URL("idle-secondary-transparent-8OL-IhwW.webm",import.meta.url).href,ar=""+new URL("idle-secondary-transparent-poster-BxEdmClj.png",import.meta.url).href,sr=""+new URL("idle-secondary-transparent-idle-pUBvBxIN.png",import.meta.url).href,nr=""+new URL("idle-secondary-transparent-animated-BdMCC-UA.webp",import.meta.url).href,ir=""+new URL("point-left-transparent-DRvXxpQY.webm",import.meta.url).href,or=""+new URL("point-left-transparent-poster-CxL512gI.png",import.meta.url).href,rr=""+new URL("point-left-transparent-idle-ChYaZdls.png",import.meta.url).href,lr=""+new URL("point-left-transparent-animated-BOV85oHI.webp",import.meta.url).href,cr=""+new URL("point-right-transparent-BLHk0DCQ.webm",import.meta.url).href,dr=""+new URL("point-right-transparent-poster-BttPZL0y.png",import.meta.url).href,pr=""+new URL("point-right-transparent-idle-CfWI1Y_u.png",import.meta.url).href,ur=""+new URL("point-right-transparent-animated-CNqv1AxC.webp",import.meta.url).href,hr=""+new URL("success-answer-transparent-Cdb-TtkL.webm",import.meta.url).href,fr=""+new URL("success-answer-transparent-poster-7zI1u_ux.png",import.meta.url).href,mr=""+new URL("success-answer-transparent-idle-D23eEHDE.png",import.meta.url).href,gr=""+new URL("success-answer-transparent-animated-Dto8p3KZ.webp",import.meta.url).href,br=""+new URL("success-complete-transparent-BkPAaoNT.webm",import.meta.url).href,yr=""+new URL("success-complete-transparent-poster-DSndgU5l.png",import.meta.url).href,vr=""+new URL("success-complete-transparent-idle-VgHrtGz6.png",import.meta.url).href,xr=""+new URL("success-complete-transparent-animated-D0z9H-zh.webp",import.meta.url).href,$r=""+new URL("greeting-transparent-Cm95Cj3e.webm",import.meta.url).href,wr=""+new URL("greeting-transparent-poster-Cpj8SFgU.png",import.meta.url).href,kr=""+new URL("greeting-transparent-idle-CphfJk-F.png",import.meta.url).href,Mr=""+new URL("greeting-transparent-animated-BvqxPiZP.webp",import.meta.url).href,Sr=""+new URL("thinking-transparent-21dOxml2.webm",import.meta.url).href,Cr=""+new URL("thinking-transparent-poster-Bz5TM5t6.png",import.meta.url).href,Ar=""+new URL("thinking-transparent-idle-CNHf9HPT.png",import.meta.url).href,bt=Object.freeze({celebration:{src:Go,poster:Ho,idle:Do,alpha:!0,imageFallback:Uo,next:"idle",duration:1},confused:{src:jo,poster:Zo,idle:zo,alpha:!0,imageFallback:Wo,next:"thinking",duration:2.5},eureka:{src:Ko,poster:Yo,idle:Qo,alpha:!0,imageFallback:Xo,next:"thinking",duration:2},"point-left":{src:ir,poster:or,idle:rr,alpha:!0,imageFallback:lr,next:"idle",duration:2.25},"point-right":{src:cr,poster:dr,idle:pr,alpha:!0,imageFallback:ur,next:"idle",duration:2.5},"success-answer":{src:hr,poster:fr,idle:mr,alpha:!0,imageFallback:gr,next:"idle",duration:2.125},"success-complete":{src:br,poster:yr,idle:vr,alpha:!0,imageFallback:xr,next:"idle-secondary",duration:2.75},idle:{src:_o,poster:Oo,idle:Jo,alpha:!0,loop:!0,imageFallback:er},"idle-secondary":{src:tr,poster:ar,idle:sr,alpha:!0,loop:!0,imageFallback:nr},greeting:{src:$r,poster:wr,idle:kr,alpha:!0,imageFallback:Mr,next:"idle",duration:5.5},thinking:{src:Sr,poster:Cr,idle:Ar,alpha:!0,loop:!0}});let Na=!1;function rn(){return Na}function qr(){return Na}function Ir(){Na=!0}const wa=new Set;function ln(e,t){if(e==="greeting")return qr();if(bt[e]?.loop)return!1;const a=`physics-mascot:${e}:${t}`;try{return wa.has(a)||sessionStorage.getItem(a)==="played"}catch{return wa.has(a)}}function $s(e,t){if(bt[e]?.loop)return;if(e==="greeting"){Ir();return}const a=`physics-mascot:${e}:${t}`;wa.add(a);try{sessionStorage.setItem(a,"played")}catch{}}function $t(e,t,a=e){const s=bt[e]?e:"idle",n=bt[s],i=n.src&&ln(s,a)?n.idle:n.poster,r=s==="greeting"?"Դիտել ռոբոտի ողջույնը":s==="thinking"?"Դիտել մտածող ռոբոտին":"Դիտել ռոբոտի շարժումը";return`<div class="companion video-companion" data-mascot-state="${s}" data-transparent="${!!n.alpha}" data-mascot-event="${a}"><div class="mascot-media" role="img" aria-label="Քո հետազոտական ընկերը՝ ռոբոտը"><img class="mascot-poster" src="${i}" alt="Քո հետազոտական ընկերը՝ ռոբոտը" width="1080" height="1920">${n.src?'<video class="mascot-video" muted playsinline preload="none" width="1080" height="1920" aria-hidden="true" tabindex="-1" disablepictureinpicture disableremoteplayback></video>':""}</div><p class="companion-caption">${t}</p><button class="text-button mascot-play" type="button" hidden>${r}</button><p class="mascot-status" role="status"></p></div>`}const dt=new Map;function Er(e){for(const[t,a]of dt)e.contains(t)||(a(),dt.delete(t));for(const t of e.querySelectorAll("[data-mascot-state]"))dt.has(t)||dt.set(t,pn(t));return()=>{for(const[t,a]of dt)t.isConnected||(a(),dt.delete(t))}}function cn(e,t){const a=e.querySelector(".mascot-media"),s=a?.querySelector(".mascot-hold")||(e.dataset.phase==="playing"?a?.querySelector("video"):a?.querySelector(".mascot-poster"));if(!s)return;const n=s.videoWidth||s.naturalWidth||s.width,i=s.videoHeight||s.naturalHeight||s.height;if(!n||!i)return;const r=document.createElement("canvas");r.width=n,r.height=i,r.className="mascot-hold",r.setAttribute("aria-hidden","true");try{r.getContext("2d").drawImage(s,0,0,n,i)}catch{return}t.querySelector(".mascot-media").append(r),t.dataset.holding="true"}function je(e){delete e.dataset.holding,e.querySelector(".mascot-hold")?.remove()}function dn(e,t){const a=e.nodeType===1&&t.nodeType===1&&e.tagName===t.tagName;if(a&&e.matches("[data-mascot-state]")&&t.matches("[data-mascot-state]")){const i=e.dataset.mascotState;if(i===t.dataset.mascotState&&(bt[i]?.loop||e.dataset.mascotEvent===t.dataset.mascotEvent)||i==="greeting"&&e.dataset.phase==="playing"&&t.dataset.mascotEvent===e.dataset.mascotEvent){e.querySelector(".companion-caption").textContent=t.querySelector(".companion-caption").textContent;return}cn(e,t),e.replaceWith(t);return}if(!a||!e.querySelector?.("[data-mascot-state]")||!t.querySelector?.("[data-mascot-state]")){e.replaceWith(t);return}for(const i of[...e.attributes])t.hasAttribute(i.name)||e.removeAttribute(i.name);for(const i of t.attributes)e.setAttribute(i.name,i.value);const s=[...e.childNodes],n=[...t.childNodes];for(let i=0;i<Math.max(s.length,n.length);i++)n[i]?s[i]?dn(s[i],n[i]):e.append(n[i]):s[i].remove()}function pn(e){const t=e.querySelector("video");if(!t||e.getClientRects().length===0)return()=>{};const a=e.querySelector(".mascot-poster"),s=e.dataset.mascotState,n=e.dataset.mascotEvent,i=bt[s],r=()=>ln(s,n),o=s==="greeting"?"Ողջույնի տեսանյութն այս պահին հասանելի չէ։":"Ռոբոտի տեսանյութն այս պահին հասանելի չէ։",c=e.querySelector(".mascot-play"),l=e.querySelector(".mascot-status"),u=matchMedia("(prefers-reduced-motion: reduce)"),p=new AbortController;let y=!1,h=!1,v=!1,g=!1,m=()=>{},d,f=!1,x;const b=(L,E,T)=>L.addEventListener(E,T,{signal:p.signal}),w=()=>!y&&e.isConnected,$=new Image;$.src=i.idle,t.muted=!0,t.defaultMuted=!0,t.loop=!!i.loop;function k(){if(!w()||u.matches||f||!i.next)return;f=!0,t.pause(),p.abort();const L=document.createElement("div");L.innerHTML=$t(i.next,e.querySelector(".companion-caption").textContent,n+":presence");const E=L.firstElementChild;cn(e,E),e.replaceChildren(...E.childNodes),E.dataset.holding&&(e.dataset.holding="true"),e.dataset.mascotState=i.next,e.dataset.mascotEvent=E.dataset.mascotEvent,delete e.dataset.phase,m=pn(e)}function M(L=""){if(w()){if(t.pause(),x!=null&&t.cancelVideoFrameCallback?.(x),L&&i.imageFallback&&!u.matches){if(g)return;g=!0,e.dataset.phase="image-playing",c.hidden=!0,l.textContent="",a.onload=()=>{w()&&!u.matches&&(je(e),$s(s,n),i.next&&(d=setTimeout(k,(i.duration+.7)*1e3)))},a.onerror=()=>{w()&&(a.onerror=null,a.src=i.poster,e.dataset.phase="poster",l.textContent=o)},a.src=i.imageFallback;return}e.dataset.phase="poster",a.complete&&a.naturalWidth?je(e):a.addEventListener("load",()=>{w()&&je(e)},{once:!0,signal:p.signal}),c.hidden=!0,l.textContent=L}}async function q(){if(w()){a.src=i.idle;try{await a.decode()}catch{return}w()&&(e.dataset.phase="idle",i.next&&(d=setTimeout(k,700)))}}async function I(){if(!(!w()||h||u.matches)){h=!0,c.hidden=!0,l.textContent="",t.getAttribute("src")||(t.src=i.src);try{if(await t.play(),!w()||u.matches||v){t.pause();return}const L=()=>{!w()||u.matches||v||g||($s(s,n),e.dataset.phase="playing",je(e))};t.requestVideoFrameCallback?x=t.requestVideoFrameCallback(L):L()}catch(L){if(!w()||g)return;e.dataset.phase="poster",L.name==="NotAllowedError"?(a.complete&&a.naturalWidth?je(e):a.addEventListener("load",()=>{w()&&je(e)},{once:!0,signal:p.signal}),c.hidden=!1,l.textContent="Անիմացիան կարող ես դիտել կոճակով։"):L.name!=="AbortError"&&M(o)}finally{h=!1}}}return i.alpha&&b(t,"loadeddata",()=>{const L=document.createElement("canvas");L.width=L.height=1;const E=L.getContext("2d");try{E.drawImage(t,0,0,1,1,0,0,1,1),E.getImageData(0,0,1,1).data[3]!==0&&(v=!0,M("Այս բրաուզերում ցուցադրվում է ռոբոտի անշարժ տարբերակը։"))}catch{}}),i.loop||b(t,"ended",q),b(t,"error",()=>M(o)),b(c,"click",I),b(u,"change",()=>{u.matches?(M(),a.src=r()?i.idle:i.poster):r()||I()}),r()&&i.next&&!u.matches?k():r()?(a.src=i.idle,e.dataset.phase="idle",a.complete&&a.naturalWidth?je(e):a.addEventListener("load",()=>{w()&&je(e)},{once:!0,signal:p.signal})):u.matches?M():I(),()=>{y=!0,clearTimeout(d),m(),p.abort(),a.onload=a.onerror=null,x!=null&&t.cancelVideoFrameCallback?.(x),t.pause()}}const Ie=Object.freeze({INTRODUCING:"INTRODUCING",ASKING:"ASKING",WAITING:"WAITING",HINTING:"HINTING",CORRECT:"CORRECT",INCORRECT:"INCORRECT",EXPLAINING:"EXPLAINING",EXPERIMENTING:"EXPERIMENTING",REVIEWING:"REVIEWING",COMPLETED:"COMPLETED"});function Rr(e){switch(e){case"INTRODUCING":case Ie.INTRODUCING:return"greeting";case"ASKING":case Ie.ASKING:return"point-right";case"WAITING":case Ie.WAITING:return"thinking";case"HINTING":case Ie.HINTING:return"point-left";case"CORRECT":case Ie.CORRECT:return"success-answer";case"INCORRECT":case Ie.INCORRECT:return"confused";case"EXPLAINING":case Ie.EXPLAINING:return"eureka";case"EXPERIMENTING":case Ie.EXPERIMENTING:return"thinking";case"REVIEWING":case Ie.REVIEWING:return"confused";case"COMPLETED":case Ie.COMPLETED:return"success-complete";default:return e||"thinking"}}function un(e,t="thinking",a=t){const s=Rr(t);return`<div class="guide-turn" data-teacher-state="${t}">${$t(s,"",a)}<div class="robot-dialogue" aria-label="Ռոբոտի խոսքը"><span class="robot-speaker">Քո գիտական ընկերը</span>${e}</div></div>`}function Le(e,t,a,s="thinking"){const n=document.createElement("template");n.innerHTML=e;const i=n.content.firstElementChild,r=document.createElement("div");for(const l of[":scope > .eyebrow",":scope > h2",":scope > p:not(.feedback)"]){const u=i.querySelector(l);u&&r.append(u)}const o=i.querySelector(":scope > .lesson-feedback-dock, :scope > .lesson-action-dock");o&&o.remove();const c=i.querySelector(":scope > .feedback:not(:empty)");return c&&(c.classList.add("robot-response"),r.append(c)),`<section class="guide-lesson question-layout"><div class="lesson-stage-main">${un(r.innerHTML,s,t)}<div class="student-work story">${i.innerHTML}</div></div>${o?o.outerHTML:""}</section>`}const wt=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function Lr(e,t,a){const s=()=>{const p=e();return p.checkpoints||={},p.checkpoints[ke]||={started:!1,machine:Ts(),drafts:{},practice:{}}},n=()=>{t(),a()};function i(p,y,h){const v=y.drafts[h],g=y.machine.phase==="FEEDBACK"?'disabled aria-disabled="true"':"",m=y.machine.phase==="FEEDBACK";if(p.type==="choice")return`<div class="activity-choices" role="radiogroup" aria-label="Պատասխանի տարբերակներ">${p.options.map((x,b)=>{const w=v===b,$=m&&Ct(p,b),k=m&&w&&!Ct(p,b),M=m&&!w&&!Ct(p,b),q=["answer",w?"selected":"",$?"is-correct":"",k?"is-incorrect":"",M?"is-neutral":""].filter(Boolean).join(" ");let I='<span class="answer-indicator radio-dot" aria-hidden="true"></span>';return $?I='<span class="answer-indicator icon-check" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg></span><span class="sr-only"> (Ճիշտ պատասխան)</span>':k&&(I='<span class="answer-indicator icon-cross" aria-hidden="true"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg></span><span class="sr-only"> (Քո սխալ պատասխանը)</span>'),`<button type="button" role="radio" class="${q}" data-checkpoint-answer="${b}" data-shortcut="${b+1}" aria-checked="${w}" aria-pressed="${w}" ${g}><span class="answer-badge" aria-hidden="true">${b+1}</span><span class="answer-text">${wt(x)}</span>${I}</button>`}).join("")}</div>`;if(p.type==="number")return`<label class="field-label" for="checkpoint-number">Պատասխան (${p.unit})</label><input id="checkpoint-number" inputmode="decimal" type="text" value="${wt(v??"")}" ${g}>`;const d=v?.value??(p.simulation==="atom"?10:p.simulation==="distance"?1:{closed:!1,material:"plastic"}),f=Qt(p.simulation,d);return p.simulation==="distance"?`<div class="checkpoint-lab"><div class="charge-scene" aria-label="Երկու դրական լիցք"><span>⊕</span><span style="margin-left:${d*35}px">⊕</span></div><label for="checkpoint-slider">Հեռավորություն՝ <output>${d} մ</output></label><input id="checkpoint-slider" type="range" min="0.5" max="3" step="0.25" value="${d}" ${g}><p>Ուժ՝ ${f.force.toFixed(3)} նՆ · սկզբնականի ${f.ratio.toFixed(3)} մասը</p><p>q₁ = q₂ = +1 նԿլ · F = k|q₁q₂| / r²</p></div>`:p.simulation==="atom"?`<div class="checkpoint-lab"><div class="atom-visual">Միջուկ՝ +10e <span>Էլեկտրոններ՝ ${d} × −e</span></div><label for="checkpoint-slider">Էլեկտրոնների թիվ՝ ${d}</label><input id="checkpoint-slider" type="range" min="6" max="14" step="1" value="${d}" ${g}><p>Ընդհանուր լիցք՝ ${f.charge>0?"+":""}${f.charge}e</p></div>`:`<div class="checkpoint-lab"><svg viewBox="0 0 400 130" role="img" aria-label="Մարտկոց, անջատիչ, նմուշ և լամպ՝ հաջորդական շղթայում"><path d="M40 65V20H180M220 20H350V110H40V65" fill="none" stroke="#58634D" stroke-width="4"/><path d="M180 20L220 ${d.closed?20:0}" stroke="#58634D" stroke-width="4"/><path d="M25 55H55M30 70H50" stroke="#262724" stroke-width="4"/><circle cx="350" cy="65" r="19" fill="${f.current?"#D8BB74":"#fff"}" stroke="#58634D"/><text x="60" y="75" font-size="14">3 Վ</text><text x="130" y="100" font-size="14">30 Օմ</text></svg><label for="checkpoint-material">Նմուշի նյութ</label><select id="checkpoint-material" ${g}><option value="plastic" ${d.material==="plastic"?"selected":""}>Չոր պլաստիկ</option><option value="copper" ${d.material==="copper"?"selected":""}>Պղինձ</option></select><button id="checkpoint-switch" class="button secondary" ${g}>${d.closed?"Բացել անջատիչը":"Փակել անջատիչը"}</button><p>Հոսանք՝ ${f.current.toFixed(2)} Ա · լամպը ${f.current?"վառվում է":"չի վառվում"}</p></div>`}function r(){const p=s(),y=p.machine;let h;if(!p.started)h='<h2>Պատրա՞ստ ես միացնել քո բացահայտումները։</h2><p>Քեզ սպասում է 25 առաջադրանք՝ նկարներ, փորձեր, հաշվարկներ և առօրյա իրավիճակներ։ Ամեն պատասխանից հետո կբացատրեմ միտքը, վերջում միասին կկրկնենք սխալները։ Յուրաքանչյուր սկզբնական առաջադրանքը՝ 1 միավոր։ Կրկնությունը չի փոխում գնահատականը։</p><p>0–49%՝ 0 աստղ · 50–69%՝ 1 · 70–89%՝ 2 · 90–100%՝ 3։ Հաջորդ բաժնի համար պետք է առնվազն 2 աստղ։ 25 հարցից դա առնվազն 18 ճիշտ պատասխան է։</p><button class="button lesson-primary" id="checkpoint-start">Սկսել ստուգումը</button>';else if(y.phase==="COMPLETED"){const v=p.result,g=Ht(e(),ke,W),m=v.stars>=2?(g?`<button class="button lesson-primary" data-module="${g.id}">Հաջորդ դասը →</button>`:"")+'<button class="text-button" id="checkpoint-retry">Կրկնել ստուգումը</button><button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>':'<button class="button lesson-primary" id="checkpoint-retry">Կրկին փորձել</button><button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>';h=`<h2>${v.stars>=2?"Քո գիտելիքները ճանապարհ են բացում։":"Գիտենք՝ ինչն է պետք ամրապնդել։"}</h2><p>Պաշտոնական արդյունք՝ ${v.earned} / 25 · ${v.percent}%։ Կրկնության ընթացքում ուղղել ես ${y.corrected.length} սխալ։ Լավագույն արդյունք՝ ${e().learning.lessons[ke]?.bestStars||0} աստղ։</p>${rt(v.stars)}<div class="concept-results">${v.concepts.map(d=>`<p>${d.title}՝ ${d.earned} / ${d.possible}</p>`).join("")}</div><h3>Առաջարկվող կրկնություն</h3>${v.weak.length?v.weak.map(d=>`<button class="text-button" data-checkpoint-practice="${d}">${Yt[d]} · վարժություն</button> <button class="text-button" data-module="${d}">Վերադառնալ դասին</button>`).join("<br>"):"<p>Բոլոր թեմաների սկզբնական հարցերին ճիշտ ես պատասխանել։</p>"}${p.practiceTopic?c(p):""}<details><summary>Իմ պատասխաններն ու բացատրությունները</summary>${St.map((d,f)=>`<div class="assessment-review"><strong>${f+1}. ${d.prompt}</strong><p>${v.results[f].correct?"Ճիշտ":"Կրկնելու կարիք կա"} · Քո պատասխանը՝ ${wt(o(d,y.original[f]?.response))}</p><p>${d.why}</p></div>`).join("")}</details>${y.unresolved.length?`<p>Կրկնության ${y.unresolved.length} առաջադրանք դեռ դժվարություն առաջացրեց։ Վերը նշված վարժություններն ու դասերը կօգնեն։</p>`:""}${m}<p>Նախորդ փորձերն ու լավագույն գնահատականը պահպանվում են։</p>`}else{const v=Oe(y),g=St[v],m=y.phase==="MISTAKE_REVIEW"||y.feedback?.reviewing,d=m?{...ma[g.topic],type:"choice",id:g.id,topic:g.topic}:g,x=y.phase==="FEEDBACK"?`
  <div class="lesson-feedback-dock assessment-feedback ${y.feedback.correct?"correct":"incorrect"}" role="status" aria-live="polite">
   <div class="feedback-dock-inner">
    <div class="feedback-dock-info">
     <div class="feedback-status-row">
      <span class="feedback-badge ${y.feedback.correct?"correct":"incorrect"}" aria-hidden="true">${y.feedback.correct?"✓":"✕"}</span>
      <strong class="feedback-heading ${y.feedback.correct?"correct":"incorrect"}">${y.feedback.correct?"Ճիշտ է":"Դեռ ճիշտ չէ"}</strong>
     </div>
     <div class="feedback-explanation">
      <p class="feedback-scientific">${wt(d.why)}</p>
     </div>
    </div>
    <div class="feedback-dock-actions">
     <button class="button lesson-primary ${y.feedback.correct?"":"danger"}" id="checkpoint-continue">Շարունակել</button>
    </div>
   </div>
  </div>`:`
  <div class="lesson-feedback-dock idle" role="region" aria-label="Ստուգման գործողություններ">
   <div class="feedback-dock-inner">
    <div class="feedback-dock-info"></div>
    <div class="feedback-dock-actions">
     <button class="button lesson-primary" id="checkpoint-check" ${p.drafts[v]===void 0||p.drafts[v]===""?"disabled":""}>${d.type==="simulation"?"Գրանցել և ստուգել փորձը":"Ստուգել"}</button>
    </div>
   </div>
  </div>`;h=`<h2>${d.prompt}</h2><p class="task-counter">${m?"Սխալների կրկնություն":`Առաջադրանք ${v+1} / 25`} · ${Yt[d.topic]}${m?" · պաշտոնական գնահատականը չի փոխվում":""}</p>${d.visual?`<div class="checkpoint-visual" role="img" aria-label="${wt(d.visual)}">${d.visual}</div>`:""}${i(d,p,v)}${x}`}return`<div class="lesson-top"><button class="text-button" data-page="path">← Ուսումնական ուղի</button><span>Ամփոփում · 25 առաջադրանք</span></div><div class="lesson-context"><h1>Լիցք, ատոմ և հոսանք․ ամփոփիչ ստուգում</h1></div><div class="lesson-track" role="progressbar" aria-label="Ստուգման ընթացքը" aria-valuemin="0" aria-valuemax="25" aria-valuenow="${Math.min(25,y.index)}"><span style="width:${y.index*4}%"></span></div><section class="lesson-content">${Le(`<div class="story">${h}</div>`,`checkpoint:${y.phase}:${Oe(y)}`,"",y.phase==="COMPLETED"?"success-complete":y.feedback?y.feedback.correct?"success-answer":"confused":"thinking")}</section>`}function o(p,y){return y===void 0?"Պատասխան չկա":p.type==="choice"?p.options[y]??"Պատասխան չկա":p.type==="simulation"?typeof y.value=="object"?`${y.value.material==="copper"?"Պղինձ":"Պլաստիկ"} · ${y.value.closed?"փակ":"բաց"}`:`${y.value} ${p.simulation==="distance"?"մ":"էլեկտրոն"}`:`${y} ${p.unit||""}`}function c(p){const y=ma[p.practiceTopic],h=p.practice[p.practiceTopic];return`<section class="checkpoint-practice"><h3>${y.prompt}</h3>${y.options.map((v,g)=>`<button class="answer ${h?.answer===g?"selected":""}" data-practice-answer="${g}" ${h?.submitted?"disabled":""}>${v}</button>`).join("")}${h?.submitted?`<p role="status">${h.answer===y.answer?"Ճիշտ է։":"Եկ ևս ամրապնդենք։"} ${y.why}</p><button class="text-button" id="practice-again">Նորից փորձել</button>`:`<button class="button" id="practice-check" ${h?.answer===void 0?"disabled":""}>Ստուգել</button>`}</section>`}function l(p){if(p.completed)return;const y=Object.fromEntries(p.machine.original.map(h=>[St[h.index].id,h.response]));p.result=Lo(y),p.completed=Date.now(),p.lastResult=xt(e(),ke,p.result.earned,25,{questions:p.result.results,original:structuredClone(p.machine.original),concepts:p.result.concepts,corrected:p.machine.corrected,unresolved:p.machine.unresolved},W),e().notes||=[],e().notes.push({id:crypto.randomUUID(),created:Date.now(),lessonId:ke,lessonTitle:"Լիցք, ատոմ և հոսանք․ ամփոփում",conclusion:`${p.result.earned}/25 · ${p.result.stars} աստղ`,observation:`Կրկնությամբ ուղղված սխալներ՝ ${p.machine.corrected.length}`,explanation:p.result.weak.map(h=>Yt[h]).join(" · ")})}function u(p){const y=s(),h=y.machine,v=Oe(h),g=(b,w)=>p.querySelector(b)?.addEventListener("click",w);g("#checkpoint-start",()=>{y.started=!0,n()}),p.querySelectorAll("[data-checkpoint-answer]").forEach(b=>b.onclick=()=>{y.drafts[v]=Number(b.dataset.checkpointAnswer),n()});const m=p.querySelector("#checkpoint-number");m&&(m.oninput=b=>{y.drafts[v]=b.target.value,t(),p.querySelector("#checkpoint-check").disabled=b.target.value.trim()===""});const d=b=>{y.drafts[v]={value:b,measured:!0},n()},f=p.querySelector("#checkpoint-slider");f&&(f.oninput=b=>d(Number(b.target.value)));const x=p.querySelector("#checkpoint-material");return x&&(x.onchange=b=>d({...y.drafts[v]?.value||{closed:!1},material:b.target.value})),g("#checkpoint-switch",()=>{const b=y.drafts[v]?.value||{closed:!1,material:"plastic"};d({...b,closed:!b.closed})}),g("#checkpoint-check",()=>{if(h.phase==="FEEDBACK")return;const b=p.querySelector("#checkpoint-check");b&&(b.disabled=!0);const w=St[v],$=h.phase==="MISTAKE_REVIEW",k=$?{...ma[w.topic],type:"choice"}:w;Bs(h,y.drafts[v],Ct(k,y.drafts[v]))&&n(),requestAnimationFrame(()=>{p.querySelector("#checkpoint-continue")?.focus()})}),g("#checkpoint-continue",()=>{Fs(h,25)&&(h.phase==="MISTAKE_REVIEW"&&delete y.drafts[Oe(h)],h.phase==="COMPLETED"&&l(y),n())}),g("#checkpoint-retry",()=>{const b=e();b.checkpointArchives||=[],b.checkpointArchives.push(structuredClone(y)),delete b.checkpoints[ke],s().started=!0,n()}),p.querySelectorAll("[data-checkpoint-practice]").forEach(b=>b.onclick=()=>{y.practiceTopic=b.dataset.checkpointPractice,n()}),p.querySelectorAll("[data-practice-answer]").forEach(b=>b.onclick=()=>{y.practice[y.practiceTopic]={answer:Number(b.dataset.practiceAnswer)},n()}),g("#practice-check",()=>{y.practice[y.practiceTopic].submitted=!0,n()}),g("#practice-again",()=>{delete y.practice[y.practiceTopic],n()}),()=>{}}return{view:r,bind:u,key:()=>`checkpoint:${s().machine.phase}:${Oe(s().machine)}`,open(){e().currentLesson=ke,s(),t()}}}const ge=e=>Number(e.toPrecision(3)).toLocaleString("hy-AM");function Tr(e,t){const a=we(e),s=t?we(t):null;return{current:a,previous:s,sameCharges:!!t&&e.q1===t.q1&&e.q2===t.q2,forceRatio:s?.force?a.force/s.force:null,distanceRatio:s?a.distance/s.distance:null}}function Br(e,t){return`<div class="charge-tools"><div class="charge-presets" role="group" aria-label="Լիցքերի նշանները"><button class="charge-preset" data-charge-preset="opposite">+ − <span>Տարանուն</span></button><button class="charge-preset" data-charge-preset="positive">+ + <span>Նույնանուն</span></button><button class="charge-preset" data-charge-preset="negative">− − <span>Երկու բացասական</span></button></div><label class="charge-distance" for="charge-distance"><span>Գնդիկների հեռավորությունը <strong id="charge-distance-label">${ge(we(e).distance)} մ</strong></span><input id="charge-distance" type="range" min="0.4" max="2.8" step="0.1" value="${we(e).distance}"><span class="charge-range"><span>0,4 մ · մոտ</span><span>2,8 մ · հեռու</span></span></label><div class="charge-shortcuts"><button class="text-button" id="charge-double">Հեռավորությունը ×2</button><button class="text-button" id="charge-half">Հեռավորությունը ÷2</button><button class="text-button" id="charge-reference">Պահել համեմատության համար</button></div><div id="charge-evidence">${hn(e,t.reference)}</div></div>`}function hn(e,t){const{current:a,previous:s,sameCharges:n,forceRatio:i,distanceRatio:r}=Tr(e,t);return s?`<div class="charge-comparison"><div><span>Պահված չափում</span><strong>${ge(s.force*1e9)} նՆ</strong><small>r = ${ge(s.distance)} մ · q₁ = ${ge(t.q1)} նԿլ · q₂ = ${ge(t.q2)} նԿլ</small></div><span class="charge-compare-arrow" aria-hidden="true">→</span><div><span>Հիմա</span><strong>${ge(a.force*1e9)} նՆ</strong><small>r = ${ge(a.distance)} մ · q₁ = ${ge(e.q1)} նԿլ · q₂ = ${ge(e.q2)} նԿլ</small></div></div><p class="charge-conclusion" role="status">${n?i==null?"Պահված ուժը զրո է․ ուժերի հարաբերություն չենք հաշվում։":`Նույն լիցքերով՝ հեռավորությունը ×${ge(r)}, ուժը ×${ge(i)}։`:"Լիցքերն էլ են փոխվել։ Միայն հեռավորության ազդեցությունը ստուգելու համար դրանք պահիր նույնը։"}</p>`:'<p class="charge-comparison-empty">Պահիր մի չափում, հետո փոխիր մեկ պայման և համեմատիր։</p>'}function Fr(e,t){const a=320+(e.x1??-.7)*150,s=180-(e.y1??0)*150,n=320+(e.x2??.7)*150,i=180-(e.y2??0)*150,r=t.force===0?"Փոխազդեցության ուժը զրո է":t.attract?"Ձգում են իրար":"Վանում են իրար",o=t.force>0?[[a,s,-1],[n,i,1]].map(([c,l,u])=>{const p=Math.min(85,35+15*Math.log1p(t.force*1e9)),y=u*t.fx/t.force*p,h=-u*t.fy/t.force*p;return`<path d="M${c} ${l+48}l${y} ${h}" stroke="#5a7250" stroke-width="4" stroke-linecap="round" marker-end="url(#science-force-head)"/>`}).join(""):"";return`<defs><pattern id="charge-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#e6ebe5" stroke-width="1"/></pattern><radialGradient id="charge-positive" cx="32%" cy="26%"><stop stop-color="#fff0da"/><stop offset=".55" stop-color="#e3ae78"/><stop offset="1" stop-color="#bd784c"/></radialGradient><radialGradient id="charge-negative" cx="32%" cy="26%"><stop stop-color="#edf5f3"/><stop offset=".55" stop-color="#a3c4ba"/><stop offset="1" stop-color="#628c7b"/></radialGradient></defs><rect x="28" y="35" width="584" height="260" rx="12" fill="url(#charge-grid)"/><text x="320" y="32" text-anchor="middle" fill="#354a3c" font-size="20" font-weight="700">${r}</text><path d="M${a} ${s}L${n} ${i}" stroke="#adb9ac" stroke-dasharray="4 6" stroke-width="2"/>${[[a,s,e.q1,"charge1","Ա"],[n,i,e.q2,"charge2","Բ"]].map(([c,l,u,p,y])=>`<ellipse cx="${c}" cy="${l+36}" rx="28" ry="5" fill="#243c2b" opacity=".07"/><circle cx="${c}" cy="${l}" r="32" fill="${u===0?"#dce2d5":`url(#charge-${u>0?"positive":"negative"})`}" stroke="${u>0?"#ae7047":"#55796c"}" stroke-width="2"/><text x="${c}" y="${l+10}" text-anchor="middle" fill="#263b2e" font-size="30" font-weight="700">${u>0?"+":u<0?"−":"0"}</text><text x="${c}" y="${l-48}" text-anchor="middle" fill="#334a3c" font-size="17">${y} · ${u>0?"+":""}${ge(u)} նԿլ</text><circle data-direct="${p}" cx="${c}" cy="${l}" r="43" fill="transparent" tabindex="0" role="button" aria-label="${y} գնդիկ․ քաշիր կամ տեղափոխիր սլաքներով"/>`).join("")}${o}<rect x="246" y="280" width="148" height="27" rx="8" fill="#fff"/><text x="320" y="300" text-anchor="middle" fill="#354a3c" font-size="18">r = ${ge(t.distance)} մ</text><text x="320" y="334" text-anchor="middle" fill="#354a3c" font-size="17">Ուժը՝ ${ge(t.force*1e9)} նՆ · սլաքները՝ ուղղությունը</text>`}function ws({x:e=0,y:t=0,width:a=144,height:s=190,solution:n=null,label:i=""}){return`<g transform="translate(${e} ${t})"><ellipse cy="${s+4}" cx="${a/2}" rx="${a*.48}" ry="7" fill="#344659" opacity=".08"/>${n?`<path d="M4 ${s*.38}H${a-4}V${s-9}Q${a-4} ${s-2} ${a-14} ${s-2}H14Q4 ${s-2} 4 ${s-9}Z" fill="${n}" opacity=".6"/><ellipse cx="${a/2}" cy="${s*.38}" rx="${a/2-4}" ry="7" fill="${n}" opacity=".5"/>`:""}<path d="M0 0V${s-12}Q0 ${s} 14 ${s}H${a-14}Q${a} ${s} ${a} ${s-12}V0" fill="#ecf6ff" fill-opacity=".15" stroke="#8ca8ba" stroke-width="2.5"/><ellipse cx="${a/2}" rx="${a/2}" ry="8" fill="#f6fbff" fill-opacity=".3" stroke="#9bb1c1" stroke-width="2.5"/><path d="M8 12V${s-18}" stroke="#fff" stroke-opacity=".9" stroke-width="5"/>${[.3,.5,.7,.9].map(r=>`<path d="M${a-23} ${s*r}h16" stroke="#99b4c4" stroke-width="2"/>`).join("")}<text x="${a/2}" y="${s-25}" text-anchor="middle" font-size="17" fill="#35566c">${i}</text></g>`}function ks({x:e,y:t,height:a=155,metal:s="Zn"}){const n=s==="Cu";return`<g transform="translate(${e} ${t})"><path d="M-14 0H10L14 5V${a}H-14Z" fill="${n?"#c87e52":"#a9b5bf"}" stroke="${n?"#a36543":"#82929e"}" stroke-width="1.5"/><path d="M-9 7v${a-17}" stroke="${n?"#efbd92":"#e4ebf0"}" stroke-width="3"/><circle cy="12" r="4" fill="#f4f8fa" stroke="${n?"#a36543":"#82929e"}"/></g>`}function Vr(){return'<path d="M235 210V153Q235 137 250 137H388Q405 137 405 153V210" fill="none" stroke="#8fa7b7" stroke-width="20"/><path d="M235 210V153Q235 137 250 137H388Q405 137 405 153V210" fill="none" stroke="#edf4f6" stroke-width="15"/><path d="M231 203V154Q231 133 251 133H386" fill="none" stroke="white" stroke-opacity=".7" stroke-width="3"/>'}function Nr(e){return`<rect x="60" y="35" width="440" height="205" rx="15" fill="#f8f8f2" stroke="#c6cdd0" stroke-width="3"/><path d="M75 49H485" stroke="#dc6668" stroke-width="2"/><path d="M75 57H485" stroke="#5e9ec5" stroke-width="2"/><path d="M75 219H485" stroke="#dc6668" stroke-width="2"/><path d="M75 227H485" stroke="#5e9ec5" stroke-width="2"/><path d="M77 141H483" stroke="#d8dce0" stroke-width="10"/>${Array.from({length:8},(t,a)=>Array.from({length:5},(s,n)=>`<circle cx="${105+a*47}" cy="${76+n*12}" r="3.4" fill="#63737d"/><circle cx="${105+a*47}" cy="${165+n*10}" r="3.4" fill="#63737d"/>`).join("")).join("")}<path d="M105 76V124" stroke="#e99826" stroke-width="7" opacity=".6"/><circle cx="105" cy="76" r="7" fill="none" stroke="#d87f22" stroke-width="3"/><circle cx="${e?105:152}" cy="${e?124:195}" r="7" fill="none" stroke="#2082b8" stroke-width="3"/><text x="280" y="267" text-anchor="middle" font-size="16" fill="#425c6a">${e?"Նույն հնգյակը՝ կապ կա":"Տարբեր հնգյակներ՝ կապ չկա"}</text>`}function tt(e="part"){return`<defs><linearGradient id="${e}-metal" x2="1" y2="0"><stop stop-color="#c9d1cc"/><stop offset=".45" stop-color="#f4f5ee"/><stop offset="1" stop-color="#9ba9a2"/></linearGradient><linearGradient id="${e}-body" x2="1" y2="0"><stop stop-color="#566376"/><stop offset=".5" stop-color="#343f52"/><stop offset="1" stop-color="#232c3c"/></linearGradient><linearGradient id="${e}-glass" x2="0" y2="1"><stop stop-color="#fffef5" stop-opacity=".85"/><stop offset="1" stop-color="#dfe6d7" stop-opacity=".8"/></linearGradient></defs>`}function ue(e,t="part",a=0){const s='<path d="M-60 0H-26M26 0H60" stroke="#889c95" stroke-width="4" stroke-linecap="round"/>',n='<ellipse cy="40" rx="39" ry="5" fill="#314939" opacity=".07"/>';if(["ammeter","voltmeter"].includes(e.type)){const i=e.type==="ammeter",r=e.reverseTerminals?30:-30,o=-r;return`${n}<path d="M-60 0H-52V37H-30M60 0H52V37H30" stroke="#8a9eac" stroke-width="4" fill="none" stroke-linejoin="round"/><rect x="-43" y="-53" width="86" height="104" rx="14" fill="${i?"#ffc13f":"#3caaed"}" stroke="${i?"#ca8d26":"#1f80b6"}" stroke-width="2"/><path d="M-38 35V-35Q-38-47-25-47H25" stroke="white" stroke-opacity=".55" stroke-width="3" fill="none"/><rect x="-36" y="-45" width="72" height="88" rx="10" fill="#29343d"/><rect x="-30" y="-37" width="60" height="29" rx="4" fill="#d7e5da" stroke="#91a49d"/><text y="-17" text-anchor="middle" font-family="monospace" font-size="${String(e.display??"—").length>7?8:15}" fill="#1b352d">${e.display??"—"}</text><text y="7" text-anchor="middle" font-size="13" fill="#f4f7fa">${i?"Ա":"Վ"} · ${e.range??(i?1:20)}</text><circle cy="23" r="11" fill="#586575" stroke="#161d26" stroke-width="2"/><path d="m-5 18 10 10" stroke="#adb9c5" stroke-width="3"/><circle cx="${r}" cy="37" r="5" fill="#e94d4f" stroke="#ffaba2"/><circle cx="${o}" cy="37" r="5" fill="#111a21" stroke="#8a9aa8"/>`}if(e.sample)return`${n}${s}<rect x="-34" y="-14" width="68" height="28" rx="5" fill="${e.closed?"#b79165":"#d6cbbb"}" stroke="#927a60"/><path d="M-28-5h56M-28 5h56" stroke="#f5ead8" opacity=".4"/>`;if(e.type==="battery"&&e.variant==="aa")return`${n}<path d="M-60 0H-34V-48H0M60 0H34V45H0" stroke="#899ba8" stroke-width="4" fill="none"/><rect x="-22" y="-42" width="44" height="84" rx="12" fill="url(#${t}-body)" stroke="#343c45" stroke-width="2"/><path d="M-22-30q0-12 10-12h24q10 0 10 12v10h-44Z" fill="#ffbc43"/><rect x="-9" y="-48" width="18" height="7" rx="3" fill="url(#${t}-metal)"/><path d="M-8-30H8M0-38v16" stroke="#454b4c" stroke-width="2"/><text y="10" text-anchor="middle" fill="white" font-size="13">${e.voltage??1.5} Վ</text><path d="M-6 30H6" stroke="#f4f7fa" stroke-width="2"/>`;if(e.type==="diode")return`${s}<rect x="-29" y="-14" width="58" height="28" rx="8" fill="#465365" stroke="#2e3e50"/><path d="M17-14v28" stroke="#d6e3ec" stroke-width="6"/><path d="M-21-9H8" stroke="white" stroke-opacity=".3" stroke-width="2"/>`;if(e.type==="battery")return`${n}<path d="M-60 0H-42V-49H-10M60 0H42V-46H12" fill="none" stroke="#889c95" stroke-width="4" stroke-linejoin="round"/><rect x="-28" y="-42" width="56" height="80" rx="7" fill="url(#${t}-body)" stroke="#425c4b"/><path d="M-28-31h56v17h-56Z" fill="#ffbc43"/><rect x="-16" y="-49" width="12" height="8" rx="2" fill="url(#${t}-metal)"/><rect x="7" y="-46" width="11" height="5" rx="1" fill="url(#${t}-metal)"/><path d="M-16-24h8m-4-4v8M9-24h8" stroke="#584e37" stroke-width="2"/><text y="13" text-anchor="middle" font-size="16" fill="#fff">${e.voltage??9} Վ</text><path d="M-22-11v39" stroke="#fff" stroke-opacity=".15" stroke-width="2"/>`;if(e.type==="lamp")return`${n}<path d="M-60 0H-42V22H-14M60 0H42V37H0" stroke="#889c95" stroke-width="4" fill="none" stroke-linejoin="round"/><ellipse cy="-9" rx="38" ry="38" fill="#ffc85e" opacity="${a*.2}"/><path d="M0-45c-31 0-32 31-13 44l2 13h22l2-13c19-13 18-44-13-44Z" fill="url(#${t}-glass)" stroke="#94a8b3" stroke-width="1.8"/><path d="M0-45c-31 0-32 31-13 44l2 13h22l2-13c19-13 18-44-13-44Z" fill="#ffdb75" opacity="${a*.72}"/><path d="M-20-22q-2-12 11-15" stroke="#fff" stroke-width="4" fill="none" opacity=".9"/><rect x="-14" y="13" width="28" height="17" rx="3" fill="url(#${t}-metal)" stroke="#91a0a6"/><path d="M-14 17h28m-28 6h28" stroke="#7b8b91"/><path d="M-7 31h14l-3 5h-8Z" fill="#e8edf0" stroke="#9caaae"/><ellipse cy="37" rx="6" ry="2" fill="#5d6b74"/><path d="M-14 22h5V-8l6-7 6 7 6-7V28L0 35" stroke="${a>.001?"#c87917":"#657580"}" stroke-width="2.2" fill="none"/><path d="M-9-8l6-7 6 7 6-7" stroke="#ffedb3" stroke-width="${a>0?3:0}" opacity="${a}" fill="none"/>`;if(e.type==="switch")return`${n}${s}<rect x="-43" y="-17" width="86" height="37" rx="7" fill="#edf0e6" stroke="#b8c5b5"/><path d="M-34 11h68" stroke="#d6decf"/><circle cx="-28" r="5" fill="#bba278"/><circle cx="28" r="5" fill="#bba278"/><g data-switch-lever transform="rotate(${e.closed?0:-28} -28 0)"><path d="M-28 0H28" stroke="#8e9c8e" stroke-width="5"/><rect x="-3" y="-6" width="28" height="12" rx="5" fill="#55775d"/></g>`;if(e.type==="resistor"){const i=e.resistance??1e3,r=["#323c36","#76513e","#b9654c","#d9954a","#d8bd67","#789469","#6e94b2","#8d77a8","#909c93","#f3f1e2"];let o=Math.floor(Math.log10(i))-1,c=Math.round(i/10**o);c>=100&&(c=10,o++);const l=o>=-2&&o<=9&&Math.abs(c*10**o-i)<1e-6,u=[r[Math.floor(c/10)],r[c%10],o===-1?"#b99c60":o===-2?"#9fa9a4":r[o]];return`${n}${s}<rect x="-35" y="-14" width="70" height="28" rx="12" fill="#e1cda7" stroke="#b39b77"/>${l?[-21,-9,3].map((p,y)=>`<path d="M${p}-13v26" stroke="${u[y]}" stroke-width="5"/>`).join("")+'<path d="M22-12v24" stroke="#be9c54" stroke-width="4"/>':`<text text-anchor="middle" y="4" font-size="10" fill="#665d47">${i} Ω</text>`}<path d="M-25-9h47" stroke="#fff" stroke-opacity=".35"/>${e.showLabel===!1?"":`<text text-anchor="middle" y="-22" font-size="13" fill="#4e626d">${i} Ω</text>`}`}return e.type==="led"?`<path d="M-60 0H-32V34H-7M60 0H32V40H7" fill="none" stroke="#91a199" stroke-width="3"/><path d="M-14 20V-5a14 14 0 0 1 28 0v25Z" fill="${a?"#f5b46c":"#d3ae91"}" stroke="#b78b68"/><path d="M-18 20h36M-7 20v14m14-14v20" stroke="#91a199" stroke-width="3"/><path d="M-9-4q0-9 7-10" stroke="white" opacity=".6" stroke-width="3"/>`:e.type==="capacitor"?`${n}<path d="M-60 0H-36V37H-10V28M60 0H36V42H10V28" fill="none" stroke="#899ba8" stroke-width="3"/><rect x="-22" y="-37" width="44" height="65" rx="9" fill="url(#${t}-body)"/><ellipse cy="-31" rx="20" ry="7" fill="url(#${t}-metal)"/><path d="M-8-31h16m-8-4v8M-15-15v32" stroke="#d1d9cf" stroke-width="2"/><text x="2" y="8" fill="white" font-size="14" text-anchor="middle">${e.capacitance??1e3}</text><text y="22" fill="white" font-size="9" text-anchor="middle">մկՖ</text>`:s}const fn=9.81;function Pr(e,t,a){const s=([l,u])=>[u,-fn/t*Math.sin(l)],n=[e.theta,e.omega],i=s(n),r=s(n.map((l,u)=>l+i[u]*a/2)),o=s(n.map((l,u)=>l+r[u]*a/2)),c=s(n.map((l,u)=>l+o[u]*a));return{theta:n[0]+a*(i[0]+2*r[0]+2*o[0]+c[0])/6,omega:n[1]+a*(i[1]+2*r[1]+2*o[1]+c[1])/6}}function Ms(e,t){const a=Math.sin(Math.abs(t)/2),s=400,n=Math.PI/2/s;let i=0;for(let r=0;r<=s;r++){const o=r*n,c=1/Math.sqrt(1-a*a*Math.sin(o)**2);i+=c*(r===0||r===s?1:r%2?4:2)}return 4*Math.sqrt(e/fn)*i*n/3}const _e=e=>Number(e.toFixed(2)).toLocaleString("hy-AM");function Gr(e){e.pendulum||={length:1,angle:20,theta:20*Math.PI/180,omega:0,time:0};const t=e.pendulum;return`<section class="pendulum-lab"><svg id="pendulum-scene" viewBox="0 0 600 360" aria-label="Ինտերակտիվ ճոճանակ"><defs><radialGradient id="bob-depth"><stop stop-color="#FFCD77"/><stop offset="1" stop-color="#D98B30"/></radialGradient></defs><path d="M300 50V325" stroke="#bfcdb8" stroke-dasharray="5 7"/><rect x="248" y="32" width="104" height="17" rx="6" fill="#718675"/><line id="pendulum-string" x1="300" y1="50" stroke="#52625a" stroke-width="4"/><circle id="pendulum-bob" r="23" fill="url(#bob-depth)" stroke="#b77530" stroke-width="2" tabindex="0" role="button" aria-label="Քաշիր բեռը կամ փոխիր անկյունը սլաքներով"/></svg><p>Քաշիր բեռը՝ սկզբնական անկյունն ընտրելու համար։ Սլաքները ևս փոխում են այն։</p><p id="pendulum-reading" class="electric-reading"></p><div class="experiment-sliders"><label class="experiment-slider">Երկարություն <strong id="pendulum-length-value">${_e(t.length)} մ</strong><input id="pendulum-length" type="range" min=".5" max="3" step=".1" value="${t.length}"></label><label class="experiment-slider">Սկզբնական անկյուն <strong id="pendulum-angle-value">${t.angle}°</strong><input id="pendulum-angle" type="range" min="-60" max="60" step="1" value="${t.angle}"></label></div><div class="circuit-tools"><button class="button secondary" id="pendulum-run">Սկսել</button><button class="text-button" id="pendulum-reset">Սկսել սկզբից</button><button class="text-button" id="measure-electric">Գրանցել համեմատության համար</button></div><p class="model-note">Իդեալական ճոճանակ՝ առանց շփման, g = 9.81 մ/վ²։ Լուծվում է θ″ = −(g/L) sin θ։ Փոքր անկյունների համար T ≈ 2π√(L/g), մեծ անկյունների դեպքում այս մոտարկումը բավարար չէ։</p><details><summary>Համեմատել պարբերությունները</summary><ol>${(e.experiments||[]).map(a=>`<li>${a.reading}</li>`).join("")}</ol></details></section>`}function Hr(e,t,a){const s=t.pendulum;let n,i=!1,r=0,o=!1;const c=e.querySelector("#pendulum-scene"),l=e.querySelector("#pendulum-bob");function u(){const v=s.length*75,g=300+Math.sin(s.theta)*v,m=50+Math.cos(s.theta)*v;l.setAttribute("cx",g),l.setAttribute("cy",m),e.querySelector("#pendulum-string").setAttribute("x2",g),e.querySelector("#pendulum-string").setAttribute("y2",m),e.querySelector("#pendulum-reading").textContent=`Ժամանակ՝ ${_e(s.time)} վ · Անկյուն՝ ${_e(s.theta*180/Math.PI)}° · Պարբերություն՝ ${_e(Ms(s.length,s.angle*Math.PI/180))} վ`,e.querySelector("#pendulum-run").textContent=i?"Դադարեցնել":s.time?"Շարունակել":"Սկսել"}function p(){i=!1,cancelAnimationFrame(n),s.theta=s.angle*Math.PI/180,s.omega=0,s.time=0,u(),a(null,!1)}function y(v){if(!i||document.hidden){i=!1,u();return}let g=Math.min(.1,(v-r)/1e3);for(r=v;g>1e-8;){const m=Math.min(.008333333333333333,g);Object.assign(s,Pr(s,s.length,m)),s.time+=m,g-=m}u(),n=requestAnimationFrame(y)}e.querySelector("#pendulum-run").onclick=()=>{i=!i,i?(r=performance.now(),n=requestAnimationFrame(y)):cancelAnimationFrame(n),u()},e.querySelector("#pendulum-reset").onclick=p,e.querySelector("#pendulum-length").oninput=v=>{s.length=Number(v.target.value),e.querySelector("#pendulum-length-value").textContent=_e(s.length)+" մ",p()},e.querySelector("#pendulum-angle").oninput=v=>{s.angle=Number(v.target.value),e.querySelector("#pendulum-angle-value").textContent=s.angle+"°",p()};const h=v=>{s.angle=Math.max(-60,Math.min(60,Math.round(v))),e.querySelector("#pendulum-angle").value=s.angle,e.querySelector("#pendulum-angle-value").textContent=s.angle+"°",p()};return l.onpointerdown=v=>{v.preventDefault(),o=!0,l.setPointerCapture(v.pointerId),p()},l.onpointermove=v=>{if(!o)return;const g=c.createSVGPoint();g.x=v.clientX,g.y=v.clientY;const m=g.matrixTransform(c.getScreenCTM().inverse());h(Math.atan2(m.x-300,m.y-50)*180/Math.PI)},l.onpointerup=l.onpointercancel=()=>{o=!1},l.onkeydown=v=>{["ArrowLeft","ArrowRight"].includes(v.key)&&(v.preventDefault(),h(s.angle+(v.key==="ArrowLeft"?-5:5)))},e.querySelector("#measure-electric").onclick=()=>a(`L = ${_e(s.length)} մ · θ₀ = ${s.angle}° · T = ${_e(Ms(s.length,s.angle*Math.PI/180))} վ`),u(),()=>{i=!1,cancelAnimationFrame(n)}}const Xt=(e,t)=>e.x+(t==="a"?-60:60)*(e.rotation===180?-1:1);function Se(e,t){if(Fa(t))return{...t,dir:0};if(typeof t!="string")return null;if(t.startsWith("j:")){const i=e.junctions?.find(r=>"j:"+r.id===t);return i?{x:i.x,y:i.y,dir:0}:null}const[a,s]=t.split(":"),n=e.components.find(i=>i.id===a);return n&&["a","b"].includes(s)?{x:Xt(n,s),y:n.y,dir:(s==="a"?-1:1)*(n.rotation===180?-1:1)}:null}function at(e,t){const a=e.x+(e.dir||0)*18,s=t.x+(t.dir||0)*18,n=Math.abs(e.y-t.y)<8?Math.min(286,Math.max(e.y,t.y)+95):(e.y+t.y)/2;return`M${e.x} ${e.y} H${a} V${n} H${s} V${t.y} H${t.x}`}function Dr(e,t,a){let s=null,n=26;for(const i of e.components)for(const r of["a","b"]){const o=i.id+":"+r,c=Se(e,o),l=Math.hypot(t.x-c.x,t.y-c.y);o!==a&&l<n&&(n=l,s=o)}for(const i of e.junctions||[]){const r="j:"+i.id,o=Math.hypot(t.x-i.x,t.y-i.y);r!==a&&o<n&&(n=o,s=r)}return s}function Ss(e,t,a,s){const n=Se(s,t),i=Se(s,a);if(e.reverseA||e.reverseV)return at(n,i);const r=`M${n.x} ${n.y}`;return t==="source:a"&&a==="amp:a"?e.ammeter==="series"?`${r} H12 V${i.y} H${i.x}`:`${r} V${i.y}`:t==="amp:b"&&a==="load:a"?`${r} H${i.x}`:t==="source:a"&&a==="load:a"?`${r} H12 V${i.y} H${i.x}`:t==="source:b"&&a==="amp:b"?`${r} V${i.y}`:t==="load:b"&&a==="source:b"?`${r} H550 V335 H${i.x} V${i.y}`:t==="load:b"&&a==="volt:a"?`${r} H550 V200 H${i.x} V${i.y}`:t==="volt:b"&&a==="source:b"?`${r} H550 V350 H${i.x} V${i.y}`:`${r} V${i.y} H${i.x}`}function Ur(e,t){if(!["open","closed"].includes(t.status))return t.status==="short"||t.status==="meter-short"?"Աղբյուրի երկու ելքերի միջև բեռ կա՞, թե ուղիղ միացում է ստացվել։ Փորձիր գտնել այդ ճանապարհը։":"Կապերի մեջ անհամապատասխանություն կա։ Ստուգիր ընտրված ելքերն ու տարրերը։";const a=e.components.find(n=>n.type==="lamp");if(a&&(t.powers[a.id]||0)>1e-12)return"Հիմա լամպով հոսանք է անցնում։ Կարո՞ղ ես երկու կոնտակտներով հետևել ամբողջ ճանապարհին։";const s=e.wires.flatMap(n=>Array.isArray(n)?n:[n.start,n.end]);return a&&["a","b"].some(n=>!s.includes(a.id+":"+n))?"Տեսնո՞ւմ ես լամպի չմիացված կոնտակտը։ Որտե՞ղ պետք է հասնի հաղորդալարը։":e.components.some(n=>n.type==="switch"&&!n.closed)?"Ի՞նչ է փոխվում, երբ անջատիչը բաց է։ Փնտրիր բացված կոնտակտների արանքը։":"Հետևիր ճանապարհին մի ելքից մյուսը։ Որտե՞ղ է կապը ընդհատվում։"}function mn(e){return JSON.stringify({components:e.components.map(({id:t,type:a,voltage:s,resistance:n,closed:i,range:r})=>({id:t,type:a,voltage:s,resistance:n,closed:i,range:r})),wires:e.wires.map(t=>(Array.isArray(t)?t:[t.start,t.end]).map(a=>typeof a=="string"?a:"free")),junctions:(e.junctions||[]).map(t=>t.id)})}function Et(e){return e.guidance?.key===mn(e)?Math.max(0,Math.min(4,e.guidance.level||0)):0}function jr(e){e.guidance={key:mn(e),level:Math.min(4,Et(e)+1)}}function Zr(e,t){const a=e.wires.map(n=>Array.isArray(n)?n:[n.start,n.end]),s=e.components.find(n=>n.type==="lamp");return t.status==="no-source"?["Որտեղի՞ց պետք է շղթան էներգիա ստանա։","Միայն լարերն ու բեռը բավարար չեն․ անհրաժեշտ է լարման աղբյուր։","Ավելացրու մարտկոց և գտիր նրա երկու տարբեր ելքերը։","Մարտկոցի երկու ելքերը բեռի երկու կոնտակտներին միացնելով կարող ես փակ ճանապարհ ստանալ։"]:["short","meter-short"].includes(t.status)?["Փնտրիր աղբյուրի ելքերը միացնող ամենակարճ ճանապարհը։","Այդ ճանապարհին հոսանքը սահմանափակող դիմադրություն կա՞։","Աղբյուրի ելքերը լարով կամ իդեալական ամպերաչափով անմիջապես միացնելը կարճ միացում է։","Հեռացրու ուղիղ կապը և ճանապարհի մեջ ներառիր լամպ կամ դիմադրիչ։ Ամպերաչափը միացվում է բեռի հետ հաջորդաբար։"]:["open","closed"].includes(t.status)?a.some(n=>n.some(i=>typeof i!="string"))?["Ուշադիր նայիր լարերի ծայրերին․ բոլո՞րն են կոնտակտի վրա։","Կոնտակտի մոտ գտնվող ազատ ծայրը դեռ էլեկտրական կապ չէ։","Ընտրիր այդ լարը, ապա քաշիր ազատ ծայրը դեպի նպատակային կոնտակտը։","Ծայրը կոնտակտի վրա թողնելիս կապը վերականգնվում է։ Հետո նորից ստուգիր լամպով անցնող ամբողջ ճանապարհը։"]:s&&(t.powers[s.id]||0)>1e-12?["Լամպը վառվում է․ ի՞նչ կփոխվի, եթե ճանապարհը ընդհատես։","Համեմատիր բաց և փակ անջատիչով չափումները՝ մարտկոցը չփոխելով։","Փակ ճանապարհով լամպի հոսանքը որոշվում է նրա լարման և դիմադրության հարաբերությամբ։","Այս մոդելում I = U/R, իսկ P = U × I։ Բաց ճանապարհով I = 0, հետևաբար լամպի հզորությունն էլ զրո է։"]:s&&["a","b"].some(n=>!a.some(i=>i.includes(`${s.id}:${n}`)))?["Լամպի երկու կոնտակտներն էլ կապ ունե՞ն։","Միայն մեկ կոնտակտով լամպով փակ ճանապարհ չի ստացվում։","Հետևիր մարտկոցի մի ելքից լամպի միջով դեպի մյուս ելքը գնացող ճանապարհին։","Լամպի յուրաքանչյուր կոնտակտ պետք է այդ փակ ճանապարհի մաս լինի։ Երկրորդ կոնտակտը նույնպես միացրու համապատասխան ելքին։"]:e.components.some(n=>n.type==="switch"&&!n.closed)?["Որտե՞ղ ես տեսնում կոնտակտների միջև բացվածք։","Բաց անջատիչը իր երկու կոնտակտները չի միացնում։","Փակիր անջատիչը և համեմատիր հոսանքի նոր ցուցումը նախորդի հետ։","Եթե մնացած կապերը փակ ճանապարհ են կազմում, անջատիչը փակելիս հոսանք կանցնի։ Եթե ոչ՝ փնտրիր մյուս ընդհատումը։"]:["Հետևիր աղբյուրի մի ելքից մյուսը գնացող ճանապարհին։","Լարերի խաչումը կապ չէ, եթե այնտեղ հանգույց չկա։","Լամպը կարող է չվառվել նաև այն դեպքում, երբ նրա երկու կոնտակտները նույն հանգույցին են միացված։","Ստուգիր լամպի երկու կոնտակտների լարման տարբերությունը։ Զրոյական լարման դեպքում այս մոդելում նրա հոսանքն ու հզորությունը զրո են։"]:["Ստուգիր՝ բոլոր կապերը գոյություն ունեցող կոնտակտների՞ն են հասնում։","Տարրը հեռացնելուց հետո նրա նախկին կոնտակտը չի կարող կապի մաս մնալ։","Վերանայիր փորձի դաշտում տարրերի և լարերի կապերը․ անվավեր կապի դեպքում հոսանք չենք հաշվարկում։","Հեռացրու անվավեր կապը և ընտրիր գոյություն ունեցող երկու կոնտակտ։ Եթե պետք է, վերականգնիր սկզբնական փորձը։"]}function ka(e,t){const a=Et(e);return a?Zr(e,t)[a-1]:Ur(e,t)}const jt={battery:"Մարտկոց",lamp:"Լամպ",switch:"Անջատիչ",resistor:"Դիմադրիչ",ammeter:"Ամպերաչափ",voltmeter:"Վոլտաչափ"};function la(){return{components:[{id:"battery",type:"battery",x:100,y:170,voltage:9},{id:"switch",type:"switch",x:280,y:80,closed:!1},{id:"lamp",type:"lamp",x:465,y:170,resistance:20}],wires:[],junctions:[]}}function Ma(e){Qs(e);const t=ot(e.components,e.wires,e.junctions),a=l=>Se(e,l),s=e.wires.map((l,u)=>{const[p,y]=Ft(l),h=a(p),v=a(y);return h&&v?`<g><path d="${at(h,v)}" fill="none" stroke="white" stroke-width="10" pointer-events="none"/><path data-wire="${u}" data-wire-id="${l.id}" d="${at(h,v)}" fill="none" stroke="${e.selectedWire===l.id?"#d98b24":"#3286b2"}" stroke-width="4" stroke-linejoin="round" tabindex="0" role="button" aria-label="Լար ${u+1}․ ընտրիր՝ միացումը փոխելու համար"/>${[h,v].map((g,m)=>Fa(m?y:p)?`<circle cx="${g.x}" cy="${g.y}" r="7" fill="white" stroke="#c46b39" stroke-width="3"/>`:"").join("")}</g>`:""}).join(""),n=e.wires.find(l=>l.id===e.selectedWire),i=n?["start","end"].map(l=>{const u=a(n[l]);return u?`<circle data-wire-end="${l}" cx="${u.x}" cy="${u.y}" r="13" fill="#fff5dd" stroke="#bc7623" stroke-width="3" tabindex="0" role="button" aria-label="Լարի ${l==="start"?"սկիզբը":"վերջը"}․ քաշիր կամ Delete-ով անջատիր"/>`:""}).join(""):"",r=e.junctions.map(l=>`<g><circle cx="${l.x}" cy="${l.y}" r="24" data-terminal="j:${l.id}" fill="transparent" tabindex="0" role="button" aria-label="Հաղորդիչ հանգույց"/><circle cx="${l.x}" cy="${l.y}" r="6" fill="#255d7e" stroke="white" stroke-width="2" pointer-events="none"/></g>`).join(""),o=e.components.map(l=>{const u=["open","closed"].includes(t.status)&&t.powers[l.id]||0,p=Math.min(1,u/4.05),y=t.meters?.[l.id],h=y==null?"—":Math.abs(y)>(l.range??(l.type==="ammeter"?1:20))?"Սահմանից դուրս":y.toLocaleString("hy-AM",{maximumSignificantDigits:5}),v=ue({...l,display:h},"bench",p);return`<g transform="translate(${l.x} ${l.y})" data-component="${l.id}" data-power="${u}" data-selected="${e.selected===l.id}" tabindex="0" role="button" aria-label="${jt[l.type]}․ տեղափոխիր սլաքներով"><g data-art="${l.id}" transform="rotate(${l.rotation||0})">${v}</g><text y="64" text-anchor="middle" font-size="20" fill="#52625a">${jt[l.type]}</text></g>${["a","b"].map(g=>{const m=a(l.id+":"+g);return`<circle cx="${m.x}" cy="${m.y}" r="24" fill="transparent" stroke="none" tabindex="0" role="button" data-terminal="${l.id}:${g}" aria-label="${jt[l.type]}․ ${g==="a"?"առաջին":"երկրորդ"} ելք"/><circle cx="${m.x}" cy="${m.y}" r="9" fill="white" stroke="#347A47" stroke-width="3" pointer-events="none" aria-hidden="true"/><text x="${m.x}" y="${m.y+25}" text-anchor="middle" font-size="12" fill="#466574" pointer-events="none">${l.type==="battery"||["ammeter","voltmeter"].includes(l.type)?g==="a"?"+":"−":g==="a"?"ա":"բ"}</text>`}).join("")}`}).join(""),c={invalid:"Կապերի տվյալները սխալ են․ ելքը կամ տարրի համարը գոյություն չունի։ Վերականգնիր կապը կամ սկսիր սկզբից։",closed:"Շղթան փակ է։ Աղբյուրից հոսանք է անցնում։",open:"Շղթան բաց է։ Ստուգիր երկու ելքերի կապերն ու անջատիչը։","meter-short":"Ամպերաչափը աղբյուրին զուգահեռ է՝ իդեալական կարճ միացում։ Տեղադրիր այն բեռի հետ հաջորդաբար։ Չափում չենք հորինում։",short:"Աղբյուրի ելքերը ուղղակի միացված են․ կարճ միացում է։ Չափում չի հաշվարկվում։",unsupported:"Այս կապակցման համար չափում չենք ցուցադրում։ Ստուգիր բեռի կապերը։","no-source":"Աղբյուրը բացակայում է․ սկսիր փորձը սկզբից։"}[t.status];return`<section class="circuit-workbench"><p class="experiment-instruction">Միացման համար ընտրիր երկու ելք։ Տարրերը կարող ես քաշել կամ տեղափոխել սլաքներով։</p><svg id="circuit-canvas" viewBox="0 0 560 320" aria-label="Վիրտուալ շղթայի հավաքիչ">${tt("bench")}${s}${o}${r}${i}</svg><div class="circuit-guidance"><strong>Ռոբոտի հուշումը</strong><p id="circuit-diagnostic" role="status" aria-live="polite" aria-atomic="true">${ka(e,t)}</p><button class="text-button" id="circuit-hint" ${Et(e)>=4?"disabled":""}>${Et(e)>=4?"Բացատրությունը բացված է":Et(e)?"Հաջորդ հուշումը":"Մի փոքր հուշում"}</button></div><p id="circuit-status" role="status">${c}${["open","closed"].includes(t.status)?` Հոսանքի ուժը՝ ${Number(t.current.toFixed(3)).toLocaleString("hy-AM")} Ա։`:""}</p><div class="circuit-tools"><button class="button secondary" id="circuit-switch"${e.components.some(l=>l.type==="switch")?"":" disabled"}>${e.components.find(l=>l.type==="switch")?.closed?"Բացել":"Փակել"} անջատիչը</button><button class="text-button" id="wire-undo" ${e.wires.length?"":"disabled"}>Հետարկել վերջին լարը</button><button class="text-button" id="circuit-reset">Սկսել սկզբից</button></div><button class="button secondary" id="measure-electric" ${["open","closed"].includes(t.status)?"":"disabled"}>Գրանցել չափումը</button><p class="model-note">${e.components.find(l=>l.type==="battery")?.voltage??"—"} Վ իդեալական աղբյուր․ ${e.components.filter(l=>["lamp","resistor"].includes(l.type)).map(l=>`${jt[l.type]}՝ ${l.resistance} Օմ`).join("․ ")}։ Իդեալական ամպերաչափը՝ զրոյական, վոլտաչափը՝ անվերջ դիմադրությամբ։ Մարտկոցի և չափիչների բևեռները նշված են + և −։ Լամպի կոնտակտները բևեռայնություն չունեն։ Լարերի խաչումը միացում չէ․ հաղորդիչ հանգույցը նշվում է կետով։ Սա վիրտուալ փորձ է։</p></section>`}function gn(e,t,a){const s=e.querySelector("#circuit-canvas");if(!s)return;const n=e.querySelector(".circuit-guidance"),i=e.querySelector(".robot-dialogue");n&&i&&i.append(n),n&&(e.querySelector("#circuit-diagnostic").textContent=ka(t,ot(t.components,t.wires,t.junctions))),Qs(t);let r=null,o=null,c=null,l=null,u=null;const p=m=>{const d=s.createSVGPoint();return d.x=m.clientX,d.y=m.clientY,d.matrixTransform(s.getScreenCTM().inverse())},y=m=>{if(u){const{wire:f,end:x}=u,b=m.dataset.terminal;if(b===f[x==="start"?"end":"start"]){e.querySelector("#circuit-status").textContent="Ընտրիր լարի մյուս ծայրից տարբեր ելք։";return}f[x]=b,u=null,a();return}if(!r){r=m.dataset.terminal,m.classList.add("terminal-pending"),e.querySelector("#circuit-status").textContent="Հիմա ընտրիր լարի մյուս ելքը։";return}const d=m.dataset.terminal;r!==d&&!t.wires.some(f=>{const[x,b]=Ft(f);return x===r&&b===d||b===r&&x===d})&&t.wires.push({id:crypto.randomUUID(),start:r,end:d}),r=null,a()};e.querySelectorAll("[data-terminal]").forEach(m=>{m.onclick=()=>y(m),m.onpointerdown=d=>{c={terminal:m.dataset.terminal,x:d.clientX,y:d.clientY},m.setPointerCapture(d.pointerId)},m.onkeydown=d=>{["Enter"," "].includes(d.key)&&(d.preventDefault(),y(m))}});function h(m){const d=c?.terminal||r;if(!d)return;const f=Se(t,d);if(!f)return;let x=s.querySelector("#wire-preview");x||(x=document.createElementNS("http://www.w3.org/2000/svg","path"),x.id="wire-preview",x.setAttribute("fill","none"),x.setAttribute("stroke","#F5A447"),x.setAttribute("stroke-width","4"),x.setAttribute("pointer-events","none"),s.append(x));const b=p(m);x.setAttribute("d",`M${f.x} ${f.y} L${b.x} ${b.y}`)}s.addEventListener("pointermove",h),s.addEventListener("pointerup",m=>{if(!c)return;const d=c;if(c=null,Math.hypot(m.clientX-d.x,m.clientY-d.y)<5)return;const f=p(m);let x=null,b=1/0;e.querySelectorAll("[data-terminal]").forEach(w=>{const $=Math.hypot(Number(w.getAttribute("cx"))-f.x,Number(w.getAttribute("cy"))-f.y);$<b&&w.dataset.terminal!==d.terminal&&(b=$,x=w)}),x&&b<=35?(r=d.terminal,y(x)):s.querySelector("#wire-preview")?.remove()}),s.addEventListener("pointercancel",()=>{c=null,s.querySelector("#wire-preview")?.remove()}),e.querySelectorAll("[data-component]").forEach(m=>{m.onpointerdown=d=>{d.preventDefault();const f=t.components.find(b=>b.id===m.dataset.component),x=p(d);t.selected=f.id,e.querySelectorAll("[data-component]").forEach(b=>b.dataset.selected=String(b===m)),o={c:f,dx:x.x-f.x,dy:x.y-f.y},m.setPointerCapture(d.pointerId)},m.onpointermove=d=>{if(!o||o.c.id!==m.dataset.component)return;const f=p(d);o.c.x=Math.max(95,Math.min(465,f.x-o.dx)),o.c.y=Math.max(55,Math.min(240,f.y-o.dy)),m.setAttribute("transform",`translate(${o.c.x} ${o.c.y})`);for(const x of["a","b"]){const b=e.querySelector(`[data-terminal="${o.c.id}:${x}"]`);b.setAttribute("cx",Xt(o.c,x)),b.setAttribute("cy",o.c.y),b.nextElementSibling.setAttribute("cx",Xt(o.c,x)),b.nextElementSibling.setAttribute("cy",o.c.y),b.nextElementSibling.nextElementSibling.setAttribute("x",Xt(o.c,x)),b.nextElementSibling.nextElementSibling.setAttribute("y",o.c.y+25)}t.wires.forEach((x,b)=>{const[w,$]=Ft(x),k=Se(t,w),M=Se(t,$);if(k&&M){const q=e.querySelector(`[data-wire="${b}"]`);q?.setAttribute("d",at(k,M)),q?.previousElementSibling.setAttribute("d",at(k,M))}})},m.onpointerup=()=>{if(o){const d=o.c;d.x=Math.round(d.x/10)*10,d.y=Math.round(d.y/10)*10,o=null,a(d.id)}},m.onpointercancel=()=>{o=null,a()},m.onkeydown=d=>{if(d.key==="Enter"){d.preventDefault(),t.selected=m.dataset.component,a(m.dataset.component);return}const f={ArrowLeft:[-10,0],ArrowRight:[10,0],ArrowUp:[0,-10],ArrowDown:[0,10]};if(!f[d.key])return;d.preventDefault();const x=t.components.find(b=>b.id===m.dataset.component);x.x=Math.max(95,Math.min(465,x.x+f[d.key][0])),x.y=Math.max(55,Math.min(240,x.y+f[d.key][1])),a(x.id)}});const v=e.querySelector("#circuit-switch");v&&(v.onclick=()=>{const m=t.components.find(f=>f.type==="switch"),d=m?.closed;m&&(m.closed=!m.closed),a(),m&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&document.querySelector("#circuit-canvas [data-switch-lever]")?.animate([{transform:`rotate(${d?0:-28}deg)`,transformOrigin:"-28px 0px"},{transform:`rotate(${m.closed?0:-28}deg)`,transformOrigin:"-28px 0px"}],{duration:160,easing:"ease-out"})}),e.querySelector("#wire-undo").onclick=()=>{t.wires.pop(),a()},e.querySelector("#circuit-reset").onclick=()=>{Object.assign(t,la()),delete t.selected,delete t.selectedWire,a()};function g(){const m=ot(t.components,t.wires,t.junctions);for(const w of t.components){const $=e.querySelector(`[data-component="${w.id}"]`),k=m.powers[w.id]||0;$.dataset.power=k;const M=m.meters[w.id];e.querySelector(`[data-art="${w.id}"]`).innerHTML=ue({...w,display:M==null?"—":Math.abs(M)>(w.range??(w.type==="ammeter"?1:20))?"Սահմանից դուրս":M.toLocaleString("hy-AM",{maximumSignificantDigits:5})},"bench",Math.min(1,k/4.05))}const d=e.querySelector("#circuit-diagnostic"),f=ka(t,m);d.textContent!==f&&(d.textContent=f);const x=e.querySelector("#circuit-status"),b=m.status==="closed"?`Շղթան փակ է։ Հոսանքի ուժը՝ ${m.current.toLocaleString("hy-AM",{maximumSignificantDigits:5})} Ա։`:"Շղթան բաց է կամ միացումը անվավեր է։ Լամպի հոսանք չենք հորինում։";x.textContent!==b&&(x.textContent=b),e.querySelector("#measure-electric").disabled=!["open","closed"].includes(m.status)}e.querySelectorAll("[data-wire-id]").forEach(m=>{const d=()=>{t.selectedWire=m.dataset.wireId,a()};m.onclick=d,m.onkeydown=f=>{["Enter"," "].includes(f.key)&&(f.preventDefault(),d())}}),e.querySelectorAll("[data-wire-end]").forEach(m=>{const d=t.wires.find(x=>x.id===t.selectedWire),f=m.dataset.wireEnd;m.onpointerdown=x=>{x.preventDefault(),x.stopPropagation(),l={wire:d,end:f},m.setPointerCapture(x.pointerId)},m.onpointermove=x=>{if(!l)return;const b=p(x);d[f]={x:Math.max(8,Math.min(552,b.x)),y:Math.max(8,Math.min(312,b.y))},m.setAttribute("cx",d[f].x),m.setAttribute("cy",d[f].y);const w=Se(t,d.start),$=Se(t,d.end),k=e.querySelector(`[data-wire-id="${d.id}"]`);k.setAttribute("d",at(w,$)),k.previousElementSibling.setAttribute("d",at(w,$)),g()},m.onpointerup=x=>{if(!l)return;const b=Dr(t,p(x),d[f==="start"?"end":"start"]);b&&(d[f]=b),l=null,a()},m.onpointercancel=()=>{l=null,a()},m.onkeydown=x=>{if(["Enter"," "].includes(x.key)){x.preventDefault(),u={wire:d,end:f},e.querySelector("#circuit-status").textContent="Հիմա ընտրիր նպատակային ելքը՝ սեղմելով այն կամ ստեղնաշարով Enter։";return}if(["Delete","Backspace"].includes(x.key)){x.preventDefault();const b=Se(t,d[f]);d[f]={x:Math.max(8,b.x-25),y:Math.min(310,b.y+45)},a()}}}),e.querySelector("#circuit-hint")?.addEventListener("click",()=>{jr(t),a()})}const be=e=>e.toLocaleString("hy-AM",{maximumSignificantDigits:5}),zr=["Դիմադրիչ","LED","Դիոդ","Կոնդենսատոր","Տրանզիստոր","Մակետային տախտակ"];function ca(e){return Object.fromEntries(e.settings.map(([t,,,,,,a])=>[t,a]))}function st(e,t){if(e==="ohm")return{value:Vt(t.voltage,t.resistance),unit:"Ա",label:"Հոսանքի ուժ"};if(e==="series"){const a=Xs(t.voltage,t.r1,t.r2,t.parallel);return{...a,value:a.current,unit:"Ա",label:"Աղբյուրի հոսանքի ուժ"}}if(e==="power"){const a=_s(t.voltage,t.resistance,t.time);return{...a,value:a.joules,unit:"Ջ",label:"Էներգիա"}}if(e==="project"){const a=gs(5,t.resistance,t.forward!==!1);return{...a,current:t.closed?a.current:0,value:t.closed?a.current:0,lit:t.closed&&a.lit,unit:"Ա",label:"Հոսանքի ուժ"}}if(e==="galvanic")return{...bo(t.bridge!==!1,t.wire!==!1),value:1.1,unit:"Վ",label:"Ստանդարտ բաց շղթայի ԷԼՇ"};if(e==="sensors"){const a=t.reading??50,s=t.threshold??30,n=t.sensor||"light";return{value:a,unit:n==="light"?"լք":n==="temperature"?"°C":"սմ",label:"Սենսորի չափում",lit:n==="temperature"?a>s:a<s}}if(e==="components"){const a=t.component||0;if(a===3){const n=Os(t.voltage,t.resistance,t.capacitance,t.elapsed||0,!!t.discharging);return{value:n.voltage,unit:"Վ",label:"Կոնդենսատորի լարում",tau:n.tau}}if(a===4)return{value:t.gate?1:0,unit:"",label:"Ելք",lit:!!t.gate};if(a===5)return{value:t.sameRow?1:0,unit:"",label:"Նույն խմբում կապ կա",lit:!!t.sameRow};const s=a===0?Vt(t.voltage,t.resistance):a===1?gs(t.voltage,t.resistance,t.forward!==!1).current:t.forward===!1?0:Math.max(0,(t.voltage-.7)/t.resistance);return{value:s,unit:"Ա",label:"Հոսանքի ուժ",lit:s>0&&!(a===1&&s>.02),unsafe:a===1&&s>.02}}return{value:0,unit:"",label:""}}function bn(e,t,a){if(a==="project"||a==="sensors"||a==="components"&&[1,4].includes(e.component||0),Math.min(1,Math.max(0,(t.current??t.value??0)*10)),a==="components"&&e.component===5)return`<svg viewBox="0 0 560 280" role="img" aria-label="Փորձասալի հնգյակների կապակցություն">${Nr(e.sameRow)}</svg>`;if(a==="components"&&e.component===4)return`<svg viewBox="0 0 560 280" role="img" aria-label="Տրանզիստորը որպես կառավարվող անջատիչ"><circle cx="280" cy="135" r="54" fill="#E7F3FC" stroke="#6394B5"/><path d="M140 135H260M260 105V165M260 118L320 82M260 150L320 190" fill="none" stroke="#527d9d" stroke-width="5"/><circle cx="430" cy="135" r="30" fill="${t.lit?"#FFE49B":"#EDF0EC"}" stroke="#879d86"/><text x="280" y="245" text-anchor="middle" font-size="16">${e.gate?"Կառավարումը միացված է․ ելքը միացված է":"Կառավարումն անջատված է"}</text></svg>`;const s=a==="project"||a==="sensors"||a==="components"&&[1,4].includes(e.component||0),n=a==="components"&&e.component===3,i=a==="components"&&e.component===2,r=a==="power"?Math.min(1,t.watts/9):t.lit?Math.min(1,(t.current??t.value)*50):0,o=n?{type:"capacitor",capacitance:e.capacitance}:s?{type:"led"}:a==="power"&&e.lamp?{type:"lamp"}:{type:"resistor",resistance:e.resistance};return`<svg viewBox="0 0 560 300" role="img" aria-label="Փորձի էլեկտրական մոդելը">${tt("detail")}<path d="${n||s||e.lamp||i?"M40 160V65H415V165M535 165V255H160V160":"M40 160V65H475V255H160V160"}" fill="none" stroke="#8aa5b3" stroke-width="5" stroke-linejoin="round"/><g transform="translate(100 160)">${ue({type:"battery",voltage:e.voltage||5},"detail")}</g>${e.lamp?"":`<g transform="translate(320 65)">${ue({type:"resistor",resistance:e.resistance??1e3},"detail")}</g>`}${n||s||e.lamp?`<g transform="translate(475 165) rotate(${s&&e.forward===!1?180:0})">${ue(o,"detail",r)}</g>`:""}${i?`<g transform="translate(475 165) rotate(${e.forward===!1?180:0})">${ue({type:"diode"},"detail")}</g>`:""}<text x="320" y="118" text-anchor="middle" font-size="17" fill="#63715b">${e.resistance??""} Օմ</text>${n?`<text x="425" y="208" font-size="16" fill="#63715b">${Number(t.value.toFixed(3))} Վ</text>`:""}</svg>`}function yn(e,t){const a=(s,n,i,r,o)=>`<g transform="translate(${s} ${n})">${ue({type:"resistor",resistance:o},"series")}<text y="50" text-anchor="middle" font-size="14">${i} · ${o} Օմ</text></g>`;return`<svg viewBox="0 0 560 300" role="img" aria-label="${e.parallel?"Երկու զուգահեռ ճյուղ":"Երկու հաջորդական բեռ"}">${tt("series")}<rect x="60" y="100" width="45" height="110" rx="10" fill="#586B59"/><rect x="60" y="100" width="45" height="25" rx="8" fill="#F5A447"/><text x="82" y="162" fill="white" text-anchor="middle">${e.voltage} Վ</text>${e.parallel?'<path d="M83 100V65H455V240H83V210M165 65V240M165 150H455" stroke="#7099b7" stroke-width="5" fill="none"/>':'<path d="M83 100V65H455V240H83V210" stroke="#7099b7" stroke-width="5" fill="none"/>'}${e.parallel?a(310,65,"R₁",t.v1,e.r1)+a(310,150,"R₂",t.v2,e.r2):a(225,65,"R₁",t.v1,e.r1)+a(370,65,"R₂",t.v2,e.r2)}</svg>`}function vn(e,t){return`<svg viewBox="0 0 600 310" role="img" aria-label="Ցինկ պղինձ Դանիելի տարր"><defs><linearGradient id="glass" x2="0" y2="1"><stop stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#d8e8ef" stop-opacity=".6"/></linearGradient></defs><path d="${e.wire===!1?"M140 75V28H210M390 28H465V75":"M140 75V28H465V75"}" fill="none" stroke="${e.wire===!1?"#ccc":"#70889b"}" stroke-width="5"/><path d="M245 28l10-12 12 24 12-24 12 24 12-24 12 24 12-24 12 12" stroke="#9779D4" stroke-width="3" fill="#FAF9F6"/><path d="M220 28V90H245M355 90H380V28" fill="none" stroke="#70889b" stroke-width="3"/><rect x="245" y="69" width="110" height="42" rx="10" fill="#EEF4EB" stroke="#879d86"/><text x="300" y="96" text-anchor="middle" font-size="19" fill="#347A47">${e.wire===!1?"—":"1.10 Վ"}</text><path d="M90 95V260Q90 275 110 275H220Q240 275 240 260V95M365 95V260Q365 275 385 275H495Q515 275 515 260V95" fill="url(#glass)" stroke="#a7bdc9" stroke-width="3"/><path d="M92 150H238V255H92Z" fill="#e0eced"/><path d="M367 150H513V255H367Z" fill="#BBDCF1"/><rect x="126" y="72" width="28" height="145" rx="5" fill="#8d9c99"/><rect x="451" y="72" width="28" height="145" rx="5" fill="#bd8155"/>${e.bridge!==!1?'<path d="M210 195V145Q210 125 235 125H372Q395 125 395 145V195" fill="none" stroke="#c6b9a0" stroke-width="17"/>':""}<text x="140" y="245" text-anchor="middle" font-size="15">Zn²⁺</text><text x="450" y="245" text-anchor="middle" font-size="15">Cu²⁺</text><text x="130" y="302" font-size="16">Zn · անոդ (−)</text><text x="385" y="302" font-size="16">Cu · կաթոդ (+)</text>${t.sustained?'<path d="M180 9H410m-10-6 10 6-10 6" stroke="#4B9FE1" stroke-width="3" fill="none"/><text x="298" y="22" text-anchor="middle" font-size="13">էլեկտրոններ →</text>':""}</svg>`}function xn(e,t){const a=t.parameters||=ca(e);if(e.id==="pendulum")return Gr(t);if(e.id==="circuits")return Ma(t.circuit||=la());const s=st(e.id,a);let n="";e.id==="galvanic"&&(n=`<div class="circuit-tools"><button class="button secondary" id="bridge-toggle">${a.bridge===!1?"Միացնել":"Հեռացնել"} աղային կամուրջը</button><button class="text-button" id="external-wire">${a.wire===!1?"Միացնել":"Անջատել"} արտաքին լարը</button></div><details><summary>Մոդելի պայմաններն ու հոսքի ուղղությունները</summary><p class="model-note">298 Կ, լուծված իոնների միավոր ակտիվություն։ ZnSO₄ և CuSO₄ լուծույթներ, իներտ աղային կամուրջ։ Իդեալական 100 Օմ բեռ, ներքին դիմադրությունն անտեսված է։ Կայուն հոսանքի ուղղությունը ցուցադրվում է որակապես, ոչ էլեկտրոնների իրական արագությամբ։ Ստանդարտ պոտենցիալները՝ Zn²⁺/Zn −0.76 Վ, Cu²⁺/Cu +0.34 Վ՝ ջրածնային ստանդարտ էլեկտրոդի նկատմամբ։ <a href="https://chem.libretexts.org/Bookshelves/General_Chemistry/Chemistry_2e_(OpenStax)/17%3A_Electrochemistry/17.03%3A_Electrode_and_Cell_Potentials" target="_blank" rel="noreferrer">Տվյալների աղբյուր</a></p><p>${s.sustained?"Արտաքին էլեկտրոնային և ներքին իոնային ճանապարհները կան։":"Կայուն հոսանքի համար երկու ճանապարհներն էլ անհրաժեշտ են։"} Կամրջի անիոնները շարժվում են անոդային, կատիոնները՝ կաթոդային լուծույթ։ Լուծույթով էլեկտրոնների հոսք չենք պատկերում։</p></details>`),e.id==="series"&&(n=`<label class="field-label">Միացման ձևը<select id="network-type"><option value="series" ${a.parallel?"":"selected"}>Հաջորդական</option><option value="parallel" ${a.parallel?"selected":""}>Զուգահեռ</option></select></label><details><summary>Ճյուղերի չափումները</summary><p>R = ${be(s.resistance)} Օմ · I₁ = ${be(s.i1)} Ա · I₂ = ${be(s.i2)} Ա · U₁ = ${be(s.v1)} Վ · U₂ = ${be(s.v2)} Վ</p></details>`),e.id==="project"&&(n=`<div class="project-assembly">${[["source","5 Վ աղբյուր"],["led","LED"],["resistor","Դիմադրիչ"],["wires","Միացնող լարեր"]].map(([r,o])=>`<label><input type="checkbox" data-project-part="${r}" ${a[r]?"checked":""}> ${o}</label>`).join("")}</div><div class="circuit-tools"><button class="button secondary" id="project-switch">${a.closed?"Բացել":"Փակել"} անջատիչը</button><button class="text-button" id="polarity-toggle">Փոխել LED-ի բևեռականությունը</button></div><label class="field-label">Վիրտուալ մուլտիմետր<select id="meter-mode"><option value="current">Հոսանքի ուժ</option><option value="voltage" ${a.meter==="voltage"?"selected":""}>Լարում LED-ի վրա</option></select></label><p id="meter-reading">${s.unsafe?"Չափում չկա":a.meter==="voltage"?`U = ${a.closed?a.forward===!1?-5:2:0} Վ`:`I = ${be(s.current)} Ա`}</p><p>LED-ի բևեռականությունը՝ ${a.forward===!1?"հակառակ":"ուղիղ"}։ ${s.unsafe?"Հոսանքը չափազանց մեծ է կամ դիմադրիչ չկա․ Վիրտուալ պաշտպանությունը չի միացնում LED-ը։":"Թույլատրելի հոսանք՝ մինչև 0.020 Ա։"}</p>`),e.id==="components"&&(n=`<label class="field-label">Բաղադրիչ<select id="component-kind">${zr.map((r,o)=>`<option value="${o}" ${(a.component||0)===o?"selected":""}>${r}</option>`).join("")}</select></label>${[1,2].includes(a.component||0)?'<button id="polarity-toggle" class="text-button">Փոխել բևեռականությունը</button>':""}${a.component===3?'<button id="rc-start" class="button secondary">Սկսել փորձը</button><button id="rc-mode" class="text-button">Փոխել լիցքավորում / լիցքաթափում</button><button id="rc-pause" class="text-button">Դադարեցնել / շարունակել</button><p id="rc-time">0 վ</p>':""}${a.component===4?`<button id="transistor-gate" class="button secondary">${a.gate?"Անջատել":"Միացնել"} կառավարումը</button><p>Տրանզիստորն այստեղ իդեալական կառավարվող անջատիչ է։</p>`:""}${a.component===5?`<button id="breadboard-group" class="button secondary">Ընտրել ${a.sameRow?"տարբեր":"նույն"} միացված խումբը</button><p>Յուրաքանչյուր խմբի հինգ անցքերը միացված են։ Կենտրոնական ակոսը խմբերը բաժանում է։ Այս փորձը ստուգում է երկու ընտրված անցքերի հնգյակները․ սնուցման ռելսերը այստեղ չենք միացնում։</p>`:""}<p>${["Դիմադրիչի երկու ուղղությունները համարժեք են այս մոդելում։","Կարմիր LED․ ուղիղ լարման մոտարկում՝ 2 Վ, մինչև 20 մԱ։","Սիլիցիումային դիոդ․ ուղիղ անկման մոտարկում՝ 0.7 Վ։","RC լիցքավորում՝ Uc = U(1 − exp(−t/RC)), լիցքաթափում՝ Uc = U₀ exp(−t/RC)։ Լիցքաթափման սկզբում U₀-ն հավասար է ընտրված լարմանը։ Կարգավորումը փոխելիս ժամանակը սկսվում է զրոյից։","Սա չի մոդելավորում տրանզիստորի բոլոր կիսահաղորդչային հատկությունները։","Նույն տողում միայն նույն խմբի անցքերն են կապակցված։"][a.component||0]}</p>`),e.id==="sensors"&&(n=`<label class="field-label">Սենսոր<select id="sensor-kind"><option value="light">Լույս</option><option value="temperature" ${a.sensor==="temperature"?"selected":""}>Ջերմաստիճան</option><option value="distance" ${a.sensor==="distance"?"selected":""}>Հեռավորություն</option></select></label><label>Չափում <input id="sensor-reading" type="range" min="0" max="100" value="${a.reading??50}"></label><label>Սահմանային արժեք <input id="sensor-threshold" type="range" min="0" max="100" value="${a.threshold??30}"></label><p id="sensor-rule">Եթե չափումը ${a.sensor==="temperature"?"մեծ":"փոքր"} է ${a.threshold??30} ${s.unit}-ից → միացնել LED-ը։ Ելքը՝ ${s.lit?"միացված":"անջատված"}։</p>`);const i=e.settings.map(([r,o,c,l,u,p])=>`<label class="experiment-slider">${o}<strong id="param-${r}">${be(a[r])} ${c}</strong><input data-electric-param="${r}" type="range" min="${l}" max="${u}" step="${p}" value="${a[r]}"></label>`).join("");return`<section class="electric-experiment"><div id="electric-scene">${e.id==="galvanic"?vn(a,s):e.id==="series"?yn(a,s):bn(a,s,e.id)}</div><p class="electric-reading" id="electric-reading">${s.unsafe?"Չափում չի ցուցադրվում․ այս միացումը դուրս է թույլատրելի պայմաններից։":`${s.label}՝ <strong>${be(s.value)} ${s.unit}</strong>`}</p>${n}<div class="experiment-sliders">${i}</div><button class="button secondary" id="measure-electric">Գրանցել չափումը</button><details><summary>Չափումներ և գրաֆիկ</summary><div id="electric-graph">${$n(e,a)}</div><ol>${(t.experiments||[]).slice(-5).map(r=>`<li>${r.reading}</li>`).join("")}</ol></details></section>`}function $n(e,t){if(e.id==="galvanic"||e.id==="sensors"||e.id==="project"||e.id==="components"&&[4,5].includes(t.component))return"<p>Համեմատիր տարբեր կարգավորումներով պահպանած չափումները։</p>";const a=e.id==="components"&&t.component===3?5:e.id==="components"&&t.component===1?Math.min(12,2+.02*t.resistance):12,s=r=>e.id==="components"&&t.component===3?Os(t.voltage,t.resistance,t.capacitance,r,!!t.discharging).voltage:e.id==="power"?_s(t.voltage,t.resistance,r).joules:e.id==="series"?Xs(r,t.r1,t.r2,t.parallel).current:e.id==="components"?st(e.id,{...t,voltage:r}).value:Vt(r,t.resistance),n=Math.max(.001,s(a));return`<svg viewBox="0 0 550 260" role="img" aria-label="Մոդելից հաշվարկված գրաֆիկ"><path d="M55 30V205H495" fill="none" stroke="#879d86"/><path d="${Array.from({length:51},(r,o)=>{const c=a*o/50;return`${o?"L":"M"}${55+c/a*435} ${205-s(c)/n*170}`}).join(" ")}" fill="none" stroke="#4B9FE1" stroke-width="3"/><text x="8" y="25">${e.id==="components"&&t.component===3?"Uc (Վ)":e.id==="power"?"E (Ջ)":"I (Ա)"}</text><text x="435" y="245">${e.id==="components"&&t.component===3||e.id==="power"?"t (վ)":"U (Վ)"}</text><text x="55" y="230">0</text><text x="465" y="230">${a}</text><text x="5" y="45">${be(n)}</text></svg>`}function wn(e,t,a,s,n){const i=a.parameters||=ca(t);let r,o,c=i.elapsed||0,l=!1;if(t.id==="pendulum")return Hr(e,a,n);if(t.id==="circuits")return gn(e,a.circuit||=la(),d=>{n(null,!1),s(d)}),e.querySelector("#measure-electric").onclick=()=>{const d=ot(a.circuit.components,a.circuit.wires,a.circuit.junctions);d.status==="closed"?n(`I = ${be(d.current)} Ա`):d.status==="open"&&n("Բաց շղթա · I = 0 Ա")},()=>{};const u=()=>{const d=st(t.id,i);e.querySelector("#electric-scene").innerHTML=t.id==="galvanic"?vn(i,d):t.id==="series"?yn(i,d):bn(i,d,t.id),e.querySelector("#electric-reading").innerHTML=d.unsafe?"Չափում չի ցուցադրվում․ մեծացրու սահմանափակող դիմադրությունը։":`${d.label}՝ <strong>${be(d.value)} ${d.unit}</strong>`,e.querySelector("#electric-graph").innerHTML=$n(t,i)};e.querySelectorAll("[data-electric-param]").forEach(d=>d.oninput=()=>{i[d.dataset.electricParam]=Number(d.value),t.id==="components"&&i.component===3&&(l=!1,cancelAnimationFrame(r),c=i.elapsed=0,e.querySelector("#rc-time").textContent="0 վ"),e.querySelector("#param-"+d.dataset.electricParam).textContent=be(Number(d.value))+" "+t.settings.find(f=>f[0]===d.dataset.electricParam)[2],u(),n(null,!1)});const p=(d,f)=>{const x=e.querySelector(d);x&&(x.onclick=()=>{i[f]=i[f]===!1,s()})};p("#bridge-toggle","bridge"),p("#external-wire","wire"),p("#polarity-toggle","forward");for(const[d,f]of[["#network-type","parallel"],["#component-kind","component"],["#sensor-kind","sensor"],["#meter-mode","meter"]]){const x=e.querySelector(d);x&&(x.onchange=()=>{i[f]=f==="parallel"?x.value==="parallel":f==="component"?Number(x.value):x.value,s()})}e.querySelectorAll("[data-project-part]").forEach(d=>d.onchange=()=>{i[d.dataset.projectPart]=d.checked,i.closed=!1,s()});const y=e.querySelector("#project-switch");y&&(y.onclick=()=>{if(!["source","led","resistor","wires"].every(d=>i[d])){e.querySelector("#electric-reading").textContent="Նախ հավաքիր բոլոր անհրաժեշտ մասերը։";return}i.closed=!i.closed,s()});for(const[d,f]of[["#transistor-gate","gate"],["#breadboard-group","sameRow"]]){const x=e.querySelector(d);x&&(x.onclick=()=>{i[f]=!i[f],s()})}for(const[d,f]of[["#sensor-reading","reading"],["#sensor-threshold","threshold"]]){const x=e.querySelector(d);x&&(x.oninput=()=>{i[f]=Number(x.value),u();const b=st(t.id,i);e.querySelector("#sensor-rule").textContent=`Եթե չափումը ${i.sensor==="temperature"?"մեծ":"փոքր"} է ${i.threshold??30} ${b.unit}-ից → միացնել LED-ը։ Ելքը՝ ${b.lit?"միացված":"անջատված"}։`,n(null,!1)})}e.querySelector("#measure-electric").onclick=()=>{const d=st(t.id,i);if(d.unsafe){e.querySelector("#electric-reading").textContent="Նախ ընտրիր թույլատրելի սահմանափակող դիմադրություն։";return}if(t.id==="project"&&!i.closed){e.querySelector("#electric-reading").textContent="Նախ փակիր ճիշտ հավաքված շղթան։";return}n(`${d.label}՝ ${be(d.value)} ${d.unit}`)};function h(d){l&&(c+=Math.min(.1,(d-o)/1e3),o=d,i.elapsed=c,u(),e.querySelector("#rc-time").textContent=be(c)+" վ",r=requestAnimationFrame(h))}const v=e.querySelector("#rc-mode");v&&(v.onclick=()=>{i.discharging=!i.discharging,i.elapsed=0,s()});const g=e.querySelector("#rc-start");g&&(g.onclick=()=>{cancelAnimationFrame(r),c=i.elapsed=0,l=!0,o=performance.now(),r=requestAnimationFrame(h)});const m=e.querySelector("#rc-pause");return m&&(m.onclick=()=>{l=!l,l?(o=performance.now(),r=requestAnimationFrame(h)):cancelAnimationFrame(r)}),()=>{l=!1,cancelAnimationFrame(r)}}const Pa=e=>Bt.find(t=>t.id===e.slice(7));function kn(e,t){return{...ca(Pa(e)),...t}}function Wr(e,t){const a=Pa(e);let s=xn(a,{parameters:t.parameters,experiments:[]}).replace('class="button secondary" id="measure-electric"','class="button" id="science-record"');return t.probeFocus&&(s+=`<label class="field-label">Չափման տեղը<select id="legacy-probe"><option value="source" ${(t.parameters.probe||"source")==="source"?"selected":""}>Աղբյուրի ելք</option><option value="first" ${t.parameters.probe==="first"?"selected":""}>Առաջին բեռ</option><option value="second" ${t.parameters.probe==="second"?"selected":""}>Երկրորդ բեռ</option></select></label><p id="legacy-probe-reading" role="status"></p>`),s+'<button class="text-button" id="legacy-experiment-reset">Փորձը սկսել սկզբից</button>'}function Kr(e,t,a,s,n,i){const r=Pa(t),o=a.parameters,c=e.querySelector("#science-record");c.id="measure-electric";const l=()=>{const y=st(r.id,o),h=a.probeFocus==="voltage",v=o.probe==="first"?h?y.v1:y.i1:o.probe==="second"?h?y.v2:y.i2:h?o.voltage:y.current;return`${h?"U":"I"} = ${Number(v.toFixed(3))} ${h?"Վ":"Ա"}`},u=()=>{a.probeFocus&&(e.querySelector("#legacy-probe-reading").textContent=l())},p=wn(e,r,{parameters:o},()=>{s(),i()},y=>{if(!y){s(),u();return}const h=st(r.id,o);if(h.unsafe)return;const v=r.settings.map(([m,d,f])=>`${d}՝ ${o[m]} ${f}`).join(" · "),g=r.id==="series"?`I₁ = ${Number(h.i1.toFixed(3))} Ա · I₂ = ${Number(h.i2.toFixed(3))} Ա · U₁ = ${Number(h.v1.toFixed(3))} Վ · U₂ = ${Number(h.v2.toFixed(3))} Վ · R = ${Number(h.resistance.toFixed(3))} Օմ`:r.id==="power"?`P = ${h.watts} Վտ · I = ${h.current} Ա`:"";n({parameters:{...o},time:o.elapsed||o.time||0,reading:v+"։ "+(a.probeFocus?l():y)+"։ "+g,created:Date.now()})});return c.id="science-record",e.querySelector("#legacy-probe")?.addEventListener("change",y=>{o.probe=y.target.value,u(),s()}),e.querySelectorAll("[data-electric-param]").forEach(y=>{const h=y.oninput;y.oninput=v=>{h(v),u()}}),e.querySelector("#legacy-experiment-reset").onclick=()=>{Object.keys(o).forEach(y=>delete o[y]),Object.assign(o,kn(t,a.initial||{})),a.time=0,s(),i()},r.id==="components"&&a.fixedComponent!==void 0&&(e.querySelector("#component-kind").closest("label").hidden=!0),r.id==="components"&&e.querySelectorAll("[data-electric-param]").forEach(y=>{y.closest("label").hidden=[4,5].includes(o.component||0)||y.dataset.electricParam==="capacitance"&&(o.component||0)!==3}),e.querySelector("#rc-time")&&(e.querySelector("#rc-time").textContent=Number((o.elapsed||0).toFixed(3))+" վ"),u(),p}const N=(e,t,a,s,n,i,r)=>({key:e,label:t,unit:a,min:s,max:n,step:i,value:r}),da={symbols:{static:!0,params:[]},charges:{static:!0,params:[N("q1","Առաջին լիցք","նԿլ",-5,5,1,2),N("q2","Երկրորդ լիցք","նԿլ",-5,5,1,-2)]},atom:{static:!0,params:[N("protons","Մոդելի պրոտոնների թիվ","",1,6,1,3),N("neutrons","Մոդելի նեյտրոնների թիվ","",0,8,1,4),N("electrons","Էլեկտրոնների թիվ","",0,8,1,3)]},transfer:{static:!0,params:[N("electrons","Ա-ից Բ փոխանցված էլեկտրոններ","",-6,6,1,0)]},field:{static:!0,params:[N("charge","Աղբյուրի լիցք","նԿլ",-5,5,1,2),N("test","Փորձնական լիցք","նԿլ",-2,2,1,1)]},current:{duration:5,params:[N("voltage","Աղբյուրի լարում","Վ",1,12,1,6),N("resistance","Դիմադրություն","Օմ",2,40,1,10)]},cell:{static:!0,params:[N("resistance","Արտաքին բեռ","Օմ",50,500,50,100)]},electricity:{duration:5,static:!0,params:[N("voltage","Լարում","Վ",1,12,1,6),N("resistance","Դիմադրություն","Օմ",2,40,1,10)]},meters:{duration:5,static:!0,params:[N("voltage","Աղբյուրի լարում","Վ",1,12,1,12),N("resistance","Բեռի դիմադրություն","Օմ",2,40,1,6)]},parallel:{static:!0,params:[N("voltage","Աղբյուրի լարում","Վ",1,12,1,6),N("r1","Առաջին դիմադրություն","Օմ",2,20,1,6),N("r2","Երկրորդ դիմադրություն","Օմ",2,20,1,3)]},acceleration:{duration:5,params:[N("v0","Սկզբնական արագություն","մ/վ",0,4,.5,1),N("a","Արագացում","մ/վ²",0,2,.25,1)]},fall:{duration:3,params:[N("height","Բարձրություն","մ",1,12,.5,5),N("mass","Զանգված","կգ",1,5,.5,2)]},force:{duration:4,params:[N("force","Կիրառված ուժ","Ն",-20,20,1,10),N("mass","Զանգված","կգ",1,8,.5,2)]},friction:{duration:4,params:[N("force","Հրող ուժ","Ն",0,30,1,8),N("mass","Զանգված","կգ",1,5,.5,2),N("mu","Կինետիկ շփման գործակից","",0,.6,.05,.3)]},incline:{duration:4,params:[N("angle","Թեքության անկյուն","°",0,55,1,20),N("mass","Զանգված","կգ",1,5,.5,2),N("mu","Կինետիկ շփման գործակից","",0,.6,.05,.3)]},pressure:{static:!0,params:[N("mass","Բեռի զանգված","կգ",1,20,1,10),N("area","Հենման մակերես","մ²",.01,.1,.01,.02)]},hydrostatic:{static:!0,params:[N("depth","Խորություն","մ",0,5,.25,2),N("density","Հեղուկի խտություն","կգ/մ³",800,1200,100,1e3)]},buoyancy:{static:!0,params:[N("density","Մարմնի խտություն","կգ/մ³",200,1400,100,600),N("volume","Մարմնի ծավալ","մ³",.001,.005,.001,.002)]},heat:{duration:120,rate:8,params:[N("mass","Առաջին ջրի զանգված","կգ",.5,3,.5,1),N("temperature","Առաջին ջրի ջերմաստիճան","°C",30,90,5,80)]},waves:{duration:8,params:[N("frequency","Հաճախություն","Հց",.5,3,.25,1),N("amplitude","Ամպլիտուդ","մ",.05,.3,.05,.2)]},reflection:{static:!0,params:[N("incoming","Աղբյուրի ուղղություն","°",-65,65,5,30),N("tilt","Հայելու պտույտ","°",-30,30,5,0)]},refraction:{static:!0,params:[N("angle","Անկման անկյուն","°",0,75,5,40),N("n1","Առաջին միջավայրի բեկման ցուցիչ","",1,1.6,.1,1),N("n2","Երկրորդ միջավայրի բեկման ցուցիչ","",1,1.6,.1,1.5)]},lens:{static:!0,params:[N("focal","Կիզակետային հեռավորություն","մ",.1,.5,.05,.3),N("object","Առարկայի հեռավորություն","մ",.1,1.5,.1,.8)]},magnet:{static:!0,params:[N("x","Կողմնացույցի x դիրք","մ",.3,2,.1,1),N("y","Կողմնացույցի y դիրք","մ",-.9,.9,.1,.5),N("moment","Մագնիսական մոմենտ","Ա·մ²",1,5,1,2)]},induction:{duration:5,params:[N("position","Սկզբնական դիրք","մ",-2,1,.25,-1),N("velocity","Արագություն","մ/վ",-.5,.5,.1,.3),N("turns","Գալարների թիվ","",50,200,50,100)]},robot:{duration:12,params:[N("left","Ձախ անիվի գծային արագություն","մ/վ",-.6,.6,.1,.4),N("right","Աջ անիվի գծային արագություն","մ/վ",-.6,.6,.1,.4)]}},le=e=>typeof e=="string"?e:e===null||!Number.isFinite(e)?"—":e!==0&&Math.abs(e)<.001?e.toExponential(2):e.toLocaleString("hy-AM",{maximumSignificantDigits:5}),Mn=e=>Object.fromEntries(da[e].params.map(t=>[t.key,t.value]));function Sn(e,t,a=0,s={x:1,y:2,angle:0,distance:0}){let n,i=[],r={x:"t (վ)",y:"",maxT:da[e].duration||5,values:[]};const o=(c,l,u)=>({label:c,value:l,unit:u});switch(e){case"symbols":n={part:t.part||"battery"},i=[{label:"Ուսումնասիրվող տարր",value:{battery:"Մարտկոց",lamp:"Լամպ",switch:"Անջատիչ",resistor:"Դիմադրիչ"}[n.part],unit:""}];break;case"charges":n=we(t),i=[o("Փոխազդեցության ուժ",n.force*1e9,"նՆ"),o("Հեռավորություն",n.distance,"մ")],r={x:"r (մ)",y:"F (նՆ)",maxT:3.5,values:Array.from({length:67},(c,l)=>{const u=.2+l*.05;return[u,we({...t,x1:-u/2,x2:u/2,y1:0,y2:0}).force*1e9]})};break;case"atom":n=Io(t),i=[o("Ատոմի լիցք",n.charge,"e"),o("Արտաքին պահոցի լիցք",n.reservoir,"e"),o("Միջուկի լիցք",t.protons,"e")];break;case"transfer":n=Eo(t),i=[o("Ա մարմնի լիցք",n.a,"e"),o("Բ մարմնի լիցք",n.b,"e"),o("Ընդհանուր լիցք",n.total,"e")];break;case"field":n=sn(t),i=[o("Դաշտի լարվածություն",n.magnitude,"Ն/Կլ"),o("Ուժի շառավղային բաղադրիչ",n.force,"Ն")];break;case"current":{const c=t.closed===!1?0:t.voltage/t.resistance;n={current:c,voltage:t.voltage,drift:c/(85e27*tn*1e-6),charge:c*a},i=[o("Հոսանքի ուժ",n.current,"Ա"),o("Անցած լիցք",n.charge,"Կլ"),o("Դրեյֆի արագության մոդուլ",n.drift*1e6,"մկմ/վ")],r.y="q (Կլ)",r.values=Array.from({length:41},(l,u)=>[u/8,c*u/8]);break}case"cell":n=Ro(t),i=[o("Բաց շղթայի ստանդարտ ԷԼՇ",n.voltage,"Վ"),o("Բեռի հոսանքի ուժ",n.current,"Ա")];break;case"electricity":case"meters":{const c=e==="meters"?Qr(t):null,l=c?.status==="meter-short",u=e==="meters"&&c.status==="open",p=e==="meters"?c.meters?.amp??null:t.voltage/t.resistance;n={current:p,voltage:e==="meters"?c.meters?.volt??null:t.voltage,resistance:t.resistance,unsafe:l,open:u},i=[o("Հոսանքի ուժ",p,"Ա"),o("Լարում",n.voltage,"Վ"),o("Դիմադրություն",t.resistance,"Օմ")],r={x:"U (Վ)",y:"I (Ա)",maxT:12,values:l?[]:Array.from({length:25},(y,h)=>[h/2,l||u?0:h/2/t.resistance])};break}case"parallel":{const c=1/(1/t.r1+1/t.r2);n={resistance:c,current:t.voltage/c,i1:t.voltage/t.r1,i2:t.voltage/t.r2},i=[o("Ընդհանուր դիմադրություն",c,"Օմ"),o("Աղբյուրի հոսանքի ուժ",n.current,"Ա"),o("Ճյուղերի հոսանք",n.i1,"Ա"),o("Երկրորդ ճյուղ",n.i2,"Ա")];break}case"acceleration":n=Nt(a,t),i=[o("Տեղափոխություն",n.x,"մ"),o("Արագություն",n.v,"մ/վ"),o("Արագացում",t.a,"մ/վ²")],r.y="v (մ/վ)",r.values=Array.from({length:41},(c,l)=>[l/8,Nt(l/8,t).v]);break;case"force":case"friction":n=vo({...t,mu:e==="force"?0:t.mu},a),i=[o("Համազոր ուժ",n.net,"Ն"),o("Արագացում",n.a,"մ/վ²"),o("Շփման ուժ",n.friction,"Ն"),o("Տեղափոխություն",n.x,"մ")],r.y="v (մ/վ)",r.values=Array.from({length:41},(c,l)=>[l/10,n.a*l/10]);break;case"incline":n=bs(t,a),i=[o("Արագացում",n.a,"մ/վ²"),o("Հակազդեցության ուժ",n.normal,"Ն"),o("Շփման ուժ",n.friction,"Ն"),o("Տեղափոխություն",n.x,"մ")],r.y="s (մ)",r.values=Array.from({length:41},(c,l)=>[l/10,bs(t,l/10).x]);break;case"fall":n=It(t,a),i=[o("Բարձրություն",n.y,"մ"),o("Կինետիկ էներգիա",n.kinetic,"Ջ"),o("Պոտենցիալ էներգիա",n.potential,"Ջ")],r.y="E (Ջ)",r.maxT=n.duration,r.values=Array.from({length:41},(c,l)=>[l/40*n.duration,It(t,l/40*n.duration).potential]),r.second=r.values.map(([c])=>[c,It(t,c).kinetic]);break;case"pressure":n={pressure:xo(t)},i=[o("Ճնշում",n.pressure,"Պա"),o("Հենման ուժ",t.mass*ye,"Ն"),o("Մակերես",t.area,"մ²")];break;case"hydrostatic":n={pressure:$o(t)},i=[o("Հեղուկի ավելցուկային ճնշում",n.pressure,"Պա"),o("Խորություն",t.depth,"մ")];break;case"buoyancy":n=wo(t),i=[o("Արքիմեդյան ուժ",n.force,"Ն"),o("Ծանրության ուժ",n.weight,"Ն"),o("Ընկղմված ծավալի բաժին",n.fraction*100,"%")];break;case"heat":n=ga(t,a),i=[o("Առաջին ջրի ջերմաստիճան",n.hot,"°C"),o("Երկրորդ ջրի ջերմաստիճան",n.cold,"°C"),o("Հավասարակշռության ջերմաստիճան",n.equilibrium,"°C")],r.y="T (°C)",r.values=Array.from({length:61},(c,l)=>[l*2,ga(t,l*2).hot]),r.second=r.values.map(([c])=>[c,ga(t,c).cold]);break;case"waves":n=$a(t,0,a),i=[o("Ալիքի երկարություն",n.wavelength,"մ"),o("Պարբերություն",n.period,"վ"),o("Տարածման արագություն",2,"մ/վ")],r.y="y (մ)",r.values=Array.from({length:121},(c,l)=>[l/15,$a(t,1,l/15).y]);break;case"reflection":n=ko(t),i=[o("Անկման անկյուն",n.incidence,"°"),o("Անդրադարձման անկյուն",n.reflection,"°")];break;case"refraction":n=Mo(t),i=[o("Անկման անկյուն",t.angle,"°"),o("Բեկման անկյուն",n.angle,"°")];break;case"lens":n=So(t),i=[o("Պատկերի հեռավորություն",n.image,"մ"),o("Գծային խոշորացում",n.magnification,"")];break;case"magnet":n=Js(t),i=[o("Դաշտի մագնիսական ինդուկցիա",n.magnitude*1e6,"մկՏլ"),o("Ուղղություն",n.angle*180/Math.PI,"°")];break;case"induction":n=ys(t,a),i=[o("Ինդուկցված ԷԼՇ",n.emf,"Վ"),o("Հոսք մեկ գալարով",n.flux,"Վբ")],r.y="ԷԼՇ (Վ)",r.values=Array.from({length:61},(c,l)=>[l/12,ys(t,l/12).emf]);break;case"robot":n={...s,sensor:en(s)},i=[o("Անցած ճանապարհ",s.distance,"մ"),o("Սենսորի հեռավորություն",n.sensor,"մ"),o("Դիրք x",s.x,"մ")],r.y="s (մ)";break;default:throw Error("Unknown experiment "+e)}return{...n,readings:i,graph:r}}function Yr(e){return e.readings.map(t=>`${t.label}՝ ${le(t.value)} ${t.unit}`).join(" · ")}function Cn(e){const t=[{id:"source",type:"battery",voltage:e.voltage},{id:"load",type:"resistor",resistance:e.resistance},{id:"amp",type:"ammeter"},{id:"volt",type:"voltmeter"}],a=[],s=e.reverseA?"b":"a",n=e.reverseA?"a":"b",i=e.reverseV?"b":"a",r=e.reverseV?"a":"b";return e.ammeter==="series"?a.push(["source:a","amp:"+s],["amp:"+n,"load:a"]):e.ammeter==="parallel"&&a.push(["source:a","load:a"],["source:a","amp:"+s],["source:b","amp:"+n]),e.voltmeter==="series"?a.push(["load:b","volt:"+i],["volt:"+r,"source:b"]):(a.push(["load:b","source:b"]),e.voltmeter==="parallel"&&a.push(["load:a","volt:"+i],["load:b","volt:"+r])),{components:t,wires:a}}function Qr(e){const t=Cn(e);return ot(t.components,t.wires)}const G=(e,t,a)=>`<text x="${e}" y="${t}" text-anchor="middle" font-size="18" fill="#63746c">${a}</text>`,ba='<path d="M35 292H605" stroke="#bccabb" stroke-width="3"/><path d="M35 300H605" stroke="#e1e7dc" stroke-width="6"/>',Zt='<ellipse cy="38" rx="45" ry="6" fill="#344a3a" opacity=".08"/><path d="M-36-28 18-28 36-14-18-14Z" fill="#e8d7b5"/><path d="M-36-28-18-14V30L-36 16Z" fill="#bba682"/><path d="M-18-14H36V30H-18Z" fill="#d8c49e" stroke="#ab9573"/><path d="M3-14v44M-18 7H36" stroke="#c0ad86"/>',Xr='<path d="M-39-20H33L43 17H-43Z" fill="#dce9dd" stroke="#7f9c85" stroke-width="2"/><path d="M-26-16H20V3H-26Z" fill="#eef5e9"/><circle cx="-26" cy="23" r="10" fill="#536d5c"/><circle cx="27" cy="23" r="10" fill="#536d5c"/><path d="M-5-16v19" stroke="#bacdb7"/>',Be=(e,t,a,s)=>`<circle data-direct="${e}" cx="${t}" cy="${a}" r="43" fill="transparent" tabindex="0" role="button" aria-label="${s}"/>`;function An(e,t,a){let s="";if(e==="symbols"){const n={battery:'<path d="M415 120V240M435 145V215M370 180H415M435 180H485"/>',lamp:'<circle cx="425" cy="180" r="35"/><path d="M400 155l50 50m-50 0 50-50M370 180H390M460 180H485"/>',switch:'<path d="M370 180H400l50-30M450 180H485"/><circle cx="400" cy="180" r="4"/><circle cx="450" cy="180" r="4"/>',resistor:'<path d="M370 180H395m60 0h30"/><rect x="395" y="162" width="60" height="36"/>'};s=`${tt("symbol")}<g transform="translate(190 180)">${ue({type:a.part,voltage:9},"symbol")}</g><g fill="none" stroke="#637d71" stroke-width="4">${n[a.part]}</g>${G(190,290,"Տարրի պատկերը")}${G(425,290,"Պայմանական նշանը")}`}if(e==="charges"&&(s=Fr(t,a)),e==="field"){let n="";for(let o=-1.5;o<=1.6;o+=.3)for(let c=-.8;c<=.8;c+=.3){if(o*o+c*c<.08)continue;const l=sn({...t,x:o,y:c});if(!l.magnitude)continue;const u=Math.atan2(-l.ey,l.ex);n+=`<g transform="translate(${320+o*155} ${180-c*155}) rotate(${u*180/Math.PI})"><path d="M-8 0H8m-5-4 5 4-5 4" stroke="#9db8a5" stroke-width="2" fill="none"/></g>`}const i=320+(t.x??.7)*155,r=180-(t.y??.4)*155;s=n+`<circle cx="320" cy="180" r="29" fill="${t.charge>=0?"#e6b99c":"#b4cedc"}"/>${G(320,187,t.charge>0?"+":t.charge<0?"−":"0")}<circle cx="${i}" cy="${r}" r="19" fill="#f0dc9e" stroke="#b7a06b"/>${G(i,r+6,t.test>0?"+":t.test<0?"−":"0")}${Be("probe",i,r,"Քաշիր փորձնական լիցքը")}${G(320,335,"Սլաքները դաշտի ուղղությունն են՝ դրական փորձնական լիցքի համար")}`}if(e==="atom"&&(s=`<ellipse cx="320" cy="180" rx="130" ry="105" fill="#e5eee2"/><ellipse cx="320" cy="180" rx="95" ry="80" fill="#d6e5d5"/>${Array.from({length:t.protons+t.neutrons},(n,i)=>{const r=i*2.399,o=8+Math.sqrt(i)*7;return`<circle cx="${320+Math.cos(r)*o}" cy="${180+Math.sin(r)*o}" r="10" fill="${i<t.protons?"#cf9a78":"#aebdb0"}"/>`}).join("")}${Array.from({length:t.electrons},(n,i)=>{const r=i*2.399;return`<circle cx="${320+Math.cos(r)*(75+i%3*20)}" cy="${180+Math.sin(r)*(65+i%2*25)}" r="10" fill="#769faf"/>`}).join("")}${G(320,39,"Միջուկ՝ "+t.protons+" պրոտոն, "+t.neutrons+" նեյտրոն")}${G(320,328,"Էլեկտրոնային ամպի պայմանական պատկեր․ ուղեծրեր չենք մոդելավորում")}`),e==="transfer"&&(s=`<circle cx="170" cy="170" r="65" fill="#d7dfc8" stroke="#9aaa8a"/><circle cx="470" cy="170" r="65" fill="#e5d7b9" stroke="#bca77b"/>${G(170,179,(a.a>0?"+":"")+a.a+" e")}${G(470,179,(a.b>0?"+":"")+a.b+" e")}<path d="M255 170H385m-12-8 12 8-12 8" stroke="#8aa4ad" stroke-width="4" fill="none"/>${G(320,140,"էլեկտրոնների փոխանցում")}${Be("transfer",320,170,"Քաշիր դեպի աջ՝ մեկ էլեկտրոն փոխանցելու համար")}${G(170,270,"Ա մարմին")}${G(470,270,"Բ մարմին")}`),e==="cell"&&(s=`${tt("cell")}${ws({x:125,y:115,height:190,solution:t.solution!==!1?"#bfcfd5":null,label:t.solution!==!1?"ZnSO₄":""})}${ws({x:375,y:115,height:190,solution:t.solution!==!1?"#54bee5":null,label:t.solution!==!1?"CuSO₄":""})}${t.zinc!==!1?ks({x:185,y:95}):""}${t.copper!==!1?ks({x:465,y:95,metal:"Cu"}):""}${t.bridge!==!1?Vr():""}${t.wire!==!1?`<path d="M185 95V18H265M385 18H465V95" stroke="#687f90" stroke-width="4" fill="none"/><g transform="translate(325 18) scale(1 .6)">${ue({type:"resistor",resistance:t.resistance,showLabel:!1},"cell")}</g>`:""}${t.meter!==!1?`<path d="M185 95V80H289M361 80H465V95" stroke="#4690ba" stroke-width="3" fill="none"/><g transform="translate(325 80) scale(.6)">${ue({type:"voltmeter",range:2,display:le(a.voltage),reverseTerminals:!0},"cell")}</g>`:""}${G(185,332,"Zn · անոդ (−)")}${G(465,332,"Cu · կաթոդ (+)")}${a.sustained?'<path d="M207 18H247m-8-5 8 5-8 5" stroke="#c78834" fill="none" stroke-width="3"/><text x="220" y="46" font-size="14" fill="#5b7786">e⁻ →</text>':""}${a.sustained&&t.bridge!==!1?G(320,361,"Կամուրջ՝ անիոններ ← · կատիոններ →"):""}`),e==="meters"){const n=Cn(t),i={source:{x:90,y:190},load:{x:430,y:90},amp:t.ammeter==="parallel"?{x:90,y:290}:{x:240,y:90},volt:t.voltmeter==="series"?{x:430,y:290}:{x:430,y:225}},r={components:n.components.map(o=>({...o,...i[o.id]}))};s=tt("science")+n.wires.map(([o,c])=>`<path d="${Ss(t,o,c,r)}" stroke="white" stroke-width="9" fill="none"/><path d="${Ss(t,o,c,r)}" stroke="#648ca5" stroke-width="4" fill="none"/>`).join("");for(const o of r.components)o.id==="amp"&&(!t.ammeter||t.ammeter==="missing")||o.id==="volt"&&(!t.voltmeter||t.voltmeter==="missing")||(s+=`<g transform="translate(${o.x} ${o.y})">${ue({...o,display:le(o.id==="amp"?a.current:a.voltage),range:o.id==="amp"?10:20},"science")}</g>`);s+=n.wires.flat().filter((o,c,l)=>l.indexOf(o)===c&&l.filter(u=>u===o).length>1).map(o=>{const c=Se(r,o);return`<circle cx="${c.x}" cy="${c.y}" r="4" fill="#476b82"/>`}).join(""),s+=`<g data-meter-slot="series" tabindex="0" role="button" aria-label="Ամպերաչափի հաջորդական տեղը"><rect x="192" y="32" width="96" height="116" rx="12" fill="transparent" stroke="#6b9cb9" stroke-dasharray="4 4"/>${!t.ammeter||t.ammeter==="missing"?G(240,96,"Ա"):""}</g><g data-meter-slot="parallel" tabindex="0" role="button" aria-label="Վոլտաչափի զուգահեռ տեղը"><rect x="382" y="167" width="96" height="116" rx="12" fill="transparent" stroke="#6b9cb9" stroke-dasharray="4 4"/>${!t.voltmeter||t.voltmeter==="missing"?G(430,231,"Վ"):""}</g>`}if(["electricity","parallel","current"].includes(e)&&(s=`${tt("science")}<path d="${e==="current"||e==="meters"?"M30 165V70H150M270 70H540V285H150V165":"M30 165V70H540V285H150V165"}" fill="none" stroke="#789bab" stroke-width="5"/><g transform="translate(90 165)">${ue({type:"battery",voltage:t.voltage},"science")}</g>`,e==="parallel"?s+=`<path d="M190 70V285M190 185H540" stroke="#789bab" stroke-width="5" fill="none"/><g transform="translate(345 70)">${ue({type:"resistor",resistance:t.r1??t.resistance},"science")}</g><g transform="translate(345 185)">${ue({type:"resistor",resistance:t.r2},"science")}</g>${G(345,113,"R₁ = "+t.r1+" Օմ")}${G(345,230,"R₂ = "+t.r2+" Օմ")}`:s+=`<g transform="translate(345 70)">${ue({type:"resistor",resistance:t.resistance},"science")}</g>${G(345,115,t.resistance+" Օմ")}`,e==="current"&&(s+=`<g transform="translate(210 70)">${ue({type:"switch",closed:t.closed!==!1},"science")}</g>${a.current>0?'<path d="M255 245H420m-8-6 8 6-8 6M420 320H255m8-6-8 6 8 6" fill="none" stroke="#a99265" stroke-width="3"/>':""}${G(320,232,"Էլեկտրոնների դրեյֆը՝ →")}${G(320,350,"Պայմանական հոսանքը՝ ←")}`)),["acceleration","force","friction"].includes(e)&&(s=ba+Array.from({length:5},(n,i)=>{const r=qn(e,t,a);return G(60+i*127.5,326,le(e==="acceleration"?i*r/4:(i/2-1)*r)+" մ")}).join("")+`<g data-motion>${e==="acceleration"?Xr:Zt}<path data-force-arrow d="M0-58h${e==="acceleration"?35:t.force*2}" stroke="#bd805b" stroke-width="5"/><circle r="42" fill="transparent" data-direct="push" tabindex="0" role="button" aria-label="Քաշիր՝ ուժը կամ արագացումը փոխելու համար"/></g>`),e==="incline"&&(s=`<path d="M${590-480*Math.cos(Ce(t.angle))} 300H590V${300-480*Math.sin(Ce(t.angle))}Z" fill="#e6e3d2" stroke="#b7bda6"/><g transform="translate(590 ${300-480*Math.sin(Ce(t.angle))}) rotate(${-t.angle})"><path d="M-480 0H0" stroke="#83967b" stroke-width="6"/><g data-motion>${Zt}</g></g>${G(108,334,t.angle+"°")}${Be("incline",150,290,"Քաշիր՝ հարթության թեքությունը փոխելու համար")}`),e==="fall"&&(s=ba+`<path d="M180 45V292" stroke="#bacbbb" stroke-dasharray="4 7"/>${G(125,53,t.height+" մ")}${G(125,292,"0 մ")}<g data-falling>${Zt}</g><g transform="translate(430 65)"><rect width="38" height="180" rx="6" fill="#e3e9dc"/><rect x="70" width="38" height="180" rx="6" fill="#e3e9dc"/><rect data-potential width="38" fill="#87a478"/><rect data-kinetic x="70" width="38" fill="#d6b16b"/>${G(19,210,"Eպ")}${G(89,210,"Eկ")}</g>`),e==="pressure"&&(s=ba+`<g transform="translate(320 235)">${Zt}</g><rect x="${320-90*Math.sqrt(t.area/.02)}" y="270" width="${180*Math.sqrt(t.area/.02)}" height="18" rx="6" fill="#8caa86"/><path d="M320 65v85m-12-15 12 15 12-15" fill="none" stroke="#ba8056" stroke-width="5"/>${G(320,52,le(t.mass*ye)+" Ն")}${G(320,335,t.area+" մ²")}`),["hydrostatic","buoyancy"].includes(e))if(s='<path d="M105 50V295Q105 310 120 310H520Q535 310 535 295V50" fill="#f7faf5" stroke="#adc2c4" stroke-width="3"/><path d="M107 100H533V294H107Z" fill="#d9eaf0"/><path d="M107 100Q160 94 210 100T315 100T420 100T533 100" fill="none" stroke="#93b7c6" stroke-width="2"/>',e==="hydrostatic"){const n=100+t.depth/5*180;s+=`<path d="M445 100V${n}" stroke="#6c8d9b" stroke-dasharray="4 5"/>${G(493,(100+n)/2,t.depth+" մ")}<circle cx="300" cy="${n}" r="20" fill="#faf9f1" stroke="#7391a0" stroke-width="3"/><path d="M300 ${n}l${Math.sin(t.depth/5*Math.PI*1.5)*14} ${-Math.cos(t.depth/5*Math.PI*1.5)*14}" stroke="#b98760" stroke-width="3"/>${Be("depth",300,n,"Քաշիր ճնշաչափը՝ խորությունը փոխելու համար")}`}else{const n=50*Math.cbrt(t.volume/.002),i=a.floating?100-n/2+a.fraction*n:285-n/2;s+=`<rect x="${320-n/2}" y="${i-n/2}" width="${n}" height="${n}" rx="5" fill="#d8c59d" stroke="#a48e65"/><path d="M320 ${i-n/2-10}v${-a.force*2}" stroke="#6c9e85" stroke-width="4"/><path d="M320 ${i+n/2+5}v${a.weight*2}" stroke="#c58b64" stroke-width="4"/>${G(320,341,a.floating?"Լողում է":"Սուզվում է․ հատակի հենարանն անտեսված է")}`}if(e==="heat"&&(s=`${[160,440].map((n,i)=>`<path d="M${n-70} 70V280Q${n-70} 295 ${n-55} 295H${n+55}Q${n+70} 295 ${n+70} 280V70" fill="#f8faf4" stroke="#adc2bc" stroke-width="3"/><rect data-water="${i}" x="${n-68}" width="136" height="145" y="145" fill="${i===0?"#e5c3a9":"#c8dfeb"}"/><path d="M${n+40} 105V262" stroke="#fff" stroke-width="13" stroke-linecap="round"/><path data-thermometer="${i}" d="M${n+40} 250V190" stroke="#c78c64" stroke-width="6" stroke-linecap="round"/>${G(n,330,i===0?t.mass+" կգ":"1 կգ · սկզբում՝ 20 °C")}`).join("")}<path d="M232 195H368" stroke="#b3b9a1" stroke-width="12"/>${G(300,169,"Ջերմային կապ")}${Be("temperature",200,180,"Քաշիր՝ սկզբնական ջերմաստիճանը փոխելու համար")}`),e==="waves"&&(s=`<path d="M40 175H610" stroke="#bacac6" stroke-dasharray="4 5"/><path data-wave fill="none" stroke="#709fb5" stroke-width="4"/><path d="M65 300H605m-8-6 8 6-8 6" fill="none" stroke="#9baba0"/>${Array.from({length:5},(n,i)=>G(50+140*i,325,i+" մ")).join("")}<path d="M70 65h${Math.min(500,a.wavelength*140)}m-7-6 7 6-7 6" stroke="#ba9a60" stroke-width="3" fill="none"/>${G(320,50,"λ = "+le(a.wavelength)+" մ")}`),e==="reflection"){const n={x:320,y:215},i=165,r=a.n,o={x:-r.y,y:r.x};s=`<path d="M${n.x-150*o.x} ${n.y-150*o.y}L${n.x+150*o.x} ${n.y+150*o.y}" stroke="#8fa9af" stroke-width="12"/><path d="M${n.x-140*r.x} ${n.y-140*r.y}L${n.x+140*r.x} ${n.y+140*r.y}" stroke="#a9b7ad" stroke-dasharray="5 6"/><path d="M${n.x-a.d.x*i} ${n.y-a.d.y*i}L320 215L${n.x+a.reflected.x*i} ${n.y+a.reflected.y*i}" stroke="#c6a054" stroke-width="4" fill="none"/><circle cx="${n.x-a.d.x*i}" cy="${n.y-a.d.y*i}" r="13" fill="#e3c57e"/>${G(320,330,"Անկյունները չափում ենք նորմալի նկատմամբ")}${Be("source",n.x-a.d.x*i,n.y-a.d.y*i,"Քաշիր լույսի աղբյուրը")}${Be("mirror",460,215,"Քաշիր՝ հայելին պտտելու համար")}`}if(e==="refraction"){const n=Ce(t.angle),i=a.tir?null:Ce(a.angle);s=`<rect x="35" y="180" width="570" height="155" rx="12" fill="#deedf1"/><path d="M35 180H605M320 35V325" stroke="#a4b9be" stroke-dasharray="5 6" fill="none"/><path d="M${320-155*Math.sin(n)} ${180-155*Math.cos(n)}L320 180L${320+155*Math.sin(n)} ${180-155*Math.cos(n)}" fill="none" stroke="#c29c54" stroke-width="3"/>${i!==null?`<path d="M320 180L${320+155*Math.sin(i)} ${180+155*Math.cos(i)}" stroke="#5f9cae" stroke-width="4"/>`:G(190,240,"Լրիվ ներքին անդրադարձում")}${G(550,155,"n₁ = "+le(t.n1))}${G(550,225,"n₂ = "+le(t.n2))}`}if(e==="lens"){const i=320-t.object*175,r=a.infinite?0:Math.max(-100,Math.min(100,60*a.magnification)),o=a.infinite?605:320+a.image*175;s=`<path d="M30 200H610" stroke="#b6c8bd"/><path d="M320 55Q350 200 320 330Q290 200 320 55Z" fill="#deedf1" stroke="#8baeb8" stroke-width="2"/><path d="M${i} 200V140m-7 10 7-10 7 10" stroke="#74986d" stroke-width="5"/>${G(i,235,"Առարկա")}${[-1,1].map(c=>`<circle cx="${320+c*t.focal*175}" cy="200" r="4" fill="#ac9a6b"/>${G(320+c*t.focal*175,226,"F")}`).join("")}<path d="M${i} 140H320L${Math.min(610,Math.max(30,o))} ${a.infinite?140:200-r}" fill="none" stroke="#c7a059" stroke-width="3"/><path d="M${i} 140L320 200L${Math.min(610,Math.max(30,o))} ${a.infinite?260:200-r}" fill="none" stroke="#7097ad" stroke-width="3"/>${!a.infinite&&o>=30&&o<=610?`<path d="M${o} 200V${200-r}" stroke="#b78667" stroke-width="5" ${a.real?"":'stroke-dasharray="5 5"'}/>`:""}${G(320,355,a.infinite?"Պատկերը՝ անվերջությունում":a.real?"Իրական պատկեր․ գծանկարը չափային սահմանափակում ունի":"Կեղծ պատկեր․ առարկան կիզակետից ներս է")}${Be("object",i,145,"Քաշիր առարկան՝ հեռավորությունը փոխելու համար")}`}if(e==="magnet"){const n={x:220,y:185},i=150;let r="";for(let l=-1;l<=2;l+=.4)for(let u=-1;u<=1;u+=.4){if(l*l+u*u<.18)continue;const p=Js({x:l,y:u,moment:t.moment}),y=Math.atan2(-p.by,p.bx),h=n.x+l*i,v=n.y-u*i;r+=`<g transform="translate(${h} ${v}) rotate(${y*180/Math.PI})"><path d="M-8 0H8m-5-4 5 4-5 4" fill="none" stroke="#a9bbb0" stroke-width="1.5"/></g>`}const o=n.x+t.x*i,c=n.y-t.y*i;s=r+`<rect x="155" y="164" width="130" height="42" rx="8" fill="#9cb3c0"/><path d="M220 164h57q8 0 8 8v26q0 8-8 8h-57Z" fill="#cb9274"/>${G(182,193,"S")}${G(255,193,"N")}<g transform="translate(${o} ${c})"><circle r="28" fill="#fdfcf3" stroke="#acbcae"/><g transform="rotate(${-a.angle*180/Math.PI})"><path d="M-23 0 0-7 23 0 0 7Z" fill="#b8c5c9"/><path d="M0-7 23 0 0 7Z" fill="#c78e70"/></g></g>${Be("compass",o,c,"Քաշիր կողմնացույցը՝ դաշտի ուղղությունը չափելու համար")}`}return e==="induction"&&(s=`<path d="M250 120V75H460V280H250V240" stroke="#859d9e" stroke-width="4" fill="none"/>${Array.from({length:7},(n,i)=>`<ellipse cx="${245+i*13}" cy="180" rx="15" ry="72" fill="none" stroke="#be9b6b" stroke-width="5"/>`).join("")}<g data-induction-magnet><rect x="-65" y="-22" width="130" height="44" rx="7" fill="#9eb6bd"/><path d="M0-22h59q6 0 6 6v32q0 6-6 6H0Z" fill="#ca977c"/>${G(-35,6,"S")}${G(35,6,"N")}</g><rect x="405" y="145" width="110" height="62" rx="10" fill="#ecf1e4" stroke="#a2b397"/>${G(460,184,le(a.emf)+" Վ")}`),e==="robot"&&(s=`<rect x="35" y="35" width="570" height="285" rx="14" fill="#eff3e9" stroke="#b1c1ac"/>${Array.from({length:9},(n,i)=>`<path d="M${35+i*71.25} 35V320" stroke="#dce4d5"/>`).join("")}${Array.from({length:5},(n,i)=>`<path d="M35 ${35+i*71.25}H605" stroke="#dce4d5"/>`).join("")}<rect x="320" y="134.75" width="42.75" height="114" rx="7" fill="#d5c6ac" stroke="#b5a184"/><path data-robot-trail fill="none" stroke="#a7b996" stroke-width="2" stroke-dasharray="4 4"/><path data-robot-sensor stroke="#c7ac6a" stroke-width="2" stroke-dasharray="5 5"/><g data-robot-pose><ellipse rx="22" ry="19" fill="#f4ecda" stroke="#a3ab91" stroke-width="2"/><rect x="-14" y="-25" width="27" height="10" rx="4" fill="#6c7e64"/><rect x="-14" y="15" width="27" height="10" rx="4" fill="#6c7e64"/><path d="M-3-15v-9M-3 15v9" stroke="#d2bf91" stroke-width="3"/><rect x="3" y="-10" width="16" height="20" rx="6" fill="#4f5b51"/><circle cx="12" cy="-5" r="2" fill="#e3be6b"/><circle cx="12" cy="5" r="2" fill="#e3be6b"/></g>${G(320,350,"Դաշտ՝ 8 մ × 4 մ · անիվների միջև՝ 0.4 մ")}`),`<svg class="science-stage" viewBox="0 0 640 370" aria-label="Փորձի կենդանի տեսարան"><defs><marker id="science-force-head" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 8 4 0 8Z" fill="#bc8960"/></marker></defs>${s}</svg>`}function qn(e,t,a){return Math.max(4,e==="acceleration"?Nt(5,t).x:Math.abs(a.a)*8)}function _r(e,t,a,s,n,i=[]){const r=(o,c,l)=>e.querySelector(o)?.setAttribute(c,l);if(["acceleration","force","friction"].includes(t)){const o=qn(t,a,s),c=t==="acceleration"?60+s.x/o*510:320+s.x/o*250;r("[data-motion]","transform",`translate(${c} 263)`)}if(t==="incline"&&r("[data-motion]","transform",`translate(${-Math.min(480,s.x/Math.max(3,s.a*8)*480)} -32)`),t==="fall"){r("[data-falling]","transform",`translate(200 ${255-s.y/a.height*190})`);for(const[o,c]of[["potential",s.potential],["kinetic",s.kinetic]])r(`[data-${o}]`,"height",c/s.total*180),r(`[data-${o}]`,"y",180-c/s.total*180)}if(t==="heat")for(const[o,c]of[s.hot,s.cold].entries())r(`[data-thermometer="${o}"]`,"d",`M${[200,480][o]} 250V${250-c*1.5}`);if(t==="waves"&&r("[data-wave]","d",Array.from({length:161},(o,c)=>`${c?"L":"M"}${50+c/160*560} ${175-$a(a,c/40,n).y*300}`).join("")),t==="induction"&&r("[data-induction-magnet]","transform",`translate(${320+s.x*100} 180)`),t==="robot"){const o=35+s.x*71.25,c=320-s.y*71.25;r("[data-robot-pose]","transform",`translate(${o} ${c}) rotate(${-s.angle*180/Math.PI})`),r("[data-robot-sensor]","d",`M${o} ${c}l${s.sensor*71.25*Math.cos(s.angle)} ${-s.sensor*71.25*Math.sin(s.angle)}`),r("[data-robot-trail]","d",i.map((l,u)=>`${u?"L":"M"}${35+l.x*71.25} ${320-l.y*71.25}`).join(""))}}function In(e,t=0){if(!e.values.length)return'<p class="model-note">Այս փորձի համար չափումների համեմատությունն ավելի օգտակար է, քան ժամանակային գրաֆիկը։</p>';const a=[...e.values,...e.second||[]],s=Math.min(0,...a.map(c=>c[1])),n=Math.max(.001,...a.map(c=>c[1])),i=n-s||1,r=([c,l])=>[52+c/e.maxT*360,215-(l-s)/i*165],o=c=>c.map((l,u)=>`${u?"L":"M"}${r(l).join(" ")}`).join("");return`<svg class="science-graph" viewBox="0 0 450 270" role="img" aria-label="${e.y} մեծության կախումը ${e.x}-ից"><defs><clipPath id="science-graph-clip"><rect data-graph-clip x="52" y="30" height="190" width="${Math.min(1,t/e.maxT)*360}"/></clipPath></defs>${[0,.5,1].map(c=>`<path d="M52 ${215-c*165}H412" stroke="#dbe4d7"/><text x="44" y="${220-c*165}" text-anchor="end" font-size="16">${le(s+c*i)}</text>`).join("")}<path d="M52 40V215H412" fill="none" stroke="#8a9c8c"/><path d="${o(e.values)}" fill="none" stroke="#648b71" stroke-width="2" stroke-dasharray="4 5"/><path d="${o(e.values)}" fill="none" stroke="#648b71" stroke-width="3" clip-path="url(#science-graph-clip)"/>${e.second?`<path d="${o(e.second)}" fill="none" stroke="#bb915d" stroke-width="3"/>`:""}<text x="20" y="25" font-size="17">${e.y}</text>${[0,.5,1].map(c=>`<text x="${52+c*360}" y="240" text-anchor="middle" font-size="16">${le(c*e.maxT)}</text>`).join("")}<text x="370" y="266" font-size="16">${e.x}</text><path data-graph-cursor d="M52 42V215" stroke="#bb915d" stroke-width="1.5"/></svg><p class="model-note">Կետագիծը՝ մոդելի հաշվարկը։ Հոծ կանաչ գիծը՝ անցած ժամանակի հատվածը։ Երկու կորի դեպքում երկրորդը ոսկեգույն է։</p>`}const Ee=(e,t,a)=>Math.max(t,Math.min(a,e));function Or(e,t={}){return{parameters:e.startsWith("legacy-")?kn(e,t):{...Mn(e),...t},time:0,robot:{x:1,y:2,angle:0,distance:0},trail:[]}}function Jr(e,t){if(e.startsWith("legacy-"))return Wr(e,t);const a=da[e],s=t.parameters,n=Sn(e,s,t.time,t.robot),i=e==="cell"?[["zinc","Ցինկի էլեկտրոդ"],["copper","Պղնձի էլեկտրոդ"],["solution","Էլեկտրոլիտներ"],["bridge","Աղային կամուրջ"],["wire","Արտաքին բեռի լար"],["meter","Վոլտաչափ"]]:e==="current"?[["closed","Փակ անջատիչ"]]:e==="robot"?[["avoid","Արգելքը տեսնելիս շրջվել"]]:[];return`<section class="science-lab" data-science-kind="${e}"><div class="science-visual">${An(e,s,n)}${e==="charges"?'<p class="charge-model-caption">Գնդիկները պահվում են տեղում։ Սլաքները ցույց են տալիս ուժի ուղղությունը, իսկ նրանց երկարությունը պայմանական է։</p>':""}</div><div class="science-readouts" aria-label="Կենդանի չափումներ">${n.readings.map((r,o)=>`<div><span>${r.label}</span><strong data-reading="${o}">${le(r.value)} <small>${r.unit}</small></strong></div>`).join("")}</div><p class="science-status" role="status"></p>${e==="charges"?Br(s,t):""}<div class="science-parameters">${a.params.map(r=>`<label for="science-${r.key}">${r.label}<strong data-parameter-label="${r.key}">${le(s[r.key])} ${r.unit}</strong><input id="science-${r.key}" data-science-param="${r.key}" type="range" min="${r.min}" max="${r.max}" step="${r.step}" value="${s[r.key]}"></label>`).join("")}</div>${e==="symbols"?`<label class="field-label">Ընտրիր տարրը<select id="science-symbol">${[["battery","Մարտկոց"],["lamp","Լամպ"],["switch","Անջատիչ"],["resistor","Դիմադրիչ"]].map(([r,o])=>`<option value="${r}" ${(s.part||"battery")===r?"selected":""}>${o}</option>`).join("")}</select></label>`:""}${e==="meters"?`<div class="meter-placement"><label>Ամպերաչափի միացում<select data-meter-placement="ammeter"><option value="missing">Տեղադրիր սարքը</option><option value="series" ${s.ammeter==="series"?"selected":""}>Հաջորդական տեղում</option><option value="parallel" ${s.ammeter==="parallel"?"selected":""}>Զուգահեռ տեղում</option></select></label><label>Վոլտաչափի միացում<select data-meter-placement="voltmeter"><option value="missing">Տեղադրիր սարքը</option><option value="parallel" ${s.voltmeter==="parallel"?"selected":""}>Բեռին զուգահեռ</option><option value="series" ${s.voltmeter==="series"?"selected":""}>Շղթայի մեջ հաջորդաբար</option></select></label></div>`:""}${e==="cell"?'<details class="cell-reactions"><summary>Կիսառեակցիաներն ու տեղափոխության ուղղությունները</summary><p>Անոդ՝ Zn → Zn²⁺ + 2e⁻։ Կաթոդ՝ Cu²⁺ + 2e⁻ → Cu։</p><p>Արտաքին էլեկտրոններ՝ Zn → Cu, պայմանական հոսանքը՝ հակառակ։ Կամրջի անիոնները՝ անոդային, կատիոնները՝ կաթոդային լուծույթ։ Ուղղությունները որակական են։</p></details>':""}${i.length?`<details class="science-parts"><summary>${e==="cell"?"Տարրի մասերն ու կապերը":"Կառավարման պայմանը"}</summary>${i.map(([r,o])=>`<label><input type="checkbox" data-science-toggle="${r}" ${s[r]!==!1&&r!=="avoid"||s[r]===!0?"checked":""}>${o}</label>`).join("")}</details>`:""}<div class="science-controls">${a.static?"":'<button class="button secondary" id="science-run">Սկսել փորձը</button><span id="science-time">0 վ</span>'}<button class="text-button" id="science-reset">Սկսել սկզբից</button><button class="button" id="science-record">${["atom","transfer","symbols"].includes(e)?"Գրանցել դիտարկումը":"Գրանցել չափումը"}</button></div><details class="science-graph-details"><summary>${e==="charges"?"Ուժը՝ հեռավորությունից կախված":"Բացել գրաֆիկը"}</summary><div class="science-graph-wrap">${In(n.graph,a.static?n.graph.maxT:t.time)}</div></details></section>`}function el(e,t,a,s,n,i){if(t.startsWith("legacy-"))return Kr(e,t,a,s,n,i);const r=da[t],o=a.parameters;let c=!1,l,u=0,p=!1;const y=()=>Sn(t,o,a.time,a.robot),h=()=>{c=!1,cancelAnimationFrame(l)};function v(){const b=y(),w=document.createElement("div");w.innerHTML=An(t,o,b);const $=e.querySelector(".science-stage");$?$.innerHTML=w.firstElementChild.innerHTML:e.querySelector(".science-visual").append(w.firstElementChild),e.querySelector(".science-graph-wrap").innerHTML=In(b.graph,r.static?b.graph.maxT:a.time),x(),g()}function g(){if(p)return;const b=y();_r(e,t,o,b,a.time,a.trail),b.readings.forEach((q,I)=>{const L=e.querySelector(`[data-reading="${I}"]`);L&&(L.innerHTML=`${le(q.value)} <small>${q.unit}</small>`)});const w=e.querySelector("[data-graph-cursor]"),$=r.static?t==="charges"?b.distance/b.graph.maxT:t==="electricity"||t==="meters"?o.voltage/b.graph.maxT:1:a.time/b.graph.maxT;w?.setAttribute("d",`M${52+Ee($,0,1)*360} 42V215`),e.querySelector("[data-graph-clip]")?.setAttribute("width",t==="charges"?360:Ee($,0,1)*360);const k=e.querySelector("#science-run");k&&(k.textContent=c?"Դադարեցնել":a.time?"Շարունակել":"Սկսել փորձը");const M=e.querySelector("#science-time");if(M&&(M.textContent=le(a.time)+" վ"),t==="charges"){const q=we(o).distance;e.querySelector("#charge-distance").value=q,e.querySelector("#charge-distance-label").textContent=le(q)+" մ",e.querySelector("#charge-evidence").innerHTML=hn(o,a.reference),e.querySelector("#charge-double").disabled=q>1.4+1e-8,e.querySelector("#charge-half").disabled=q<.8-1e-8,e.querySelectorAll("[data-charge-preset]").forEach(I=>I.setAttribute("aria-pressed",String(I.dataset.chargePreset==="opposite"?o.q1*o.q2<0:I.dataset.chargePreset==="positive"?o.q1>0&&o.q2>0:o.q1<0&&o.q2<0)))}e.querySelector("#science-record").disabled=!r.static&&a.time<.1||b.unsafe||a.requireSustained&&(!b.sustained||o.meter===!1)||t==="meters"&&(o.ammeter!=="series"||o.voltmeter!=="parallel")||t==="cell"&&!b.valid,e.querySelector(".science-status").textContent=b.unsafe?"Ամպերաչափը աղբյուրին զուգահեռ միացնելիս իդեալական կարճ միացում է ստացվում։ Տեղադրիր այն հաջորդաբար։":t==="meters"&&o.voltmeter==="series"?"Իդեալական վոլտաչափը հաջորդաբար տեղադրելիս ճանապարհը բաց է․ հոսանքը զրո է։":t==="cell"&&!b.valid?"Ստուգիր երկու էլեկտրոդները, համապատասխան էլեկտրոլիտներն ու իոնային կապը։ ԷԼՇ չենք ցուցադրում։":t==="refraction"&&b.tir?"Լրիվ ներքին անդրադարձում․ բեկված ճառագայթ չկա։":t==="lens"&&b.infinite?"Առարկան կիզակետում է․ վերջավոր պատկերի հեռավորություն չկա։":t==="robot"&&b.collision?"Ռոբոտը հասավ արգելքին։ Փոխիր պայմանը և սկսիր նոր փորձ։":""}function m(){h(),a.time=0,a.robot={x:1,y:2,angle:0,distance:0},a.trail=[]}function d(b,w){o[b]=w,m();const $=r.params.find(k=>k.key===b);$&&(e.querySelector(`[data-science-param="${b}"]`).value=w,e.querySelector(`[data-parameter-label="${b}"]`).textContent=le(w)+" "+$.unit),v(),s()}function f(b){if(!c||p)return;if(document.hidden){h(),g(),s();return}const w=Math.min(.05,(b-u)/1e3)*(r.rate||1);u=b;const $=t==="fall"?It(o).duration:r.duration;if(a.time=Math.min($,a.time+w),t==="robot"){let k=w;for(;k>1e-9;){const M=Math.min(.01,k);a.robot=qo(a.robot,o,M),k-=M}a.trail.length<1200&&a.trail.push({x:a.robot.x,y:a.robot.y}),a.robot.collision&&h()}a.time>=$&&h(),g(),c?l=requestAnimationFrame(f):s()}if(e.querySelector("#science-run")?.addEventListener("click",()=>{if(c)h();else{const b=t==="fall"?It(o).duration:r.duration;a.time>=b&&m(),c=!0,u=performance.now(),l=requestAnimationFrame(f)}g(),s()}),e.querySelector("#science-reset").onclick=()=>{t==="charges"&&delete a.reference;const b=a.initial||{};Object.keys(o).forEach(w=>delete o[w]),Object.assign(o,Mn(t),b),m(),r.params.forEach(w=>{e.querySelector(`[data-science-param="${w.key}"]`).value=o[w.key],e.querySelector(`[data-parameter-label="${w.key}"]`).textContent=le(o[w.key])+" "+w.unit}),e.querySelectorAll("[data-science-toggle]").forEach(w=>w.checked=w.dataset.scienceToggle==="avoid"?o.avoid===!0:o[w.dataset.scienceToggle]!==!1),e.querySelector("#science-symbol")&&(e.querySelector("#science-symbol").value=o.part||"battery"),e.querySelectorAll("[data-meter-placement]").forEach(w=>w.value=o[w.dataset.meterPlacement]||"missing"),v(),s()},e.querySelector("#science-symbol")?.addEventListener("change",b=>d("part",b.target.value)),e.querySelectorAll("[data-science-param]").forEach(b=>b.oninput=()=>d(b.dataset.scienceParam,Number(b.value))),e.querySelectorAll("[data-science-toggle]").forEach(b=>b.onchange=()=>d(b.dataset.scienceToggle,b.checked)),e.querySelectorAll("[data-meter-placement]").forEach(b=>b.onchange=()=>d(b.dataset.meterPlacement,b.value)),t==="charges"){const b=w=>{o.x1=-w/2,o.x2=w/2,o.y1=o.y2=0,m(),v(),s()};e.querySelector("#charge-distance").oninput=w=>b(Number(w.target.value)),e.querySelector("#charge-double").onclick=()=>b(Math.min(2.8,we(o).distance*2)),e.querySelector("#charge-half").onclick=()=>b(Math.max(.4,we(o).distance/2)),e.querySelector("#charge-reference").onclick=()=>{a.reference={...o},g(),s()},e.querySelectorAll("[data-charge-preset]").forEach(w=>w.onclick=()=>{const $=w.dataset.chargePreset;o.q1=$==="negative"?-Math.abs(o.q1||2):Math.abs(o.q1||2),o.q2=$==="positive"?Math.abs(o.q2||2):-Math.abs(o.q2||2);for(const k of["q1","q2"])e.querySelector(`[data-science-param="${k}"]`).value=o[k],e.querySelector(`[data-parameter-label="${k}"]`).textContent=le(o[k])+" նԿլ";m(),v(),s()})}e.querySelector("#science-record").onclick=()=>{h(),t==="charges"&&!a.reference&&(a.reference={...o}),g(),n({parameters:{...o},time:a.time,robot:{...a.robot},reading:Yr(y()),created:Date.now()})};function x(){const b=e.querySelector(".science-stage");if(!b)return;const w=k=>{const M=b.createSVGPoint();return M.x=k.clientX,M.y=k.clientY,M.matrixTransform(b.getScreenCTM().inverse())},$=(k,M)=>{if(k==="charge1"||k==="charge2"){const T=k==="charge1"?1:2,V=T===1?2:1,D=Ee((M.x-320)/150,-1.5,1.5),Z=Ee((180-M.y)/150,-.8,.8);if(Math.hypot(D-(o["x"+V]??(V===1?-.7:.7)),Z-(o["y"+V]??0))<.2)return;o["x"+T]=D,o["y"+T]=Z,m(),v(),s();return}if(k==="probe"){const T=(M.x-320)/155,V=(180-M.y)/155;if(Math.hypot(T,V)<.2)return;o.x=Ee(T,-1.5,1.5),o.y=Ee(V,-.9,.9),m(),v(),s();return}const q={push:[t==="acceleration"?"a":"force",t==="acceleration"?(M.x-70)/150:(M.x-70)/15],incline:["angle",(300-M.y)/4],depth:["depth",(M.y-100)/36],temperature:["temperature",(270-M.y)/2],source:["incoming",Math.atan2(320-M.x,215-M.y)*180/Math.PI],mirror:["tilt",(M.y-215)/3],object:["object",(320-M.x)/175],compass:["x",(M.x-220)/150],transfer:["electrons",(o.electrons||0)+1]};k==="compass"&&(o.y=Ee((185-M.y)/150,-.9,.9));const[I,L]=q[k]||[],E=r.params.find(T=>T.key===I);E&&d(I,Ee(Math.round(L/E.step)*E.step,E.min,E.max))};b.onpointerdown=k=>{const M=k.target.closest("[data-direct]");M&&(k.preventDefault(),b.dataset.drag=M.dataset.direct,b.setPointerCapture(k.pointerId))},b.onpointermove=k=>{if(!b.dataset.drag||b.dataset.drag==="transfer")return;const M=b.dataset.drag;$(M,w(k));const q=e.querySelector(".science-stage");q.dataset.drag=M},b.onpointerup=k=>{const M=b.dataset.drag;M==="transfer"&&$(M,w(k)),delete b.dataset.drag,b.hasPointerCapture(k.pointerId)&&b.releasePointerCapture(k.pointerId)},b.onpointercancel=()=>delete b.dataset.drag,e.querySelectorAll("[data-direct]").forEach(k=>k.onkeydown=M=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"].includes(M.key))return;M.preventDefault();const q=k.dataset.direct,I={push:t==="acceleration"?"a":"force",incline:"angle",depth:"depth",temperature:"temperature",source:"incoming",mirror:"tilt",object:"object",compass:"x"};if(I[q]){const E=r.params.find(T=>T.key===I[q]);d(E.key,Ee(o[E.key]+(["ArrowLeft","ArrowDown"].includes(M.key)?-1:1)*E.step,E.min,E.max)),e.querySelector(`[data-direct="${q}"]`)?.focus();return}if(q==="transfer"){d("electrons",Ee((o.electrons||0)+(M.key==="ArrowLeft"?-1:1),-6,6));return}const L={x:Number(k.getAttribute("cx"))+(M.key==="ArrowLeft"?-15:M.key==="ArrowRight"?15:0),y:Number(k.getAttribute("cy"))+(M.key==="ArrowUp"?-15:M.key==="ArrowDown"?15:0)};$(q,L),e.querySelector(`[data-direct="${q}"]`)?.focus()}),e.querySelectorAll("[data-meter-slot]").forEach(k=>{k.onclick=()=>{const M=k.dataset.meterSlot==="series"?"ammeter":"voltmeter",q=e.querySelector(`[data-meter-placement="${M}"]`);q.value=k.dataset.meterSlot,d(M,k.dataset.meterSlot)},k.onkeydown=M=>{["Enter"," "].includes(M.key)&&(M.preventDefault(),k.onclick())}})}return x(),g(),()=>{p=!0,h(),s()}}const Cs=["Իրավիճակ","Կանխատեսում","Առաջին փորձ","Դիտարկում","Բացատրություն","Փորձի փոփոխություն","Կապերի ստուգում","Հիմնավորում","Գնահատման չափանիշներ","Ինքնուրույն ստուգում","Արդյունք"],As=e=>JSON.stringify(Object.fromEntries(Object.entries(e).sort(([t],[a])=>t.localeCompare(a))));function tl(e,t,a){let s="charges",n="",i="thinking",r=!1,o=0;const c=()=>ze.find(g=>g.id===s),l=()=>{const g=e();g.investigations||={};const m=c();if(g.investigations[s])return g.investigations[s];const d={version:1,stage:0,unlockedStage:0,prediction:{},draft:{},quiz:[],quizIndex:0,runs:[],experiment:{...Or(m.kind,m.initial),initial:{...m.initial},requireSustained:m.id==="cell-assembly",probeFocus:m.probeFocus,fixedComponent:m.fixedComponent}},f=g.electricLessons?.[s];if(g.investigationMigrations||={},f&&!g.investigationMigrations[s]&&(g.investigationMigrations[s]=!0,d.legacyRecord=structuredClone(f),d.stage=Math.min(f.stage||0,4),d.unlockedStage=d.stage,d.runs=(f.experiments||[]).map(x=>({...x,time:x.parameters?.elapsed||0,parameters:{resistance:100,...x.parameters}})),Object.assign(d.experiment.parameters,f.parameters||{}),d.reasoning=f.reflection||"",f.completed)){const x=g.learning.lessons[s]?.attempts.at(-1);x&&(d.result=x,d.stage=10,d.unlockedStage=10,d.completed=f.completed)}return g.investigations[s]=d},u=(g="Շարունակել",m=!1)=>`<button class="button lesson-primary" id="investigation-next" ${m?"disabled":""}>${g}</button>`;function p(){const g=l(),m=c();g.unlockedStage=Math.max(g.unlockedStage,g.stage);let d="";if(g.stage===0&&(d=`<h2>${m.context}</h2><p>Կանխատեսումից՝ քո սեփական փորձին։ ${m.classification==="supplementary-electronics"?"Սա լրացուցիչ էլեկտրոնիկայի նյութ է։":"Սա հիմքային հետազոտություն է։"}</p>${u("Սկսել բացահայտումը")}`),g.stage===1&&(d=`<h2>${m.prediction.question}</h2><p>Կանխատեսումը միավոր չի նվազեցնում։ Մենք այն փորձով կստուգենք։</p>${Kt(m.prediction,g.prediction)}${u("Ստուգել փորձով",!et(m.prediction,g.prediction))}`),[2,5].includes(g.stage)){const f=g.runs[g.variationBaseline-1],x=g.runs.at(-1),b=m.id==="charges"&&g.runs.some($=>$.parameters.q1*$.parameters.q2<0)&&g.runs.some($=>$.parameters.q1*$.parameters.q2>0),w=g.stage===2?m.id==="charges"?b:g.runs.length>0:g.runs.length>g.variationBaseline&&As(x.parameters)!==As(f.parameters)&&(m.id!=="charges"||x.parameters.q1===f.parameters.q1&&x.parameters.q2===f.parameters.q2&&Math.abs(we(x.parameters).distance-we(f.parameters).distance)>.001);d=`<h2>${g.stage===2?"Հիմա դու ես փորձարկողը։":"Փոխենք միայն մեկ պայման։"}</h2><p>${g.stage===2?m.task:m.variation}</p>${Jr(m.kind,g.experiment).replace('class="button" id="science-record"',`class="${w?"text-button":"button lesson-primary"}" id="science-record"`)}<details class="model-note"><summary>Փորձի մոդելն ու սահմանները</summary><p>${ne(m.assumptions)}</p></details>${m.id==="charges"&&g.stage===2?`<p class="charge-checklist" role="status">${g.runs.some($=>$.parameters.q1*$.parameters.q2<0)?"✓":"○"} Տարանուն չափում · ${g.runs.some($=>$.parameters.q1*$.parameters.q2>0)?"✓":"○"} Նույնանուն չափում</p>`:""}${w?u(g.stage===2?"Քննարկել դիտարկումը":"Համեմատել և հիմնավորել"):g.stage===5?`<p class="feedback">Նոր համեմատության համար փոխիր պայմանը և գրանցիր չափումը։${m.id==="charges"?" Լիցքերը թող նույնը մնան, փոխիր միայն հեռավորությունը։":""}</p>`:""}<details class="measurement-journal"><summary>Իմ պահպանված չափումները · ${g.runs.length}</summary>${g.runs.map(($,k)=>`<p>${k+1}. ${ne($.reading)} · t = ${$.time.toFixed(2)} վ</p>`).join("")}</details>`}if(g.stage===3&&(d=`<h2>${m.observation.question}</h2><p>Հենվիր քո գրանցած չափման վրա։</p>${Kt(m.observation,g.draft,r)}<p class="feedback" role="status">${ne(n)}</p>${r?u():`<button class="button lesson-primary" id="investigation-check" ${et(m.observation,g.draft)?"":"disabled"}>Ստուգել դիտարկումը</button>${n?'<button class="text-button" id="investigation-hint">Հաջորդ հուշումը</button>':""}`}`),g.stage===4){const f=m.prediction.options?.[g.prediction.choice]??g.prediction.value??(g.prediction.choice!==void 0?String(g.prediction.choice):"Գրանցված չէ"),x=g.runs.at(-1)?.reading||"Չափում դեռ չկա";d=`<h2>Կապենք քո փորձն ու գաղափարը։</h2><p>${m.explanation}</p><div class="prediction-comparison"><p><strong>Քո կանխատեսումն էր՝</strong> «${ne(f)}»։</p><p><strong>Փորձով չափեցինք՝</strong> «${ne(x)}»։</p></div><div class="evidence"><strong>${ne(m.formula)}</strong><p>${ne(x)}</p></div><details><summary>Մոդելի սահմաններն ու միավորները</summary><p>${m.assumptions}</p></details>${u("Փորձել այլ պայմանում")}`}if(g.stage===6){const f=m.assessment[2];d=`<h2>Ո՞ր կապերն են բացատրում փորձդ։</h2><p>Սա փորձնական վարժություն է․ կարող ես օգտվել հուշումից։</p>${Kt(f,g.draft,r)}<p class="feedback" role="status">${ne(n)}</p>${r?u("Ավելացնել իմ հիմնավորումը"):`<button class="button lesson-primary" id="investigation-check" ${et(f,g.draft)?"":"disabled"}>Ստուգել կապերը</button>${n?'<button class="text-button" id="investigation-hint">Հաջորդ հուշումը</button>':""}`}`}if(g.stage===7&&(d=`<h2>Ինչպե՞ս են չափումներդ հիմնավորում եզրակացությունը։</h2><p>Նշիր՝ ինչ փոխեցիր, ինչը պահեցիր նույնը և ինչ արդյունք ստացար։ Քո բացատրությունը կպահենք տետրում․ այն ինքնաշխատ չենք գնահատում։</p><div class="evidence">${g.runs.slice(-2).map(f=>`<p>${ne(f.reading)}</p>`).join("")}</div><label class="field-label" for="investigation-reasoning">Իմ հիմնավորումը</label><textarea id="investigation-reasoning">${ne(g.reasoning||"")}</textarea>${u("Անցնել ինքնուրույն ստուգման",(g.reasoning||"").trim().length<8)}`),g.stage===8&&(d=`<h2>Հիմա կիրառիր կապը նոր իրավիճակում։</h2><p>Երեք առաջադրանք՝ գաղափարի ընտրություն (3 միավոր), թվային խնդիր (3 միավոր), երկու կապի համապատասխանեցում (2-ական միավոր)։ Կանխատեսումը, փորձերը և հուշումներով վարժանքը գնահատականի մաս չեն։</p><div class="rubric"><span>0–4 միավոր · 0 աստղ</span><span>5–6 · 1 աստղ</span><span>7–8 · 2 աստղ</span><span>9–10 · 3 աստղ</span></div>${u("Սկսել ստուգումը")}`),g.stage===9&&(d=ia(g,m.assessment.map((f,x)=>({...f,weight:[3,3,4][x]})))),g.stage===10){const f=e().learning?.lessons?.[s],x=g.result||(f?{stars:f.bestStars,earned:f.bestScore,possible:10}:{stars:0,earned:0,possible:10}),b=x.stars??f?.bestStars??0,w=x.earned??f?.bestScore??0,$=x.possible||10,k=Ht(e(),s,W),M=W.find(L=>L.lessons.some(E=>E.id===s)),q=M?.lessons?.at(-1)?.id===s,I=b>=2?(k?`<button class="button lesson-primary" data-module="${k.id}">Հաջորդ դասը →</button>`:q?'<p>Թեման ավարտված է։</p><button class="button lesson-primary" data-choose-topics>Ընտրել հաջորդ թեման</button>':'<p>Հաջորդ դասը նախապատրաստվում է։ Արդյունքդ պահպանված է։</p><button class="button lesson-primary" data-choose-topics>Ընտրել հաջորդ թեման</button>')+'<button class="text-button" id="investigation-retry">Կրկնել դասը</button><button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>':'<button class="button lesson-primary" id="investigation-retry">Կրկին փորձել</button><button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>';d=`<h2>${b>=2?"Քո փորձն արդեն ունի բացատրություն։":"Վերադառնանք այն կապին, որը դեռ փորձելու կարիք ունի։"}</h2><p>${w} / ${$} միավոր։ Լավագույն արդյունքդ՝ ${f?.bestStars||b} աստղ։</p>${rt(b)}<section class="learning-summary"><h3>Քո բացահայտումը</h3><p>${ne(m.formula)}</p>${g.quiz.map((L,E)=>`<p>${L.points===L.weight?"✓":"↺"} ${ne(m.assessment[E].why)}</p>`).join("")}<details><summary>Իմ հիմնավորումը</summary><p>${ne(g.reasoning||"")}</p></details></section>${I}`}return g.stage===10&&(d+=ra(g)),`<div class="lesson-top"><button class="text-button" data-page="path">← Ուսումնական ուղի</button><span>${g.stage+1} / ${Cs.length}</span><select ${g.stage===9?"disabled":""} id="investigation-stage" aria-label="Վերանայել հետազոտության քայլը">${Cs.slice(0,g.unlockedStage+1).map((f,x)=>`<option value="${x}" ${x===g.stage?"selected":""}>${f}</option>`).join("")}</select></div><div class="lesson-context"><h1>${m.title}</h1></div><div class="lesson-track" role="progressbar" aria-label="Հետազոտության ընթացքը" aria-valuemin="0" aria-valuemax="11" aria-valuenow="${g.stage===10?11:g.stage}"><span style="width:${g.stage===10?100:g.stage/11*100}%"></span></div><section class="lesson-content">${Le(`<div class="story">${d}</div>`,`${s}:${g.stage}:${g.event||0}`,"",g.stage===10?"success-complete":g.stage===9?na(g):g.stage===0?"idle":i)}</section>`}function y(g){g.draft={},n="",i="thinking",o=0,r=!1}function h(g,m){g.result=xt(e(),s,g.quiz.reduce((d,f)=>d+f.points,0),10,{assessment:g.quiz.map(d=>({...d})),runs:g.runs.length,reasoning:g.reasoning},W),g.completed=Date.now(),g.stage=10,e().notes.push({id:crypto.randomUUID(),created:g.completed,lessonId:s,lessonTitle:m.title,prediction:m.prediction.options[g.prediction.choice]||"",settings:g.runs.map(d=>d.reading).join("; "),observation:m.observation.options[g.observation?.choice]||"",explanation:m.formula,conclusion:g.reasoning}),B("complete")}function v(g){const m=l(),d=c(),f=()=>{t(),a()};if(m.stage===9)return oa(g,m,d.assessment.map((b,w)=>({...b,weight:[3,3,4][w]})),t,a,(b,w)=>{m.quiz=b,m.review=w,h(m,d)});const x=m.stage===1?d.prediction:m.stage===3?d.observation:m.stage===6?d.assessment[2]:m.stage===9?d.assessment[m.quizIndex]:null;return x&&Gs(g,m.stage===1?m.prediction:m.draft,b=>{if(t(),b)i="thinking",n="",a();else{const w=g.querySelector("#investigation-next, #investigation-check, #investigation-assess");w&&(w.disabled=!et(x,m.draft))}}),g.querySelector("#investigation-stage").onchange=b=>{let w=Number(b.target.value);w>m.unlockedStage||(w===9&&m.quiz.length===3&&(w=10),m.stage=w,y(m),f())},g.querySelector("#investigation-next")?.addEventListener("click",()=>{m.stage===4&&(m.variationBaseline=m.runs.length,d.id==="charges"&&(m.experiment.reference={...m.runs.at(-1).parameters})),m.stage===9?(m.quizIndex++,m.quizIndex===3&&h(m,d)):m.stage++,y(m),f(),window.scrollTo(0,0)}),g.querySelector("#investigation-check")?.addEventListener("click",()=>{const b=m.stage===3?d.observation:d.assessment[2];r=va(b,m.draft,1)===1,m.event=(m.event||0)+1,r?(n="Ճիշտ կապը գտար։ "+b.why,i="eureka",m.stage===3&&(m.observation=structuredClone(m.draft)),B("correct")):(n="Համեմատիր չափումներդ։ Ո՞ր պայմանն էր փոխվել, իսկ որը՝ մնացել նույնը։",i="confused",m.misconceptions||=[],m.misconceptions.push({stage:m.stage,answer:structuredClone(m.draft),created:Date.now()}),B("incorrect")),f()}),g.querySelector("#investigation-hint")?.addEventListener("click",()=>{o=Math.min(4,o+1);const b=m.stage===3?d.observation:d.assessment[2];n=d.id==="charges"&&m.stage===3?["Նայիր այն չափմանը, որտեղ երկու նշանները նույնն են։","Ուժի սլաքները դեպի մյո՞ւս գնդիկն են, թե՞ նրանից հեռու։","Իրարից հեռու ուղղված սլաքները ցույց են տալիս վանում։",b.why][o-1]:[d.task,"Վերջին չափումդ՝ "+m.runs.at(-1)?.reading,d.explanation,b.type==="matching"?b.pairs.map(w=>w.join(" → ")).join("։ "):b.why][o-1],i="eureka",m.event=(m.event||0)+1,B("hint"),a()}),g.querySelector("#investigation-reasoning")?.addEventListener("input",b=>{m.reasoning=b.target.value,g.querySelector("#investigation-next").disabled=m.reasoning.trim().length<8,t()}),g.querySelector("#investigation-retry")?.addEventListener("click",()=>{const b=e().investigations[s];e().investigationArchives||=[],e().investigationArchives.push({id:s,...structuredClone(b)}),delete e().investigations[s],y(l()),f()}),[2,5].includes(m.stage)?el(g,d.kind,m.experiment,t,b=>{m.runs.push(b),B("complete"),f()},a):()=>{}}return{view:p,bind:v,key:()=>s+":"+l().stage,open(g){return We(e(),g,W)?(s=g,e().currentLesson=s,y(l()),t(),!0):!1}}}const fe=(e,t,a,s,n,i={},r=[])=>({text:e,options:t,correct:a,why:s,weight:n,misconceptions:i,hints:r}),ft=[{id:"circuits",title:"Ի՞նչ է էլեկտրական շղթան",context:"Երեկոյան իմ փոքր լույսը չի վառվում։ Մարտկոցն ու լամպը կան, բայց մի կապ պակասում է։ Օգնե՞ս գտնել այն։",prediction:"Միայն մեկ լարով միացված լամպը կվառվի՞։",choices:["Այո՛, մարտկոցը բավական է","Ո՛չ, հետադարձ ճանապարհն էլ է պետք"],correct:1,task:"Միացրու մարտկոցի երկու ելքերը լամպին՝ անջատիչի միջոցով։ Գրանցիր բաց, հետո փակ շղթայի չափումները։",observe:"Ինչո՞ւ մեկ լարը բավարար չէր։",observations:["Հոսանքի համար փակ ճանապարհ է պետք","Մարտկոցը պարտադիր երկու անգամ մեծ պիտի լինի"],observed:0,explanation:"Աղբյուրը, լարերն ու բեռը միասին շղթա են կազմում։ Հոսանքի համար անհրաժեշտ է ամբողջական փակ ճանապարհ՝ մարտկոցի մի ելքից դեպի մյուսը։ Բաց ճանապարհում լամպով հոսանք չի անցնում։",second:"Հիմա բացիր անջատիչը։ Նույն մարտկոցով ու լամպով գրանցիր ևս մեկ չափում։",compare:"Ի՞նչը փոխվեց, երբ բացեցիր անջատիչը։",comparisons:["Ճանապարհը ընդհատվեց, հոսանքը դարձավ զրո","Մարտկոցի լարումը կրկնապատկվեց"],compared:0,concept:"Փակ ճանապարհ և էլեկտրական հոսանք",assessment:[fe("Լամպն աղբյուրին միայն մեկ լարով է միացված։ Ի՞նչ է պակասում։",["Հետադարձ կապը","Ավելի երկար լարը","Երկրորդ լամպը"],0,"Պետք է փակ ճանապարհ կազմվի երկու ելքերի միջև։",3,{1:"Լարի երկարությունը չի կարող փոխարինել փակ շղթային․ հոսանքի համար անհրաժեշտ է երկկողմանի փակ ճանապարհ աղբյուրի երկու բևեռների միջև։",2:"Երկրորդ լամպ ավելացնելը չի լուծի բաց շղթայի խնդիրը, քանի դեռ հոսանքի հետադարձ ճանապարհը բացակայում է։"},["Հուշում 1․ Ի՞նչ է անհրաժեշտ, որպեսզի լիցքերը կարողանան շարժվել մարտկոցի մի բևեռից մյուսը։","Հուշում 2․ Շղթան պետք է լինի ամբողջական փակ կոնտուր՝ առանց ընդհատումների։","Հուշում 3․ Մեկ լարով լիցքը չի կարող վերադառնալ աղբյուրին․ պակասում է հետադարձ հաղորդիչը։"]),fe("Փակ շղթայի լարերից մեկը հանեցինք։ Լամպն ի՞նչ կանի։",["Կշարունակի վառվել","Կմարի"],1,"Ամբողջական ճանապարհն ընդհատվել է։",3,{0:"Լարը հանելիս շղթան դառնում է բաց, և հոսանքի ուժը զրոյանում է, ուստի լամպը չի կարող շարունակել վառվել։"},["Հուշում 1․ Ուշադրություն դարձրու, թե արդյոք պահպանվե՞լ է հոսանքի անընդհատ ճանապարհը։","Հուշում 2․ Բաց շղթայում հոսանք չի անցնում (I = 0 Ա)։","Հուշում 3․ Լարը հանելը բացում է շղթան, ուստի լամպը կմարի։"]),fe("Ո՞ր տարբերակն է ամբողջական շղթա։",["Աղբյուր → լամպ → աղբյուր","Աղբյուր → լամպ → բաց ելք"],0,"Հոսանքի ճանապարհը վերադառնում է աղբյուրի մյուս ելքին։",4,{1:"Բաց ելքի դեպքում շղթան ընդհատված է, և հոսանք չի առաջանում։"},["Հուշում 1․ Հիշիր «շղթա» բառի իմաստը․ այն պետք է վերադառնա սկզբնակետին։","Հուշում 2․ Էլեկտրական հոսանքը պետք է անցնի աղբյուրի մի բևեռից բեռով դեպի մյուս բևեռը։","Հուշում 3․ Ճիշտ տարբերակում ճանապարհն ավարտվում է աղբյուրի հակառակ ելքին։"])]},{id:"open-closed",title:"Բաց և փակ շղթաներ",context:"Իմ լույսն ունի անջատիչ։ Այն կառավարում է ճանապարհը՝ առանց մարտկոցը փոխելու։ Եկ փորձենք։",prediction:"Բաց անջատիչի դեպքում հոսանքն անցնո՞ւմ է լամպով։",choices:["Այո՛","Ո՛չ"],correct:1,task:"Շղթան արդեն հավաքված է։ Բաց և փակ անջատիչով հերթով գրանցիր հոսանքի ուժը։",observe:"Անջատիչը փակելիս ինչո՞ւ վառվեց լամպը։",observations:["Վերականգնվեց փակ ճանապարհը","Անջատիչը ստեղծեց նոր մարտկոց"],observed:0,explanation:"Անջատիչը աղբյուր չէ։ Այն միացնում կամ բաժանում է երկու հաղորդիչ ելքերը։ Փակ վիճակում մեր իդեալական անջատիչը հաղորդում է, բաց վիճակում՝ ընդհատում ճանապարհը։",second:"Բացիր անջատիչը և գրանցիր զրոյական հոսանքը։ Հետո կրկին փակիր՝ համոզվելու, որ փոփոխությունը կրկնելի է։",compare:"Մարտկոցը փոխվե՞ց անջատիչը բացելիս։",comparisons:["Ո՛չ, փոխվեց ճանապարհի ամբողջականությունը","Այո՛, մարտկոցն անհետացավ"],compared:0,concept:"Անջատիչի դերը",assessment:[fe("Բաց անջատիչով այս շղթայի հոսանքի ուժը որքանո՞վ է տարբերվում զրոյից։",["Չի տարբերվում՝ 0 Ա է","Միշտ 9 Ա է"],0,"Բաց շղթայում կայուն հոսանք չկա։",3,{1:"9 Ա-ը կլիներ կարճ միացման կամ այլ շղթայի դեպքում․ բաց անջատիչի դեպքում օդի մեծ դիմադրության պատճառով հոսանք չկա։"},["Հուշում 1․ Ի՞նչ է տեղի ունենում, երբ անջատիչը բաց է։","Հուշում 2․ Բաց շղթայում դիմադրությունն անվերջ մեծ է, ուստի I = U/R = 0։","Հուշում 3․ Բաց անջատիչով շղթայում հոսանքի ուժը ճշգրիտ 0 Ա է։"]),fe("Անջատիչը փակելը ինչի՞ն է համարժեք։",["Կապը վերականգնելուն","Աղբյուրի լարումը մեծացնելուն"],0,"Այն միացնում է իր ելքերը։",3,{1:"Անջատիչը էներգիայի աղբյուր չէ և չի կարող մեծացնել մարտկոցի լարումը։"},["Հուշում 1․ Ի՞նչ դեր է կատարում անջատիչը շղթայում։","Հուշում 2․ Անջատիչը միայն միացնում կամ անջատում է հաղորդիչները։","Հուշում 3․ Անջատիչը փակելը վերականգնում է հոսանքի էլեկտրական կապը։"]),fe("Լամպը մարելու համար ո՞ր գործողությունն է բավարար։",["Շղթայի ճանապարհը մեկ տեղում բացել","Լարերը նույն կերպ թողնել"],0,"Մեկ ընդհատումն արդեն բավական է։",4,{1:"Լարերը նույն կերպ թողնելու դեպքում փակ շղթայում հոսանքը կշարունակի անցնել։"},["Հուշում 1․ Ինչպե՞ս կարելի է դադարեցնել հոսանքը շղթայում։","Հուշում 2․ Ցանկացած տեղում շղթայի ընդհատումը բերում է հոսանքի դադարեցման։","Հուշում 3․ Բավական է ճանապարհը մեկ տեղում բացել։"])]},{id:"conductors",title:"Հաղորդիչներ և մեկուսիչներ",context:"Լարի ներսը մետաղ է, իսկ պատյանը՝ պլաստիկ։ Ինչո՞ւ են երկու տարբեր նյութ օգտագործում։ Եկ փորձենք նմուշները։",prediction:"Պլաստիկի կտորը կարո՞ղ է փոխարինել մետաղյա կապին այս ցածր լարման շղթայում։",choices:["Այո՛","Ո՛չ"],correct:1,task:"Ընտրիր պղինձ, պլաստիկ կամ չոր փայտ։ Յուրաքանչյուր նյութով գրանցիր չափումը։",observe:"Ո՞ր նմուշով փակ ճանապարհ ստացանք։",observations:["Պղնձով","Պլաստիկով"],observed:0,explanation:"Պղինձը լավ հաղորդիչ է։ Պլաստիկն ու չոր փայտը այս ուսումնական ցածր լարման մոդելում մեկուսիչներ են։ Պատյանը օգնում է բաժանել հաղորդիչը շրջապատից։ Իրական նյութերի հաղորդականությունը կախված է պայմաններից․ խոնավ փայտը նույն կերպ չի պահում իրեն։",second:"Փոխարինիր պղինձը պլաստիկով՝ չփոխելով մնացած մասերը։ Գրանցիր նոր չափումը։",compare:"Նույն աղբյուրով ի՞նչը որոշեց լամպի աշխատանքը։",comparisons:["Կապի նյութի հաղորդականությունը","Նմուշի գեղեցիկ գույնը"],compared:0,concept:"Հաղորդիչ և մեկուսիչ",assessment:[fe("Մետաղյա լարի պլաստիկ պատյանը հիմնականում ինչի՞ համար է։",["Մեկուսացնելու","Հոսանքն ավելի մեծացնելու"],0,"Պատյանը բաժանում է հաղորդիչը շրջապատից։",3,{1:"Պլաստիկը մեկուսիչ է և չի կարող մեծացնել հոսանքի ուժը․ այն ծառայում է էլեկտրական անվտանգության և մեկուսացման համար։"},["Հուշում 1․ Ի՞նչ հատկություն ունի պլաստիկը էլեկտրականության նկատմամբ։","Հուշում 2․ Մեկուսիչները կանխում են հոսանքի արտահոսքը և պաշտպանում են շփումից։","Հուշում 3․ Պատյանի հիմնական նպատակը հաղորդիչը մեկուսացնելն է։"]),fe("Լարի մետաղյա միջուկը ո՞ր նյութով փոխարինելն է պահում հաղորդող կապը։",["Պղնձով","Պլաստիկով"],0,"Պղինձը հաղորդիչ է։",3,{1:"Պլաստիկը մեկուսիչ է և չունի ազատ լիցքակիրներ այս պայմաններում հոսանք անցկացնելու համար։"},["Հուշում 1․ Ո՞ր նյութն ունի մեծ թվով ազատ էլեկտրոններ։","Հուշում 2․ Մետաղները, մասնավորապես պղինձը, լավ հաղորդիչներ են։","Հուշում 3․ Պղինձը պահպանում է էլեկտրական հաղորդականությունը։"]),fe("Ի՞նչ պայման է պետք նշել փայտի մասին եզրակացության մեջ։",["Այս մոդելում չոր փայտ և ցածր լարում","Փայտը բոլոր պայմաններում նույնն է"],0,"Խոնավությունն ու լարումը կարող են փոխել վարքը։",4,{1:"Խոնավ փայտը կարող է հաղորդել էլեկտրականություն, ուստի պայմանները կարևոր են։"},["Հուշում 1․ Բոլոր նյութերի հատկությունները կախվա՞ծ են արտաքին պայմաններից։","Հուշում 2․ Խոնավությունն ու բարձր լարումը կարող են փոխել նյութի վարքագիծը։","Հուշում 3․ Ճիշտ եզրակացությունը պետք է շեշտի չոր փայտի և ցածր լարման սահմանները։"])]},{id:"circuit-parts",title:"Մարտկոց, լամպ և անջատիչ",context:"Շղթայի յուրաքանչյուր մաս իր գործն ունի։ Ես էներգիա եմ ստանում աղբյուրից, իսկ լամպը այն փոխակերպում է լույսի և ջերմության։",prediction:"Անջատիչը կարո՞ղ է մարտկոցի փոխարեն լամպին էներգիա տալ։",choices:["Այո՛","Ո՛չ"],correct:1,task:"Փակիր անջատիչը։ Փոխիր աղբյուրի լարումը և գրանցիր երկու չափում՝ նույն լամպով։",observe:"Ո՞ր մասն է շղթայի էներգիայի աղբյուրը։",observations:["Մարտկոցը","Անջատիչը"],observed:0,explanation:"Մարտկոցը քիմիական էներգիան փոխակերպում է էլեկտրական էներգիայի։ Լամպը բեռ է, որը էներգիան փոխակերպում է լույսի և ջերմության։ Անջատիչը կառավարում է ճանապարհը, իսկ լարերը կապում են տարրերը։ Լամպն այստեղ հաստատուն դիմադրությամբ մոտարկում է։",second:"Նույն փակ շղթայում իջեցրու լարումը 9 Վ-ից մինչև 3 Վ։ Գրանցիր արդյունքը․ իրական լամպի դիմադրությունը տաքանալիս կարող է փոխվել։",compare:"Նույն դիմադրությամբ մոդելում լարումը իջեցնելիս լամպն ինչպե՞ս փոխվեց։",comparisons:["Թուլացավ՝ հոսանքն ու հզորությունը նվազեցին","Անջատիչը դարձավ աղբյուր"],compared:0,concept:"Աղբյուր, բեռ և կառավարում",assessment:[fe("Ո՞ր մասում է քիմիական էներգիան փոխակերպվում էլեկտրական էներգիայի։",["Մարտկոցում","Լամպում"],0,"Մարտկոցը աղբյուրն է։",3,{1:"Լամպում էլեկտրական էներգիան փոխակերպվում է լուսային և ջերմային էներգիայի, ոչ թե հակառակը։"},["Հուշում 1․ Շղթայի ո՞ր տարրն է հանդիսանում էներգիայի աղբյուր։","Հուշում 2․ Գալվանական մարտկոցում տեղի են ունենում քիմիական ռեակցիաներ։","Հուշում 3․ Մարտկոցն է, որտեղ քիմիական էներգիան դառնում է էլեկտրական։"]),fe("Լամպի դերը ո՞րն է։",["Էներգիան լույսի և ջերմության փոխակերպել","Ստեղծել նոր մարտկոց"],0,"Լամպը բեռ է։",3,{1:"Լամպը սպառիչ (բեռ) է, այն չի կարող էներգիա արտադրել կամ նոր մարտկոց ստեղծել։"},["Հուշում 1․ Ի՞նչ է տեղի ունենում, երբ հոսանքն անցնում է լամպի միջով։","Հուշում 2․ Շիկացման թելիկը տաքանում է և լույս արձակում։","Հուշում 3․ Լամպը էլեկտրական էներգիան փոխակերպում է լույսի և ջերմության։"]),fe("Նույն բեռով իդեալական փակ շղթայի լարումը նվազեցրինք։ Ի՞նչ սպասենք։",["Հոսանքի ուժի նվազում","Անպայման հոսանքի ուժի աճ"],0,"I = U/R, իսկ R-ը այս մոդելում նույնն է։",4,{1:"Օհմի օրենքի համաձայն՝ I = U/R։ Երբ U-ն նվազում է, I-ն նույնպես պետք է նվազի, ոչ թե աճի։"},["Հուշում 1․ Ինչպե՞ս են կապված հոսանքի ուժը և լարումը ըստ Օհմի օրենքի։","Հուշում 2․ I = U / R, այսինքն՝ հոսանքն ուղիղ համեմատական է լարմանը։","Հուշում 3․ Լարման նվազումը բերում է հոսանքի ուժի նվազման։"])]},{id:"first-circuit",title:"Հավաքիր քո առաջին շղթան",context:"Հիմա դու ես նախագծողը։ Հավաքիր լույս, որը հնարավոր է միացնել ու անջատել։ Ես կհուշեմ միայն անհրաժեշտության դեպքում։",prediction:"Ի՞նչ կլինի, եթե մարտկոցի ելքերը միացնենք անմիջապես՝ շրջանցելով լամպը։",choices:["Սովորական աշխատող շղթա կլինի","Կարճ միացում կլինի"],correct:1,task:"Միացրու աղբյուրը, անջատիչն ու լամպը փակ ճանապարհով։ Կարող ես տեղափոխել մասերը՝ պահպանելով ճիշտ միացումները։ Գրանցիր աշխատող շղթան։",observe:"Ինչո՞ւ պետք է լամպը լինի ճանապարհի մեջ։",observations:["Այն բեռ է․ աղբյուրի ելքերը ուղղակի չպետք է միացնել","Որպեսզի միայն նկարը գեղեցիկ լինի"],observed:0,explanation:"Աշխատող շղթայում աղբյուրը, կառավարումն ու բեռը կապակցված են։ Աղբյուրի ելքերն առանց բեռի միացնելը կարճ միացում է։ Այս իդեալական մոդելը դրա համար չափում չի հորինում։ Իրական աղբյուրի հոսանքը այդ պահին սահմանափակում է ներքին դիմադրությունը։",second:"Բացիր անջատիչը՝ առանց լարերը հանելու։ Գրանցիր արդյունքը, հետո վերադարձիր աշխատող տարբերակին։",compare:"Ո՞ր փոփոխությունն է անվտանգ կառավարում լամպը այս վիրտուալ փորձի մեջ։",comparisons:["Անջատիչը բացելն ու փակելը","Աղբյուրի ելքերն ուղղակի միացնելը"],compared:0,concept:"Ամբողջական շղթայի նախագծում",assessment:[fe("Մարտկոցի ելքերն ուղիղ լարով միացված են։ Սա ի՞նչ է։",["Կարճ միացում","Նորմալ լամպի շղթա"],0,"Բեռը շրջանցված է։",3,{1:"Առանց բեռի (առանց լամպի կամ դիմադրության) աղբյուրի ելքերը միացնելը վտանգավոր կարճ միացում է, ոչ թե նորմալ աշխատանք։"},["Հուշում 1․ Ի՞նչ է տեղի ունենում, երբ շղթայում բեռ չկա, իսկ դիմադրությունը գրեթե զրո է։","Հուշում 2․ Շատ փոքր դիմադրության դեպքում հոսանքը կտրուկ աճում է։","Հուշում 3․ Այս վիճակը կոչվում է կարճ միացում։"]),fe("Լամպը կառավարելու համար անջատիչը պետք է լինի որտե՞ղ։",["Նույն ամբողջական ճանապարհի մեջ","Չմիացված՝ շղթայի կողքին"],0,"Անջատիչը պետք է ընդհատի հոսանքի ճանապարհը։",3,{1:"Շղթայից դուրս չմիացված անջատիչը չի կարող ազդել շղթայի փակ կամ բաց լինելու վրա։"},["Հուշում 1․ Ինչպե՞ս կարող է անջատիչը ընդհատել հոսանքի հոսքը լամպով։","Հուշում 2․ Այն պետք է գտնվի հենց այն հաղորդիչ ճանապարհի վրա, որով անցնում է հոսանքը։","Հուշում 3․ Անջատիչը պետք է միացված լինի նույն ամբողջական ճանապարհի մեջ։"]),fe("Շղթան չի աշխատում։ Ո՞ր ստուգումն է օգտակար առաջին քայլը։",["Ստուգել կապերը և անջատիչը","Միացնել աղբյուրի ելքերը ուղիղ"],0,"Փնտրիր բաց կապը՝ պահպանելով բեռը։",4,{1:"Աղբյուրի ելքերն ուղիղ միացնելը կարճ միացում է և կարող է վնասել սարքավորումը։"},["Հուշում 1․ Ի՞նչն է սովորաբար խանգարում լամպի վառվելուն։","Հուշում 2․ Ստուգիր, թե բոլոր հանգույցներն արդյոք միացվա՞ծ են, և արդյոք անջատիչը փա՞կ է։","Հուշում 3․ Առաջին քայլը բոլոր կապերի և անջատիչի դիրքի ստուգումն է։"])]}];ft.push({id:"switch-types",title:"Անջատիչների տեսակները",context:"Դռան տվիչը և սեղանի լույսի կոճակը կարող են տարբեր սկզբնական վիճակ ունենալ։ Փորձենք նորմալ բաց ու նորմալ փակ կոնտակտները։",prediction:"Նորմալ բաց կոնտակտը արտաքին ազդեցության բացակայության դեպքում հոսանք անցկացնո՞ւմ է։",choices:["Ո՛չ","Այո՛"],correct:0,task:"Ընտրիր նորմալ բաց կոնտակտ։ Ազդիր անջատիչին և գրանցիր չափումը։ Հետո ազատիր այն։",observe:"Նորմալ բաց կոնտակտը գործարկելիս ի՞նչ է լինում։",observations:["Կապը փակվում է","Աղբյուրի լարումը կրկնապատկվում է"],observed:0,explanation:"Նորմալ վիճակը արտաքին գործարկող ազդեցության բացակայության վիճակն է։ Նորմալ բաց կոնտակտը գործարկելիս փակվում է, իսկ նորմալ փակ կոնտակտը՝ բացվում։ Սա կոնտակտի ուսումնական մոդել է, ոչ իրական սարքի անվտանգության հրահանգ։",second:"Ընտրիր նորմալ փակ տեսակը և գործարկիր այն։ Գրանցիր արդյունքը, հետո ազատիր կոնտակտը։",compare:"Ո՞ր մեծությունն է փոխվել երկու տեսակների միջև։",comparisons:["Առանց ազդեցության կոնտակտի վիճակը","Պարտադիր մարտկոցի լարումը"],compared:0,concept:"Կոնտակտի նորմալ և գործարկված վիճակներ",assessment:[{text:"Նորմալ փակ կոնտակտն առանց գործարկման ինչպիսի՞ն է։",options:["Փակ","Բաց"],correct:0,why:"Նորմալը գործարկող ազդեցության բացակայությունն է։",weight:3,misconceptions:{1:"«Նորմալ» նշանակում է սկզբնական՝ առանց սեղմելու կամ ազդելու վիճակը, ուստի նորմալ փակ կոնտակտը սկզբում փակ է։"},hints:["Հուշում 1․ Ի՞նչ է նշանակում «նորմալ» բառը անջատիչների տեխնիկական նկարագրության մեջ։","Հուշում 2․ Դա վիճակն է, երբ ոչ ոք չի ազդում կոճակին։","Հուշում 3․ Նորմալ փակ կոնտակտը հանգիստ վիճակում փակ է։"]},{text:"Նորմալ փակ կոնտակտը գործարկելիս կապն ինչպե՞ս է փոխվում։",options:["Բացվում է","Միշտ մնում է փակ"],correct:0,why:"Այս տեսակի կոնտակտի գործարկումը բացում է կապը։",weight:3,misconceptions:{1:"Գործարկումը փոխում է կոնտակտի վիճակը հակառակին․ փակից այն դառնում է բաց։"},hints:["Հուշում 1․ Ի՞նչ է տեղի ունենում կոնտակտի հետ, երբ սեղմում ես այն։","Հուշում 2․ Գործարկելիս վիճակը փոխվում է հակառակին։","Հուշում 3․ Փակ կոնտակտը գործարկելիս բացվում է։"]},{text:"Նորմալ բաց և նորմալ փակ կոնտակտներն ընտրելիս ի՞նչ պետք է պարզել։",options:["Ցանկալի վիճակը ազդեցության առկայության և բացակայության դեպքում","Միայն նկարի գույնը"],correct:0,why:"Տեսակը որոշում է աշխատանքի տրամաբանությունը։",weight:4,misconceptions:{1:"Անջատիչի գույնը կամ տեսքը չեն որոշում դրա էլեկտրական աշխատանքի տրամաբանությունը։"},hints:["Հուշում 1․ Ինչի՞ համար է նախատեսված սարքը կամ տվիչը։","Հուշում 2․ Պետք է իմանալ՝ երբ պետք է շղթան լինի փակ, իսկ երբ՝ բաց։","Հուշում 3․ Որոշիչ է շղթայի ցանկալի վիճակը ազդեցության առկայության և բացակայության դեպքում։"]}]},{id:"wiring",title:"Հաղորդալարեր և միացումներ",context:"Լամպը չի վառվում, թեև բոլոր մասերը կան։ Գտնենք՝ որտե՞ղ է ընդհատվել ճանապարհը։",prediction:"Միացման բացը կարող է լինել միայն անջատիչի մո՞տ։",choices:["Ո՛չ, ցանկացած անհրաժեշտ կապի տեղում","Այո՛"],correct:0,task:"Միացրու անհրաժեշտ երեք կապը և փակիր անջատիչը։ Գրանցիր աշխատող շղթան։",observe:"Հաղորդալարի անհրաժեշտ կապը բաց թողնելիս ի՞նչ է լինում։",observations:["Ճանապարհը բաց է մնում","Մարտկոցն անպայման անհետանում է"],observed:0,explanation:"Պատկերի մոտիկությունը դեռ միացում չէ․ ելքերը պետք է լարով կապված լինեն։ Տարրը տեղափոխելիս նրա լարերը շարունակում են կապված մնալ նույն ելքերին։ Կապը հեռացնելիս հանգույցների կառուցվածքն է փոխվում։",second:"Ընտրիր անհրաժեշտ լարը և քաշիր նրա ծայրը կոնտակտից հեռու։ Գրանցիր բաց շղթան, ապա ծայրը նորից միացրու կոնտակտին։",compare:"Տարրը տեղափոխելն ու լարը հեռացնելը նո՞ւյն գործողությունն են։",comparisons:["Ո՛չ, առաջինը չի փոխում կապակցությունը","Այո՛, միշտ"],compared:0,concept:"Տարրի դիրքը և շղթայի կապակցությունը տարբեր են",assessment:[{text:"Երկու ելքերը տեսարանում մոտ են, բայց լար չկա։ Միացվա՞ծ են։",options:["Ո՛չ","Այո՛"],correct:0,why:"Միացումը ստեղծում է լարը, ոչ մոտիկությունը։",weight:3,misconceptions:{1:"Տեսողական մոտ լինելը չի նշանակում էլեկտրական միացում․ անհրաժեշտ է իրական հաղորդիչ լար։"},hints:["Հուշում 1․ Արդյո՞ք օդը ցածր լարման դեպքում հոսանք անցկացնում է։","Հուշում 2․ Էլեկտրական կապի համար անհրաժեշտ է նյութական հաղորդիչ։","Հուշում 3․ Առանց լարի ելքերը միացված չեն։"]},{text:"Տարրը քաշելիս լարը կապված է մնում նույն ելքին։ Շղթայի կապակցությունն ինչպե՞ս է փոխվում։",options:["Չի փոխվում","Միշտ բացվում է"],correct:0,why:"Տեղադրությունը և կապերի գրաֆը տարբեր տվյալներ են։",weight:3,misconceptions:{1:"Տարրի դիրքը տեսարանում փոխելը չի քանդում էլեկտրական կապը, եթե լարը մնում է միացված։"},hints:["Հուշում 1․ Տարրի աշխարհագրական դիրքը փոխո՞ւմ է շղթայի տոպոլոգիան։","Հուշում 2․ Կարևորը հանգույցների էլեկտրական կապակցությունն է, ոչ թե տարածական դիրքը։","Հուշում 3․ Կապակցությունը չի փոխվում։"]},{text:"Ինչպե՞ս վերականգնել մեկ բաց կապով շղթան։",options:["Միացնել համապատասխան ելքերը","Աղբյուրի ելքերը կարճ միացնել"],correct:0,why:"Վերականգնում ենք նախատեսված ճանապարհը՝ բեռը չշրջանցելով։",weight:4,misconceptions:{1:"Աղբյուրի ելքերը կարճ միացնելը շրջանցում է բեռը և ստեղծում վթարային իրավիճակ։"},hints:["Հուշում 1․ Որտե՞ղ է ընդհատված շղթայի ճանապարհը։","Հուշում 2․ Պետք է վերականգնել հենց բաց թողնված կապը։","Հուշում 3․ Միացրու համապատասխան ելքերը՝ պահպանելով բեռը շղթայի մեջ։"]}]});const Ze=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),al=["Իրավիճակ","Կանխատեսում","Առաջին փորձ","Դիտարկում","Բացատրություն","Երկրորդ փորձ","Համեմատում","Ստուգման չափանիշներ","Գիտելիքի ստուգում","Արդյունք"];function zt(e){const t=la();return["open-closed","conductors","circuit-parts","switch-types"].includes(e)&&(t.wires=[["battery:a","switch:a"],["switch:b","lamp:a"],["lamp:b","battery:b"]]),e==="conductors"&&Object.assign(t.components.find(a=>a.id==="switch"),{sample:!0,closed:!0}),t}function sl(e,t,a){let s="circuits",n=null,i="",r=0,o="thinking",c=!1;const l=()=>ft.find(d=>d.id===s);function u(){const d=e();d.electricLessons||={};let f=d.electricLessons[s];return f||(f=d.electricLessons[s]={stage:0,experiments:[],circuit:zt(s)}),f.schema!==2&&(f.legacyStage=f.stage,f.stage=Math.min(f.stage,4),f.schema=2,f.circuit||=zt(s),f.experiments||=[]),s==="conductors"&&(f.material||="copper"),f.quiz||=[],f.baseline||=0,f.unlockedStage=Math.max(f.unlockedStage||0,f.stage),f}const p=d=>d.map((f,x)=>`<button class="answer ${n===x?"selected":""}" data-foundation-answer="${x}" aria-pressed="${n===x}" ${c?"disabled":""}>${Ze(f)}</button>`).join(""),y=(d="Շարունակել",f=!1)=>`<button class="button" id="foundation-next" ${f?"disabled":""}>${d}</button>`;function h(d){const f=d.circuit.components.find($=>$.type==="battery"),x=s==="switch-types"?`<label class="field-label" for="switch-kind">Կոնտակտի տեսակ</label><select id="switch-kind" ${d.circuit.components.some($=>$.type==="switch")?"":"disabled"}><option value="no" ${d.switchKind!=="nc"?"selected":""}>Նորմալ բաց</option><option value="nc" ${d.switchKind==="nc"?"selected":""}>Նորմալ փակ</option></select>`:s==="conductors"?`<label class="field-label" for="sample-material">Փորձարկվող նյութ</label><select id="sample-material" ${d.circuit.components.some($=>$.id==="switch")?"":"disabled"}><option value="copper" ${(d.material||"copper")==="copper"?"selected":""}>Պղինձ · հաղորդիչ</option><option value="plastic" ${d.material==="plastic"?"selected":""}>Պլաստիկ · մեկուսիչ</option><option value="wood" ${d.material==="wood"?"selected":""}>Չոր փայտ · մեկուսիչ</option></select>`:s==="circuit-parts"?`<label class="slider-field">Աղբյուրի լարում <strong id="source-voltage-value">${f?.voltage??"—"} Վ</strong><input type="range" id="source-voltage" ${f?"":"disabled"} min="3" max="9" step="3" value="${f?.voltage??"—"}"></label>`:"";let b=Ma(d.circuit).replace("9 Վ իդեալական աղբյուր",`${d.circuit.components.find($=>$.type==="battery")?.voltage||9} Վ իդեալական աղբյուր`);s==="conductors"&&(b=b.replace(/<button class="button secondary" id="circuit-switch">.*?<\/button>/,"").replaceAll("Անջատիչ","Նմուշ"));const w=d.experiments.length>d.baseline&&(d.stage!==5||d.experiments.length>d.secondBaseline);return s==="switch-types"&&(b=b.replace(/(id="circuit-switch">).*?(<\/button>)/,`$1${d.actuated?"Ազատել կոնտակտը":"Գործարկել կոնտակտը"}$2`)),b=b.replace('class="button secondary" id="measure-electric"',`class="${w?"text-button":"button"}" id="measure-electric"`),x+b+(w?y(d.stage===5?"Համեմատել արդյունքները":"Քննարկել դիտարկումը"):"")+`<details class="measurement-journal"><summary>Իմ չափումները · ${d.experiments.length}</summary>${d.experiments.slice(-6).map(($,k)=>`<p>${k+1}. ${Ze($.reading)}</p>`).join("")}</details>`}function v(){const d=u(),f=l();let x="";if(d.stage===0&&(x=`<h2>${f.context}</h2><p>Միասին կանխատեսենք, փորձենք ու հիմնավորենք պատասխանը։</p>${y("Սկսել բացահայտումը")}`),d.stage===1&&(x=`<h2>${f.prediction}</h2><p>Կանխատեսումը գնահատական չի ստանում․ այն հետո ստուգելու ենք։</p>${p(f.choices)}${y("Ստուգել փորձով",n===null)}`),[2,5].includes(d.stage)&&(x=`<h2>${d.stage===2?"Եկ ստուգենք քո գաղափարը։":"Փոխենք միայն մեկ պայման։"}</h2><p>${d.stage===2?f.task:f.second}</p>${h(d)}`),[3,6].includes(d.stage)&&(x=`<h2>${d.stage===3?f.observe:f.compare}</h2><p>${d.stage===3?"Հենվիր չափումիդ վրա։":"Համեմատիր վերջին երկու չափումները։"}</p>${d.stage===6?`<div class="evidence">${d.experiments.slice(-2).map(b=>`<p>${Ze(b.reading)}</p>`).join("")}</div>`:""}${p(d.stage===3?f.observations:f.comparisons)}<p class="feedback" role="status">${Ze(i)}</p>${c?y("Շարունակել"):`<button class="button" id="foundation-check" ${n===null?"disabled":""}>Ստուգել գաղափարը</button>`}${i&&!c?'<button class="text-button" id="foundation-hint">Հուշում</button>':""}`),d.stage===4){const b=d.prediction!==null&&d.prediction!==void 0?f.choices[d.prediction]:"Գրանցված չէ",w=d.experiments.at(-1)?.reading||"Չափում դեռ չկա";x=`<h2>Փորձն օգնում է հասկանալ կապը։</h2><p>${f.explanation.split("։ ")[0]}։</p><div class="prediction-comparison"><p><strong>Քո կանխատեսումն էր՝</strong> «${Ze(b)}»։</p><p><strong>Փորձով չափեցինք՝</strong> «${Ze(w)}»։</p></div><div class="evidence"><strong>${f.concept}</strong><p>Քո չափումը՝ ${Ze(w)}</p></div><details><summary>Ինչո՞ւ է այդպես</summary><p>${f.explanation}</p></details>${y("Ստուգել մեկ այլ պայման")}`}if(d.stage===7&&(x=`<h2>Պատրա՞ստ ես ինքնուրույն կիրառել բացահայտումը։</h2><p>Կանխատեսումն ու փորձերը չեն նվազեցնում գնահատականդ։ Հիմա կպատասխանես երեք հարցի՝ ընդհանուր 10 միավորով։ Հուշումները հասանելի են ուսումնասիրման քայլերում։</p><div class="rubric"><span>0–4 միավոր · 0 աստղ</span><span>5–6 · 1 աստղ</span><span>7–8 · 2 աստղ</span><span>9–10 · 3 աստղ</span></div><p>Առնվազն երկու աստղը բացում է հաջորդ դասը։ Կրկնելիս պահում ենք քո լավագույն արդյունքը։</p>${y("Սկսել գիտելիքի ստուգումը")}`),d.stage===8&&(x=ia(d,f.assessment.map(b=>({...b,question:b.text,type:"choice"})))),d.stage===9){const b=e().learning?.lessons?.[s],w=d.lastResult||(b?{stars:b.bestStars,earned:b.bestScore}:{stars:0,earned:0}),$=w?.stars??b?.bestStars??0,k=w?.earned??b?.bestScore??0,M=Ht(e(),s,W),q=W.find(E=>E.lessons.some(T=>T.id===s)),I=q?.lessons?.at(-1)?.id===s,L=$>=2?(M?`<button class="button lesson-primary" data-module="${M.id}">Հաջորդ դասը →</button>`:I?'<p>Թեման ավարտված է։</p><button class="button lesson-primary" data-choose-topics>Ընտրել հաջորդ թեման</button>':'<p>Հաջորդ դասը նախապատրաստվում է։ Քո արդյունքն արդեն պահպանված է։</p><button class="button lesson-primary" data-choose-topics>Ընտրել հաջորդ թեման</button>')+'<button class="text-button" id="foundation-retry">Կրկնել դասը</button><button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>':'<button class="button lesson-primary" id="foundation-retry">Կրկին փորձել</button><button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>';x=`<h2>${$>=2?"Դու կարող ես շարունակել։":"Մեկ անգամ ևս փորձենք՝ արդեն քո փորձի հիման վրա։"}</h2><p>${k} / 10 միավոր։ Լավագույն արդյունքդ՝ ${b?.bestStars||$} աստղ։</p>${rt($)}<div class="learning-summary"><h3>Քո բացահայտումը</h3><p>${f.concept}։ Կանխատեսեցիր, չափեցիր և համեմատեցիր։</p>${f.assessment.map((E,T)=>`<p class="assessment-review">${d.quiz[T]?.correct?"✓":"↺"} ${E.why}</p>`).join("")}</div>${L}<details><summary>Իմ եզրակացությունը</summary><textarea id="foundation-reflection" aria-label="Իմ եզրակացությունը">${Ze(d.reflection||"")}</textarea><p>Գրառումն ինքնաշխատ պահվում է հետազոտողի տետրում։</p></details>`}return d.stage===9&&(x+=ra(d)),`<div class="lesson-top"><button class="text-button" data-page="path">← Ուսումնական ուղի</button><span>${d.stage+1} / 10</span><select ${d.stage===8?"disabled":""} id="foundation-stage" aria-label="Վերանայել դասի քայլը">${al.slice(0,d.unlockedStage+1).map((b,w)=>`<option value="${w}" ${w===d.stage?"selected":""}>${b}</option>`).join("")}</select></div><div class="lesson-context"><h1>${f.title}</h1></div><div class="lesson-track" role="progressbar" aria-label="Դասի ընթացքը" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${d.stage===9?10:d.stage}"><span style="width:${d.stage===9?100:d.stage*10}%"></span></div><section class="lesson-content">${Le(`<div class="story">${x}</div>`,`${s}:${d.stage}:${d.quiz.length}:${d.event||0}`,"",d.stage===9?"success-complete":d.stage===8?na(d):d.stage===0?"idle":o)}</section>`}function g(){n=null,i="",r=0,c=!1,o="thinking"}function m(d){const f=u(),x=l(),b=$=>{t(),a(),$&&document.querySelector(`[data-component="${$}"]`)?.focus()};if(f.stage===8)return oa(d,f,x.assessment.map($=>({...$,question:$.text,type:"choice"})),t,a,($,k)=>{f.quiz=$,f.review=k;const M=$.reduce((q,I)=>q+I.points,0);f.lastResult=xt(e(),s,M,10,{quiz:$,review:k},W),f.completed=Date.now(),f.stage=9,f.noteId=crypto.randomUUID(),e().notes.push({id:f.noteId,created:f.completed,lessonId:s,lessonTitle:x.title,explanation:x.explanation,conclusion:`${M}/10 · ${f.lastResult.stars} աստղ`})});d.querySelector("#foundation-stage").onchange=$=>{const k=Number($.target.value);k>f.unlockedStage||(f.stage=k,f.stage===8&&f.quiz.length===3&&(f.stage=9),g(),b())},d.querySelectorAll("[data-foundation-answer]").forEach($=>$.onclick=()=>{n=Number($.dataset.foundationAnswer),i="",o="thinking",B("tap"),a()}),d.querySelector("#foundation-next")?.addEventListener("click",()=>{f.stage===1&&(f.prediction=n),f.stage===4&&(f.secondBaseline=f.experiments.length),f.stage++,g(),b(),window.scrollTo(0,0)}),d.querySelector("#foundation-check")?.addEventListener("click",()=>{const $=f.stage===3?x.observed:x.compared;c=n===$,f.event=(f.event||0)+1,o=c?"eureka":"confused",i=c?`Ճիշտ է։ ${x.explanation.split("։ ")[0]}։`:"Մտածենք ճանապարհի մասին։ Մնացած պայմանները պահիր նույնը և ստուգիր՝ ինչն է փոխվել։",c?(f.observation=n,B("correct")):(f.misconceptions||=[],f.misconceptions.push({stage:f.stage,answer:n,created:Date.now()}),B("incorrect")),b()}),d.querySelector("#foundation-hint")?.addEventListener("click",()=>{r=Math.min(4,r+1),i=[x.task,`Վերջին չափումդ՝ ${f.experiments.at(-1)?.reading}։ Համեմատիր բաց և փակ ճանապարհները։`,x.explanation,`Պատասխանը՝ ${(f.stage===3?x.observations:x.comparisons)[f.stage===3?x.observed:x.compared]}։ ${x.explanation}`][r-1],o="eureka",f.event=(f.event||0)+1,B("hint"),a()}),d.querySelector("#foundation-retry")?.addEventListener("click",()=>{f.stage=0,f.unlockedStage=0,f.baseline=f.experiments.length,f.quiz=[],delete f.assessmentFlow,f.circuit=zt(s),f.material="copper",f.reflection="",delete f.completed,g(),b()}),d.querySelector("#foundation-reflection")?.addEventListener("input",$=>{f.reflection=$.target.value;const k=e().notes.find(M=>M.id===f.noteId);k&&(k.conclusion=f.reflection),t()});function w(){gn(d,f.circuit,b),d.querySelector("#circuit-reset").onclick=()=>{f.circuit=zt(s),f.material=s==="conductors"?"copper":null,f.switchKind="no",f.actuated=!1,b()}}if([2,5].includes(f.stage)){w();const $=()=>{const k=f.circuit.components.find(M=>M.type==="switch");k&&(k.closed=f.switchKind==="nc"?!f.actuated:!!f.actuated,b())};d.querySelector("#switch-kind")?.addEventListener("change",k=>{f.switchKind=k.target.value,f.actuated=!1,$()}),s==="switch-types"&&(d.querySelector("#circuit-switch").onclick=()=>{f.actuated=!f.actuated,$()}),d.querySelector("#sample-material")?.addEventListener("change",k=>{f.material=k.target.value;const M=f.circuit.components.find(q=>q.id==="switch");M&&(M.closed=f.material==="copper"),b()}),d.querySelector("#source-voltage")?.addEventListener("input",k=>{const M=f.circuit.components.find(I=>I.type==="battery");if(!M)return;M.voltage=Number(k.target.value),d.querySelector("#source-voltage-value").textContent=k.target.value+" Վ";const q=document.createElement("div");q.innerHTML=Ma(f.circuit);for(const I of["#circuit-canvas","#circuit-status"])d.querySelector(I).replaceWith(q.querySelector(I));d.querySelector(".model-note").textContent=`${k.target.value} Վ իդեալական աղբյուր․ լամպը՝ 20 Օմ բեռ։`,w(),t()}),d.querySelector("#measure-electric").onclick=()=>{const k=ot(f.circuit.components,f.circuit.wires,f.circuit.junctions);if(!["open","closed"].includes(k.status))return;const M=`${f.material?{copper:"Պղինձ",plastic:"Պլաստիկ",wood:"Չոր փայտ"}[f.material]+" · ":""}${k.status==="open"?"Բաց":"Փակ"} շղթա · ${f.circuit.components.find(q=>q.type==="battery")?.voltage} Վ · ${Number(k.current.toFixed(3))} Ա`;f.experiments.push({reading:M,created:Date.now(),circuit:structuredClone(f.circuit),material:f.material||null,current:k.current}),B("complete"),b()}}return()=>{}}return{view:v,bind:m,key:()=>s+":"+u().stage,open(d){return We(e(),d,W)?(s=d,e().currentLesson=s,t(),g(),!0):!1}}}const Wt=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);function nl(e,t,a){let s="circuits",n=null,i="",r=0,o="thinking";const c=()=>Bt.find(h=>h.id===s),l=()=>{const h=e();return h.electricLessons||={},h.electricLessons[s]||={stage:0,parameters:ca(c()),experiments:[],attempts:[],prediction:null}},u=()=>t();function p(){const h=c(),v=l();let g="";const m=(b="Շարունակել",w=!1)=>`<button class="button" id="electric-next" ${w?"disabled":""}>${b}</button>`,d=b=>b.map((w,$)=>`<button class="answer ${n===$?"selected":""}" data-electric-answer="${$}" aria-pressed="${n===$}">${w}</button>`).join("");if(v.stage===0&&(g=`<h2>${h.title}</h2><p>${h.context}</p>${m("Անել կանխատեսում")}`),v.stage===1&&(g=`<h2>${h.prediction}</h2><p>Ընտրիր քո կանխատեսումը։ Պատասխանը միասին փորձով կստուգենք։</p>${d(h.choices)}${m("Գրանցել կանխատեսումն ու փորձել",n===null)}`),v.stage===2&&(g=`<h2>Հիմա քո հերթն է փորձելու։</h2><p>${s==="circuits"?"Միացրու մարտկոցի, անջատիչի ու լամպի ելքերը փակ ճանապարհով։ Փակիր անջատիչը, հետո բացիր այն։":"Փոխիր մեկ պայման և գրանցիր չափումը։ Հետո փոխիր այն ու համեմատիր արդյունքները։"}</p>${xn(h,v)}${m("Քննարկել դիտարկումը",!v.experiments.length)}`),v.stage===3&&(g=`<h2>${h.observe}</h2><p>Հենվիր քո փորձի վրա։</p>${d(h.observations)}<p class="feedback" role="status">${i}</p>${i.startsWith("Ճիշտ")?m("Բացահայտել կապը"):`<button class="button" id="electric-submit-observation" ${n===null?"disabled":""}>Ստուգել դիտարկումը</button>${i?'<button class="text-button" id="electric-hint">Հուշում</button>':""}`}`),v.stage===4){const b=v.prediction!==null&&v.prediction!==void 0?h.choices[v.prediction]:"Գրանցված չէ",w=v.experiments.at(-1)?.reading||"Չափում դեռ չկա";g=`<h2>Եկ կապենք փորձն ու բացատրությունը։</h2><p>${h.explanation.split("։ ").slice(0,2).join("։ ")}</p><div class="prediction-comparison"><p><strong>Քո կանխատեսումն էր՝</strong> «${Wt(b)}»։</p><p><strong>Փորձով չափեցինք՝</strong> «${Wt(w)}»։</p></div><details><summary>Ավելի մանրամասն</summary><p>${h.explanation}</p></details><div class="evidence"><strong>${h.formula}</strong><p>Քո վերջին չափումը՝ ${Wt(w)}</p></div>${m("Փորձել նոր իրավիճակում")}`}if(v.stage===5&&(g=ia(v,[{type:"number",question:h.challenge,answer:h.answer,unit:h.unit,weight:1,why:`${h.formula}։ ${h.hint}`}])),v.stage===6){const b=e().learning?.lessons?.[s],w=v.lastResult||(b?{stars:b.bestStars,earned:b.bestScore}:{stars:0,earned:0}),$=w?.stars??b?.bestStars??0,k=w?.earned??b?.bestScore??0,M=Ht(e(),s,W),q=W.find(E=>E.lessons.some(T=>T.id===s)),I=q?.lessons?.at(-1)?.id===s,L=$>=2?(M?`<button class="button lesson-primary" data-module="${M.id}">Հաջորդ դասը →</button>`:I?'<p>Թեման ավարտված է։</p><button class="button lesson-primary" data-choose-topics>Ընտրել հաջորդ թեման</button>':'<p>Հաջորդ դասը նախապատրաստվում է։</p><button class="button lesson-primary" data-choose-topics>Ընտրել հաջորդ թեման</button>')+'<button class="text-button" id="legacy-retry">Կրկնել դասը</button><button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>':'<button class="button lesson-primary" id="legacy-retry">Կրկին փորձել</button><button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>';g=`<h2>${$>=2?"Դու փորձով բացահայտեցիր մի նոր կապ։":"Այս կապը ևս մեկ փորձով ամրապնդենք։"}</h2><p>Կիրառման առաջին պատասխանը՝ ${k} / 1 միավոր։ Լավագույն արդյունքը՝ ${b?.bestStars||$} աստղ։</p>${rt($)}<div class="evidence"><strong>${h.formula}</strong><p>${h.explanation}</p></div>${L}<details><summary>Իմ եզրակացությունը</summary><label class="field-label" for="electric-reflection">Ի՞նչն էր քեզ համար նոր։</label><textarea id="electric-reflection">${Wt(v.reflection||"")}</textarea><button class="text-button" id="electric-save-reflection">Պահպանել եզրակացությունը</button><p id="electric-note-status" role="status"></p></details>`}v.stage===6&&(g+=ra(v));const f=["Իրավիճակ","Կանխատեսում","Փորձ","Դիտարկում","Բացատրություն","Կիրառում","Եզրակացություն"];v.unlockedStage=Math.max(v.unlockedStage||0,v.stage);const x=v.stage===6?"success-complete":v.stage===5?na(v):v.stage===0?"idle":o;return`<div class="lesson-top"><button class="text-button" data-page="path">← Ուսումնական ուղի</button><span>${Math.min(v.stage+1,6)} / 6</span><select ${v.stage===5?"disabled":""} id="electric-stage" aria-label="Վերանայել հետազոտության քայլը">${f.slice(0,v.unlockedStage+1).map((b,w)=>`<option value="${w}" ${v.stage===w?"selected":""}>${b}</option>`).join("")}</select></div><div class="lesson-context"><h1>${h.title}</h1></div><div class="lesson-track" role="progressbar" aria-label="Ավարտված քայլեր" aria-valuemin="0" aria-valuemax="6" aria-valuenow="${v.stage}"><span style="width:${v.stage/6*100}%"></span></div><section class="lesson-content">${Le(`<div class="story">${g}</div>`,`${s}:${v.stage}:${v.attempts.length}:${r}`,"",x)}</section>`}function y(h){const v=l(),g=c();h.querySelector("#legacy-retry")?.addEventListener("click",()=>{v.stage=0,delete v.assessmentFlow,v.attempts=[],v.completed=null,v.numeric="",n=null,i="",u(),a()});const m=()=>{u(),a()};return h.querySelector("#electric-stage").onchange=d=>{v.stage=Number(d.target.value),n=null,i="",r=0,o="thinking",u(),a()},h.querySelectorAll("[data-electric-answer]").forEach(d=>d.onclick=()=>{n=Number(d.dataset.electricAnswer),i="",o="thinking",B("tap"),a()}),h.querySelector("#electric-next")?.addEventListener("click",()=>{v.stage===1&&(v.prediction=n),v.stage++,n=null,i="",r=0,o="thinking",B("control"),m(),window.scrollTo(0,0)}),h.querySelector("#electric-submit-observation")?.addEventListener("click",()=>{const d=n===g.observed;v.attempts.push({stage:3,answer:n,correct:d,time:Date.now()}),v.observation=n,i=d?"Ճիշտ է։ Հիմա տեսնենք՝ ինչու։":"Եկ նորից ստուգենք․ ի՞նչ փոխվեց, երբ փոխեցիր միայն մեկ պայման։",o=d?"eureka":"confused",B(d?"correct":"incorrect"),m()}),h.querySelector("#electric-hint")?.addEventListener("click",()=>{r=Math.min(3,r+1),i=r===1?"Փոքր հուշում․ առանձնացրու այն մեծությունը, որը փոխվել է։":r===2?v.stage===3?`Համեմատիր երկու փորձ․ ${g.observe}`:g.hint:v.stage===3?g.explanation.split("։ ")[0]:`Միասին կիրառենք՝ ${g.formula}։ ${g.hint}`,o="eureka",B("hint"),a()}),v.stage===5?oa(h,v,[{type:"number",question:g.challenge,answer:g.answer,unit:g.unit,weight:1,why:`${g.formula}։ ${g.hint}`}],t,a,(d,f)=>{v.stage=6,v.completed=Date.now(),v.lastResult=xt(e(),s,d[0].points,1,{application:d[0].correct,review:f},W),v.noteId=crypto.randomUUID(),e().notes.push({id:v.noteId,created:v.completed,lessonId:s,lessonTitle:g.title,explanation:g.formula,conclusion:`${d[0].points}/1 · ${v.lastResult.stars} աստղ`})}):(h.querySelector("#electric-reflection")?.addEventListener("input",d=>{v.reflection=d.target.value,u()}),h.querySelector("#electric-save-reflection")?.addEventListener("click",()=>{const d=e().notes.find(f=>f.id===v.noteId);d&&(d.conclusion=v.reflection||d.conclusion),u(),h.querySelector("#electric-note-status").textContent="Եզրակացությունը պահպանված է։",B("complete")}),v.stage===2?wn(h,g,v,d=>{m(),d&&(document.querySelector(`[data-component="${d}"]`)||(d.startsWith("#")?document.querySelector(d):null))?.focus()},(d,f=!0)=>{d&&(v.experiments.push({reading:d,parameters:{...v.parameters},created:Date.now()}),B("complete")),u(),f&&a()}):()=>{})}return{key(){return s+":"+l().stage},open(h){Bt.some(v=>v.id===h)&&(s=h,e().currentLesson=s,u(),n=null,i="",r=0,o="thinking")},view:p,bind:y}}function il(e,t,a){const s=Lr(e,t,a),n=sl(e,t,a),i=nl(e,t,a),r=tl(e,t,a);let o=n;return{open(c){return We(e(),c,W)?(o=c===ke?s:ft.some(l=>l.id===c)?n:ze.some(l=>l.id===c)?r:i,o.open(c),!0):!1},view:()=>o.view(),bind:c=>o.bind(c),key:()=>o.key()}}function ol(e){return`<div class="topic-heading"><span class="eyebrow">Քո հաջորդ բացահայտումը</span><h1>Ի՞նչն է քեզ հետաքրքրում։</h1><p>Ընտրիր թեման։ Յուրաքանչյուր ճանապարհ սկսվում է իր առաջին դասից։</p></div><div class="topic-options">${W.map((t,a)=>{const s=t.lessons.filter(i=>e.learning.lessons[i.id]?.bestStars>=2).length,n=t.lessons.filter(i=>i.playable).length;return`<button class="topic-option ${t.color} ${a===0?"featured-topic":""}" data-topic="${t.id}"><div class="topic-art">${Po(t.art)}</div><span class="topic-option-content">${a===0?"<small>Սկսելու լավ տեղ</small>":""}<strong>${t.title}</strong><span>${t.description}</span><small>${n?`${s} / ${n} դաս յուրացված է`:"Շուտով՝ նոր բացահայտումներ"}</small></span></button>`}).join("")}</div><p class="roadmap-disclaimer">Սա նախնական թեմատիկ ճանապարհ է․ պաշտոնական ծրագրին համապատասխանությունը դեռ չի հաստատվել։</p>`}const Sa=[240,185,220,300,340,280],En=[48,78,60,38,54,82];function qs(e,t=!1){const a=t?En:Sa;let s="";return e.forEach((n,i)=>{const r=a[i%a.length],o=48+i*128;if(i===0)s=`M${r} ${o}`;else{const c=a[(i-1)%a.length],l=48+(i-1)*128;s+=` C${c} ${l+64} ${r} ${o-64} ${r} ${o}`}}),`<svg class="path-connector ${t?"mobile":"desktop"}" viewBox="0 0 ${t?130:600} ${e.length*128}" preserveAspectRatio="none" aria-hidden="true"><path d="${s}" fill="none" stroke="#e5ebdf" stroke-width="6" stroke-linecap="round" stroke-dasharray="3 12"/></svg>`}function rl(e){const t=W.find(c=>c.id===e.learning.selectedTopic);if(!t)return ol(e);const s=t.lessons.find(c=>c.id===e.currentLesson&&We(e,c.id,W)&&!(e.learning.lessons[c.id]?.bestStars>=2))||t.lessons.find(c=>We(e,c.id,W)&&!(e.learning.lessons[c.id]?.bestStars>=2)),n=t.lessons.filter(c=>c.playable),i=n.filter(c=>e.learning.lessons[c.id]?.bestStars>=2).length,r=t.units||[{id:"main",title:"Քայլ առ քայլ բացահայտումներ"}],o=c=>{const l=t.lessons.filter(y=>(y.unit||"main")===c.id),u=l.some(y=>y.id===s?.id),p=l.filter(y=>e.learning.lessons[y.id]?.bestStars>=2).length;return`<details class="path-unit ${u?"active-unit":""}" ${u?"open":""}><summary><span class="unit-marker">${r.indexOf(c)+1}</span><span><strong>${c.title}</strong><span class="unit-goal">${vs[c.id]||vs.main}</span><small>${c.supplementary?"Լրացուցիչ էլեկտրոնիկա · ":""}${p} / ${l.filter(y=>y.playable).length} յուրացված${l.some(y=>y.playable)?"":" · նախապատրաստվում է"}</small></span><span class="unit-chevron">⌄</span></summary><div class="unit-path">${qs(l)}${qs(l,!0)}${l.map((y,h)=>{const v=e.learning.lessons[y.id],g=We(e,y.id,W),m=v?.bestStars||0,d=s?.id===y.id,f=m>=2?"completed":v?.attempts.length?"needs-practice":g?"available":"locked";return`<div class="unit-lesson ${f} ${d?"current":""} ${Sa[h%6]>240?"label-left":"label-right"}" style="--node-x:${Sa[h%6]/6}%;--node-mobile:${En[h%6]}px">${Fo(y,{open:g,best:m,current:d})}<div class="unit-lesson-label"><span class="lesson-code">${d?"Հաջորդ քայլը":y.code||""}</span><strong>${y.title}</strong><small>${f==="needs-practice"?"Կրկնել՝ առնվազն 2 աստղի համար":y.playable?g?m>=2?"Կարող ես կրկնել":"Պատրաստ է հետազոտությանը":"Բացիր նախորդ քայլով":"Նախապատրաստվում է"}</small>${v?.attempts.length?rt(m):""}</div></div>`}).join("")}</div></details>`};return`<div class="academy-path"><button class="text-button" data-choose-topics>← Բոլոր թեմաները</button><section class="topic-mentor"><div class="path-mascot">${$t(rn()?"idle":"greeting","","path:greeting")}</div><div class="path-robot-dialogue" aria-label="Ռոբոտի խոսքը"><span class="eyebrow">Քո ուսումնական ճանապարհը</span><h1>${t.title}</h1><p>${s?`Բացահայտենք՝ «${s.title}»։ Ես կողքիդ եմ․ սկսենք մի հարցից։`:i===n.length&&n.length?"Այս պահին հասանելի հետազոտությունները յուրացրել ես։ Կարող ես կրկնել կամ ընտրել այլ թեմա։":t.description}</p>${s?`<button class="button" data-module="${s.id}">Շարունակել →</button>`:'<button class="text-button" data-choose-topics>Ընտրել այլ թեմա →</button>'}<div class="topic-mastery"><progress value="${i}" max="${Math.max(1,n.length)}" aria-label="Յուրացված դասերը"></progress><span>${n.length?i+" / "+n.length+" դաս յուրացված է":"Դասերը նախապատրաստվում են"}</span></div></div></section><div class="unit-paths">${r.map(o).join("")}</div><p class="path-message" id="path-message" role="status"></p>${t.id==="electricity"?'<details class="curriculum-source"><summary>Նյութի ծագումն ու սահմանները</summary><p>Հիմքային դասերի բովանդակությունը գրված է այս հավելվածի համար։ Տրված դասագրքի հասանելիությունը դեռ չի հաստատվել․ էջերի համապատասխանեցում չենք պնդում։ Էլեկտրոնիկան առանձնացված է որպես լրացուցիչ նյութ։</p></details>':""}</div>`}function ll(e){const t=Object.entries(e.learning.lessons);return`<section class="mastery-progress"><h2>Քո յուրացրած գաղափարները</h2><p>Աստղերը հաշվարկվում են գիտելիքի ստուգումից։ Փորձարկելն ու կանխատեսելը միավոր չեն նվազեցնում։</p>${t.length?t.map(([a,s])=>`<div class="mastery-row"><div><strong>${W.flatMap(i=>i.lessons).find(i=>i.id===a)?.title||a}</strong><small>${s.attempts.length} փորձ · լավագույն արդյունքը</small></div>${rt(s.bestStars)}<button class="text-button" data-module="${a}">Վերանայել</button></div>`).join(""):"<p>Առաջին արդյունքը կերևա գիտելիքի ստուգումից հետո։</p>"}</section>`}function cl(e){const t=W.find(i=>i.id===e.learning.selectedTopic);if(!t)return"";const a=t.lessons.map(i=>e.learning.lessons[i.id]).filter(Boolean),s=a.reduce((i,r)=>i+(r.bestStars||0),0),n=t.lessons.find(i=>e.learning.lessons[i.id]?.attempts.length&&e.learning.lessons[i.id].bestStars<2);return`<aside class="learning-context" aria-label="Թեմայի ուղեկից"><div class="context-heading">ՔՈ ՈՒՍՈՒՄՆԱԿԱՆ ՈՒՂԻՆ</div><div class="context-stars">${Pt("star")}<strong>${s}</strong><span>վաստակած աստղ</span></div><div class="context-rule"></div><span class="eyebrow">Փոքր քայլ, հստակ նպատակ</span><h2>${n?"Ամրապնդիր գաղափարդ":"Սկսիր քո կանխատեսումից"}</h2><p>${n?"Վերադարձիր փորձիդ և նորից ստուգիր քո բացատրությունը։ Լավագույն արդյունքդ պահպանվում է։":"Պարտադիր չէ անմիջապես ճիշտ պատասխանել։ Նախ փորձիր, հետո հենվիր քո չափումների վրա։"}</p>${n?`<button class="text-button" data-module="${n.id}">Կրկնել դասը →</button>`:""}<div class="context-tip">${Pt("lamp")}<p>Երկու աստղը բացում է հաջորդ քայլը։ Փորձարկելիս միավոր չես կորցնում։</p></div></aside>`}const Ne=9.81,mt=1.225,At=1e3,Ca=101325,Gt=e=>e*Math.PI/180;function Rn({angleDeg:e=4,airSpeed:t=20,chord:a=.2,span:s=.8}={}){const n=Gt(e),i=a*s,r=.5*mt*t*t,o=e>15.5||e<-11;let c=0,l=0;if(o)c=Math.sign(e)*.85*Math.cos(n),l=.75+1.1*Math.sin(Math.abs(n));else{c=2*Math.PI*(n+Gt(2));const h=s*s/i;l=.018+c*c/(Math.PI*.85*h)}const u=Math.max(-1e3,c*r*i),p=Math.max(.001,l*r*i),y=o?2:Math.max(0,e*.45);return{cl:Number(c.toFixed(3)),cd:Number(l.toFixed(3)),lift:Number(u.toFixed(2)),drag:Number(p.toFixed(2)),stall:o,downwashDeg:Number(y.toFixed(1)),liftToDrag:p>.001?Number((u/p).toFixed(2)):0}}function Ln({motors:e=[100,100,100,100],mass:t=.8,armLength:a=.22,kt:s=1962e-7,kq:n=4e-6}={}){const i=Math.max(0,e[0]||0),r=Math.max(0,e[1]||0),o=Math.max(0,e[2]||0),c=Math.max(0,e[3]||0),l=s*i*i,u=s*r*r,p=s*o*o,y=s*c*c,h=l+u+p+y,v=t*Ne,g=a*(p-l),m=a*(y-u),d=n*(i*i+o*o),f=n*(r*r+c*c),x=d-f,b=Math.max(-35,Math.min(35,g/(t*a*3)*(180/Math.PI))),w=Math.max(-35,Math.min(35,m/(t*a*3)*(180/Math.PI))),$=b*Math.PI/180,k=w*Math.PI/180,q=h*Math.cos($)*Math.cos(k)-v,I=q/t,L=Math.abs(I)<.15&&Math.abs(x)<.002&&Math.abs(g)<.005&&Math.abs(m)<.005,E=I>=.15,T=I<=-.15;return{motors:[i,r,o,c],thrusts:[Number(l.toFixed(2)),Number(u.toFixed(2)),Number(p.toFixed(2)),Number(y.toFixed(2))],totalThrust:Number(h.toFixed(2)),weight:Number(v.toFixed(2)),pitchTorque:Number(g.toFixed(3)),rollTorque:Number(m.toFixed(3)),yawTorque:Number(x.toFixed(4)),pitchDeg:Number(b.toFixed(1)),rollDeg:Number(w.toFixed(1)),netVerticalForce:Number(q.toFixed(2)),verticalAccel:Number(I.toFixed(2)),isHovering:L,isClimbing:E,isDescending:T}}function dl({mach:e=1,speedOfSound:t=340.3}={}){const a=Math.max(.3,Math.min(3,e)),s=a*t,n=s*3.6,i=Math.abs(a-1)<.04,r=a>=1,o=a<1;let c=null,l=null;r&&(c=Math.asin(1/a),l=Number((c*180/Math.PI).toFixed(1)));const u=1.4;let p=1;r&&(p=1+2*u/(u+1)*(a*a-1));const y=o?Number((1/(1-a)).toFixed(2)):1/0;return{mach:Number(a.toFixed(2)),airspeedMs:Number(s.toFixed(1)),airspeedKmh:Number(n.toFixed(0)),isSubsonic:o,isSonic:i,isSupersonic:r,machAngleRad:c,machAngleDeg:l,pressureRatio:Number(p.toFixed(2)),dopplerCompression:y}}function Tn({throttle:e=75,bypassRatio:t=8.5,altitude:a=0,airspeedKmh:s=250}={}){const n=Math.max(0,Math.min(100,e)),i=Math.max(1,Math.min(12,t)),r=Math.max(0,Math.min(12e3,a)),o=Math.max(0,Math.min(950,s)),c=o/3.6,l=Math.max(216.65,288.15-.0065*r),p=Ca*Math.pow(Math.max(.1,1-.0065*r/288.15),5.2561)/(287.05*l),y=Math.sqrt(1.4*287.05*l),h=Number((c/y).toFixed(2)),v=.25+.75*(n/100),g=.35+.65*(n/100),d=320*(p/mt)*(.2+.8*v),f=d/(1+i),x=d-f,b=1+.75*v,w=1+36*Math.pow(g,1.5),$=700+1050*g,k=$-273.15,M=Math.sqrt(Math.max(0,c*c+2*1005*l*(Math.pow(b,.4/1.4)-1)*.95)),q=Math.sqrt(Math.max(0,c*c+2*1150*l*(Math.pow(w,.286)-1)*.45)),I=Math.max(0,x*Math.max(0,M-c)),L=Math.max(0,f*Math.max(0,q-c)),E=I+L,T=E/1e3,V=E>0?I/E*100:0,D=.018*g,Z=f*D,A=Z*3600,F=T>.1?Z*1e3/T:0,j=d>0?(x*M+f*q)/d:c,O=j+c>0?2*c/(j+c):0;return{throttle:n,bypassRatio:i,altitude:r,airspeedKmh:o,mach:h,totalMassFlow:Number(d.toFixed(1)),coreMassFlow:Number(f.toFixed(1)),bypassMassFlow:Number(x.toFixed(1)),thrustKn:Number(T.toFixed(1)),thrustBypassKn:Number((I/1e3).toFixed(1)),thrustCoreKn:Number((L/1e3).toFixed(1)),bypassThrustPercent:Number(V.toFixed(1)),fuelFlowKgS:Number(Z.toFixed(3)),fuelFlowKgH:Number(A.toFixed(0)),tsfc:Number(F.toFixed(2)),titC:Number(k.toFixed(0)),titK:Number($.toFixed(0)),fanRpmPct:Math.round(v*100),coreRpmPct:Math.round(g*100),propulsiveEff:Number((O*100).toFixed(1)),rho:Number(p.toFixed(3))}}const Fe=3986004418e5,pt=6371e3;function Aa({launchAltitudeKm:e=400,horizontalVelocityKms:t=7.67}={}){const a=Math.max(0,e*1e3),s=pt+a,n=Math.max(.1,t*1e3),i=Math.sqrt(Fe/s),r=Math.sqrt(2*Fe/s),o=n*n/2-Fe/s,c=s*n,l=-Fe/(2*o),u=1+2*o*c*c/(Fe*Fe),p=Math.sqrt(Math.max(0,u));let y,h;n>=i?(y=s,h=l>0?2*l-s:1/0):(h=s,y=2*l-s);const v=(y-pt)/1e3,g=isFinite(h)?(h-pt)/1e3:1/0,m=l>0?2*Math.PI*Math.sqrt(l*l*l/Fe):null,d=m?m/60:null,f=Fe/(s*s);let x="suborbital_crash";n>=r*.9999?x=n>r*1.0001?"hyperbolic":"parabolic":Math.abs(n-i)<25?x="circular":y>pt?x="elliptic":x="suborbital_crash";const b=[],w=72,$=x==="parabolic"||x==="hyperbolic"?1.8:2*Math.PI,k=x==="parabolic"||x==="hyperbolic"?-$:0,M=x==="parabolic"||x==="hyperbolic"?2*$/w:2*Math.PI/w;for(let q=0;q<=w;q++){const I=k+q*M;let L=0;if(p<1)L=l*(1-p*p)/(1+p*Math.cos(I));else{const D=c*c/Fe,Z=1+p*Math.cos(I);if(Z<=.05)continue;L=D/Z}const E=L/1e3,T=E*Math.sin(I),V=-E*Math.cos(I);if(b.push({x:T,y:V,rKm:E}),L<pt&&n<i&&q>0)break}return{launchRadiusM:s,launchAltitudeKm:e,horizontalVelocityKms:t,v1Kms:Number((i/1e3).toFixed(2)),vEscKms:Number((r/1e3).toFixed(2)),semiMajorAxisKm:Number((l/1e3).toFixed(1)),eccentricity:Number(p.toFixed(4)),periapsisKm:Number(v.toFixed(1)),apoapsisKm:isFinite(g)?Number(g.toFixed(1)):null,periodMin:d?Number(d.toFixed(1)):null,periodSec:m?Number(m.toFixed(0)):null,gravityAtAlt:Number(f.toFixed(2)),status:x,isStableOrbit:x==="circular"||x==="elliptic",hasCollided:y<=pt&&n<i,trajectoryPoints:b}}function Bn({collective:e=50,cyclicPitch:t=0,cyclicRoll:a=0,tailPedal:s=50,mainRpm:n=400}={}){const i=4+Math.max(0,Math.min(100,e))/100*14,r=Math.max(-50,Math.min(50,t))/50*12,o=Math.max(-50,Math.min(50,a))/50*12,c=Math.pow(n/400,2),l=22*(i/12)*c,u=r*Math.PI/180,p=o*Math.PI/180,y=l*Math.cos(u)*Math.cos(p),h=l*Math.sin(u),v=l*Math.sin(p),m=y-20,d=4200*(i/11)*c,f=4200*(Math.max(0,Math.min(100,s))/50)*c,x=f-d;let b="balanced";x>250?b="yaw_right":x<-250&&(b="yaw_left");let w="hover";return Math.abs(m)<1.5&&Math.abs(h)<.6&&b==="balanced"?w="hover":m>1.5?w="climb":m<-1.5?w="descent":Math.abs(h)>=.6&&(w=h>0?"forward":"backward"),{colPitchDeg:Number(i.toFixed(1)),tiltForwardDeg:Number(r.toFixed(1)),tiltRollDeg:Number(o.toFixed(1)),totalThrustKn:Number(l.toFixed(2)),verticalLiftKn:Number(y.toFixed(2)),forwardThrustKn:Number(h.toFixed(2)),lateralThrustKn:Number(v.toFixed(2)),netVerticalKn:Number(m.toFixed(2)),mainTorqueNm:Math.round(d),tailAntiTorqueNm:Math.round(f),netYawTorqueNm:Math.round(x),yawState:b,flightState:w,isHovering:w==="hover"}}function Fn({airSpeedKmh:e=90,bankAngleDeg:t=30,thermalStrength:a=3.5,thermalRadius:s=120,gliderMass:n=380,wingArea:i=10.5,aspectRatio:r=22,oswaldEff:o=.9,cd0:c=.0125}={}){const l=Math.max(12,e*1e3/3600),u=Gt(Math.min(65,Math.max(0,t))),p=Math.max(.2,Math.cos(u)),y=Math.tan(u),h=1/p,v=mt*i*c/(2*n*Ne),g=2*n*Ne/(Math.PI*o*r*mt*i),d=(v*Math.pow(l,3)+g*(1/l))/Math.pow(p,1.5),f=y>.05?l*l/(Ne*y):9999,x=f<9999?a*Math.exp(-Math.pow(f/s,2)):a,b=x-d,w=.5*Math.sqrt(Math.PI*o*r/c),$=Math.pow(4*Math.pow(n*Ne,2)/(Math.PI*o*r*Math.pow(mt*i,2)*c),.25)*3.6;return{forwardSpeedKmh:Number(e.toFixed(1)),bankAngleDeg:Number(t.toFixed(1)),turnRadiusM:Number(f.toFixed(1)),loadFactor:Number(h.toFixed(2)),turnSinkRate:Number(d.toFixed(2)),thermalUpdraft:Number(x.toFixed(2)),netClimbRate:Number(b.toFixed(2)),bestLd:Number(w.toFixed(1)),bestSpeedKmh:Number($.toFixed(1)),isClimbing:b>0}}function Vn({beamVoltageV:e=1500,beamCurrentA:t=1.8,propellant:a="xenon",spacecraftMassKg:s=650,massUtilization:n=.88}={}){const i={xenon:{massAmu:131.293,name:"Քսենոն (Xe)",color:"#88aaff"},krypton:{massAmu:83.798,name:"Կրիպտոն (Kr)",color:"#aaffaa"},argon:{massAmu:39.948,name:"Արգոն (Ar)",color:"#ddaaff"},iodine:{massAmu:126.904,name:"Յոդ (I₂)",color:"#ff88ee"}},r=i[a]||i.xenon,o=r.massAmu*16605390666e-37,c=1602176634e-28,l=Math.sqrt(2*c*e/o),u=l/Ne,p=t*o/c,h=p/n*1e6,v=p*l,g=v*1e3,m=t*e,d=m/.82,f=v/s*1e3,x=v/s*86400;return{propellantName:r.name,exhaustVelocityKms:Number((l/1e3).toFixed(2)),specificImpulseSec:Number(u.toFixed(0)),thrustMilliN:Number(g.toFixed(2)),beamPowerKw:Number((m/1e3).toFixed(2)),totalPowerKw:Number((d/1e3).toFixed(2)),massFlowMgS:Number(h.toFixed(2)),accelerationMmS2:Number(f.toFixed(3)),deltaVPerDayMs:Number(x.toFixed(1)),thrustToPowerRatio:Number((g/(d/1e3)).toFixed(2))}}function Nn(e={}){const a={...{bottleVolume:.0015,waterFraction:.35,pressureBar:5,dryMass:.16,nozzleDiameter:.021,rocketDiameter:.09,finCount:3,finSpanCm:6,noseShape:"conical",angleDeg:75,windSpeed:0,parachute:!0},...e},s=a.bottleVolume*Math.max(0,Math.min(.95,a.waterFraction)),n=s*At,i=a.dryMass+n,r=Math.PI*Math.pow(a.rocketDiameter/2,2),o=Math.PI*Math.pow(a.nozzleDiameter/2,2);let c=a.noseShape==="conical"?.28:.65;a.finCount===0?c+=.08:c+=a.finCount*.015;const l=(.28*a.dryMass+.65*n)/i,u=a.finCount===0?.42:.42+a.finCount*a.finSpanCm/80,p=u-l>.05,y=Gt(a.angleDeg);return{params:a,t:0,x:0,y:0,vx:0,vy:0,speed:0,pitch:y,mass:i,waterRemaining:s,pressureGauge:a.pressureBar*1e5,thrust:0,drag:0,gravity:i*Ne,apogee:0,apogeeTime:0,flightDuration:0,maxSpeed:0,status:"ready",trajectory:[{x:0,y:0,t:0,status:"ready"}],isStable:p,rocketArea:r,nozzleArea:o,cd:c,copRatio:u,comRatio:l}}function pl(e,t){if(e.status==="landed"||e.y<0)return e.y=0,e.status="landed",e;e.t+=t,e.pitch;const a=Math.hypot(e.vx,e.vy);e.speed=a,e.maxSpeed=Math.max(e.maxSpeed,a);let s=0;if(e.waterRemaining>0&&e.pressureGauge>1e3){e.status="thrust";const m=Math.sqrt(2*e.pressureGauge/At),d=At*e.nozzleArea*m,f=Math.min(e.waterRemaining,d/At*t);s=d*m+e.pressureGauge*e.nozzleArea,e.waterRemaining=Math.max(0,e.waterRemaining-f);const x=e.params.bottleVolume*(1-e.params.waterFraction),b=e.params.bottleVolume-e.waterRemaining,$=(e.params.pressureBar*1e5+Ca)*Math.pow(x/Math.max(1e-4,b),1.4);e.pressureGauge=Math.max(0,$-Ca),e.mass=e.params.dryMass+e.waterRemaining*At}else e.status==="thrust"&&(e.status="coast",e.thrust=0);e.thrust=s,!e.isStable&&e.t>.15&&e.status!=="parachute"&&e.status!=="landed"&&(e.status="tumble");let n=e.cd,i=e.rocketArea;e.status==="tumble"?(n=1.35,i=e.rocketArea*2.8):e.status==="parachute"&&(n=1.75,i=.25);const r=.5*mt*(a*a)*n*i;e.drag=r;const o=a>.01?-r*(e.vx/a):0,c=a>.01?-r*(e.vy/a):0;let l=0,u=0;if(e.status==="tumble"){const m=e.pitch+Math.sin(e.t*25)*1.2;l=s*Math.cos(m),u=s*Math.sin(m),e.pitch=m}else l=s*Math.cos(e.pitch),u=s*Math.sin(e.pitch);const p=-e.mass*Ne;e.gravity=e.mass*Ne;const y=l+o,h=u+c+p,v=y/Math.max(.01,e.mass),g=h/Math.max(.01,e.mass);return e.vx+=v*t,e.vy+=g*t,e.x+=e.vx*t,e.y+=e.vy*t,e.status==="coast"&&a>1&&(e.pitch=Math.atan2(e.vy,e.vx)),e.y>e.apogee&&(e.apogee=e.y,e.apogeeTime=e.t),e.params.parachute&&e.status==="coast"&&e.vy<0&&e.t>e.apogeeTime+.1&&(e.status="parachute"),e.y<=0&&e.t>.1&&(e.y=0,e.vy=0,e.vx=0,e.status="landed",e.flightDuration=e.t),(e.trajectory.length===0||e.t-e.trajectory[e.trajectory.length-1].t>=.05)&&e.trajectory.push({x:Number(e.x.toFixed(2)),y:Number(e.y.toFixed(2)),t:Number(e.t.toFixed(2)),status:e.status}),e}const ya=[{id:"water-rocket",title:"Պնևմատիկ/Ջրային Շշե Հրթիռ",subtitle:"Նյուտոնի 3-րդ օրենքը գործողության մեջ · Թռիչք մինչև 40 մետր",difficulty:"Միջին",buildTime:"30 րոպե",materials:["1.5 լ կամ 2 լ գազավորված ըմպելիքի ամուր պլաստիկ շիշ","Հեծանվային պոմպ (մանոմետրով) և ավտոմեքենայի/հեծանիվի փական (վենտիլ)","Ռետինե խցան կամ գինու խցան՝ շշի բերանին հերմետիկ հարմարվող","Հաստ ստվարաթուղթ կամ պլաստիկ թիթեղ՝ 3-4 կայունարար թևերի համար","Կպչուն ժապավեն (սկոչ) կամ տաք սոսինձ","Ջուր (շշի ծավալի 1/3-ը)"],physicsSecret:"Ինչու՞ ջուր։ Միայն սեղմված օդով շշի արտանետած զանգվածը շատ փոքր է ($m_{\\text{օդ}} \\approx 2\\text{ գ}$), ուստի իմպուլսը ($p = mv$) չի բավականացնում։ Ջրի խտությունը 800 անգամ մեծ է օդից։ Երբ սեղմված օդը դուրս է մղում ջուրը մեծ արագությամբ, ռեակտիվ ուժը հրթիռը նետում է տասնյակ մետրեր վեր։ Իսկ հետևի թևերը Ճնշման Կենտրոնը (CoP) տանում են ետ՝ կանխելով օդում գլխիվայր պտտվելը (tumble)։",steps:[{title:"Քթամասի պատրաստում",detail:"Մեկ այլ շշի վերին մասը կտրիր կոնաձև և ամրացրու հրթիռի հատակին։ Քթամասի մեջ ավելացրու 20-30 գրամ պլաստիլին կամ թուղթ, որպեսզի Ծանրության Կենտրոնը (CoM) առաջ տեղափոխվի։"},{title:"Կայունարար թևերի ամրացում",detail:"Ստվարաթղթից կտրիր 3 կամ 4 եռանկյուն թև։ Շշի ներքևի մասում (փողակի մոտ) սիմետրիկորեն՝ 120° (կամ 90°) անկյան տակ, ամուր սոսնձիր թևերը։ Դրանք պետք է լինեն ուղիղ, ոչ ծուռ։"},{title:"Փականով խցանի հավաքում",detail:"Խցանի կենտրոնով անցկացրու հեծանվային փականը։ Այն պետք է լինի բացարձակ հերմետիկ, որպեսզի օդը չարտահոսի։"},{title:"Լիցքավորում և արձակում",detail:"Շշի մեջ լցրու 1/3 ջուր։ Հերմետիկ փակիր խցանով, հրթիռը տեղադրիր արձակման հենարանին (բաց տարածքում, մարդկանցից հեռու)։ Միացրու պոմպը և սկսիր օդ մղել մինչև 3–4 մթնոլորտ (բար)։ Խցանը դուրս կթռչի, և հրթիռը վեր կսլանա։"}],troubleshooting:["Եթե հրթիռը օդում պտտվում է կամ չի բարձրանում՝ թևերը բացակայում են, ծուռ են, կամ քթամասը բավարար ծանր չէ։","Եթե շատ քիչ է թռչում՝ ջուրը կամ չափազանց շատ է (օդի տեղ չկա), կամ չափազանց քիչ (արտանետվող զանգված չկա)։ Օպտիմալը 30–35% ջուրն է։"]},{id:"balloon-rocket",title:"Սենյակային Ռեակտիվ Փուչիկ-Հրթիռ",subtitle:"Գերարագ ցուցադրություն լարի վրա · 0 ծախս, 100% ֆիզիկա",difficulty:"Հեշտ",buildTime:"10 րոպե",materials:["Երկարավուն կամ սովորական ռետինե փուչիկ","Հյութի պլաստիկ ձողիկ (սլամիկ)","4-6 մետր բարակ թել կամ ձկնորսական լար (մոնոֆիլամենտ)","Կպչուն ժապավեն (սկոչ)","Երկու աթոռ կամ հենարան՝ լարը ձգելու համար"],physicsSecret:"Երբ փուչիկը փչում ենք, ռետինե պատերը սեղմում են ներսի օդը։ Բաց թողնելիս օդը բարձր արագությամբ դուրս է նետվում դեպի ետ։ Ըստ Նյուտոնի 3-րդ օրենքի՝ դուրս ժայթքող օդը հավասար և հակառակ ուղղված ուժով (ռեակտիվ քարշուժ) փուչիկին հրում է առաջ։ Ուղղորդող լարը վերացնում է քաոսային պտույտները և ցույց է տալիս ուղղագիծ արագացումը։",steps:[{title:"Լարի անցկացում",detail:"Թելն անցկացրու ձողիկի միջով և երկու ծայրերն ամուր կապիր երկու աթոռների միջև՝ սենյակի ողջ երկարությամբ։ Լարը պետք է լինի ձիգ։"},{title:"Փուչիկի պատրաստում",detail:"Փչիր փուչիկը, բայց մի՛ կապիր բերանը․ պահիր մատներով կամ փակիր գրասենյակային սեղմակով։"},{title:"Ամրացում ձողիկին",detail:"Երկու կտոր կպչուն ժապավենով փուչիկը զուգահեռ ամրացրու ձողիկի ներքևի մասին այնպես, որ փուչիկի բերանը նայի դեպի մեկնարկի կողմը։"},{title:"3… 2… 1… Մեկնարկ",detail:"Բաց թող փուչիկի բերանը։ Փուչիկը վայրկյանների ընթացքում սլանում է լարի ողջ երկայնքով։"}],troubleshooting:["Եթե փուչիկը կանգ է առնում կեսից՝ թելը բավարար ձիգ չէ կամ ձողիկը ծռվել է։ Օգտագործիր ավելի հարթ ձկնորսական թել։"]},{id:"aeroglider",title:"Գերճշգրիտ Աերոդինամիկ Ճախրասավառնակ",subtitle:"Վերամբարձ ուժ, Բեռնուլիի օրենք և ինքնակայունացում",difficulty:"Միջին",buildTime:"20 րոպե",materials:["A4 ֆորմատի խիտ գրասենյակային թուղթ կամ բարակ պենոպլաստ","Մետաղական թղթի սեղմակ (սկրեպկա)՝ քթամասի ծանրության համար","Մկրատ և քանոն","Կպչուն ժապավեն"],physicsSecret:"Ճախրասավառնակը շարժիչ չունի․ այն առաջ է շարժվում սկզբնական նետման էներգիայով և ծանրության հաշվին՝ սահելով օդի վրայով։ Թևերի թեթևակի V-աձև բարձրացումը (Dihedral angle) ստեղծում է ինքնակայունացում․ եթե սավառնակը թեքվում է մի կողմ, այդ կողմի թևն ավելի շատ վերամբարձ ուժ է ստանում և ուղղում է թռիչքը։ Ետևի եզրերի թեթև ծալքերը (էլևոններ) կարգավորում են բարձրությունը։",steps:[{title:"Թևերի ծալում և ձևավորում",detail:"Թուղթը երկայնքով ծալիր կիսով չափ։ Ստեղծիր լայն թևեր՝ հետևի եզրում ունենալով 5-8 մմ ազատ ղեկային շերտ (էլևոններ)։"},{title:"Dihedral (V-աձև) անկյան ստեղծում",detail:"Թևերը մի՛ պահիր հորիզոնական հարթ։ Կորպուսից թևերը թեթևակի (5-10°) բարձրացրու դեպի վեր, որպեսզի առջևից նայելիս ունենան V-աձև տեսք։"},{title:"Քթամասի բալանսավորում",detail:"Քթամասին ամրացրու 1 կամ 2 թղթի սեղմակ։ Առանց ծանր քթամասի սավառնակը օդում կտատանվի (stall) և կընկնի պոչի վրա։"},{title:"Կարգավորող թռիչքներ",detail:"Նետիր հարթ և մեղմ։ Եթե քթով ընկնում է՝ թեթևացրու քիթը կամ էլևոնները 1 մմ բարձրացրու վեր։ Եթե ալիքաձև է շարժվում՝ ծանրացրու քիթը։"}],troubleshooting:["Անկայուն թռիչք (դեպի վեր, ապա կտրուկ անկում) = Ծանրության կենտրոնը շատ ետ է։ Ավելացրու քթամասի սեղմակը։","Շրջադարձ մի կողմ = Թևերից մեկը ծռված է։ Համեմատիր թևերի սիմետրիան քանոնով։"]},{id:"paper-rotorcraft",title:"Ավտորոտացիոն Միկրո-Ուղղաթիռ",subtitle:"Օդի հանդիպակաց հոսքից ստեղծվող պտտող մոմենտ և սահուն վայրէջք",difficulty:"Հեշտ",buildTime:"5 րոպե",materials:["Սովորական թուղթ (15 × 5 սմ շերտ)","Մկրատ","1 հատ մետաղական թղթի սեղմակ"],physicsSecret:"Երբ սարքն ընկնում է, ներքևից բարձրացող օդի հոսքը ճնշում է երկու հակադիր ծալված թևերին։ Քանի որ թևերը ծալված են հակառակ ուղղություններով, օդի դիմադրության ուժերը ստեղծում են պտտող մոմենտ (Torque): Սարքը սկսում է արագ պտտվել (ավտորոտացիա)։ Պտտվող թևերը վերածվում են «օդային պտուտակի», որը դանդաղեցնում է վայրէջքը ճիշտ պարաշյուտի պես։ Բնության մեջ նույն սկզբունքով են պտտվելով իջնում թխկենու (կլյոնի) սերմերը։",steps:[{title:"Կտրվածքների պատրաստում",detail:"Թղթի վերին կեսը երկայնքով կտրիր կենտրոնից՝ ստեղծելով երկու թև (A և B)։ Մեջտեղից կատարիր երկու փոքր հորիզոնական կտրվածք կողքերից։"},{title:"Թևերի հակառակ ծալում",detail:"Մեկ թևը ծալիր առաջ, իսկ մյուսը՝ ետ (մոտ 80-90° անկյան տակ)։"},{title:"Ուղղաձիգ ոտքի ձևավորում",detail:"Ներքևի կողային մասերը ծալիր դեպի ներս, ապա ծայրը 1 սմ ծալիր վեր և ամրացրու թղթի սեղմակով՝ ծանրության համար։"},{title:"Արձակում բարձրությունից",detail:"Բարձրացրու գլխավերև և բաց թող։ Այն միլիվայրկյանների ընթացքում կսկսի սահուն պտտվել և հանդարտ իջնել հատակին։"}],troubleshooting:["Եթե ընկնում է առանց պտտվելու՝ սեղմակը չափազանց ծանր է կամ թևերը բավարար բացված չեն։ Թևերը թեթևակի բացիր հորիզոնականից վեր։"]},{id:"walkalong-glider",title:"Քայլող Սավառնակ (Air Surfer)",subtitle:"Անվերջ սավառնում՝ ստվարաթղթով ստեղծվող արհեստական վերընթաց հոսանքի վրա",difficulty:"Միջին",buildTime:"15 րոպե",materials:["Թեթև նոթատետրի թուղթ կամ պոլիստիրոլ (տարրա) շերտ","Մկրատ և քանոն","Մեծ ստվարաթուղթ (40 × 50 սմ)՝ որպես օդային սերֆինգի վահան"],physicsSecret:"Երբ դու քայլում ես առաջ՝ ստվարաթուղթը պահելով 45° անկյան տակ, հանդիպակաց օդի հոսքը շեղվում է վեր՝ ստեղծելով ուժեղ լեռնային վերընթաց հոսանք (Ridge Updraft)։ Սավառնակը տեղադրվում է այդ հոսանքի գագաթին․ նրա բնական իջեցման արագությունը (sink rate) հավասարակշռվում է բարձրացող օդով, և այն թռչում է անվերջ՝ առանց որևէ շարժիչի կամ մարտկոցի։",steps:[{title:"Գերթեթև թևի կտրում",detail:"Թղթից կտրիր 20 × 5 սմ շերտ։ Առջևի եզրը 3 անգամ բարակ (3 մմ) ծալիր առաջ՝ քաշը կենտրոնացնելու համար։"},{title:"Կայունարար ականջների (winglets) ծալում",detail:"Երկու կողմերի ծայրերից 1.5 սմ ծալիր ուղղահայաց վեր (90°), որպեսզի սավառնակը չշեղվի կուրսից։"},{title:"Ստվարաթղթե ալիքի ստեղծում",detail:"Վերցրու ստվարաթուղթը, բռնիր երկու ձեռքով 45° թեքությամբ և սկսիր հանգիստ քայլել սենյակով մեկ։"},{title:"Սերֆինգ օդային ալիքի վրա",detail:"Սավառնակը զգուշորեն բաց թող ստվարաթղթի վերին եզրից 15 սմ առաջ։ Քայլիր նրա ետևից՝ պահպանելով հեռավորությունը։ Սավառնակը կսահի օդի ալիքի վրայով։"}],troubleshooting:["Եթե սավառնակը կտրուկ ընկնում է՝ քայլիր մի փոքր ավելի արագ կամ թեքիր ստվարաթուղթը մի փոքր ավելի կտրուկ։","Եթե շրջվում է դեպի քեզ՝ ստվարաթուղթը շատ մոտ է սավառնակին։"]},{id:"micro-drone-rig",title:"Քվադրոկոպտերի Իմպուլսի Մոմենտների Ստենդ",subtitle:"Հակադիր պտտվող զույգերի (CW/CCW) ռեակտիվ պտտող մոմենտի ցուցադրություն",difficulty:"Բարդ",buildTime:"30 րոպե",materials:["2 հատ պլաստիկ հյութի ձողիկ (խաչաձև ամրացված)","4 հատ փոքր խաղալիք պտուտակ (2 CW, 2 CCW)","Թել կամ առանցքակալով ասեղ կենտրոնում"],physicsSecret:"Եթե միացնենք միայն 1 շարժիչ, ձողիկների խաչը կսկսի կատաղի պտտվել հակառակ ուղղությամբ (Նյուտոնի 3-րդ օրենք և իմպուլսի պտտման մոմենտի պահպանում)։ Բայց երբ միացնում ենք 2 ժամսլաքով (CW) և 2 հակառակ (CCW) պտուտակները հավասար արագությամբ, նրանց օդային ռեակտիվ մոմենտները ճշգրիտ զրոյացնում են միմյանց ($\\\\tau_{\\\\text{net}} = 0$), և դրոնը մնում է կատարյալ անշարժ։",steps:[{title:"Խաչաձև կորպուսի պատրաստում",detail:"Երկու ձողիկները մեջտեղից սոսնձիր խաչաձև (90° անկյան տակ)։ Կենտրոնում անցկացրու բարակ ասեղ՝ ազատ պտտման առանցք ապահովելու համար։"},{title:"Պտուտակների ճիշտ տեղադրում",detail:"1-ին և 3-րդ ծայրերին տեղադրիր CW պտուտակները, իսկ 2-րդ և 4-րդ ծայրերին՝ CCW պտուտակները։"},{title:"Ռեակտիվ պտույտի (Yaw) փորձ",detail:"Պտտիր միայն 1 պտուտակը․ ամբողջ կառուցվածքը կսկսի պտտվել հակառակ ուղղությամբ։ Այժմ պտտիր բոլոր 4-ը․ կառուցվածքը կմնա անշարժ՝ բարձրանալով վեր։"}],troubleshooting:["Եթե ստենդը ինքնաբերաբար պտտվում է՝ ստուգիր, որ CW և CCW պտուտակները շփոթված չլինեն տեղերով։"]},{id:"jet-car",title:"Պնևմատիկ Ռեակտիվ Ավտոմեքենա (Jet Car)",subtitle:"Նյուտոնի 3-րդ օրենքը ցամաքային արագության վրա · Փուչիկային ռեակտիվ քարշ",difficulty:"Հեշտ",buildTime:"20 րոպե",materials:["1 հատ թեթև պլաստիկ շիշ կամ հյութի տուփ (կորպուս)","4 հատ պլաստիկ կափարիչ (անիվներ) և 2 հատ փայտե շամփուր (առանցքներ)","2 հատ ըմպելիքի ձողիկ (առանցքակալներ)","1 հատ մեծ փուչիկ և 1 հատ լայն ձողիկ (ռեակտիվ ծայրափողակ)"],physicsSecret:"Երբ փուչիկից սեղմված օդը մեծ արագությամբ դուրս է ժայթքում ետևի ծայրափողակից, օդի իմպուլսը ($p = m v$) առաջ է մղում մեքենան ճիշտ նույն հակադիր ուժով ($F = \\dot{m} v_e$)։ Ծայրափողակի տրամագծի մեծացումը մեծացնում է քարշուժը, բայց արագ սպառում է օդը, իսկ նեղ ծայրափողակն ապահովում է երկարատև սահուն արագացում։",steps:[{title:"Շասսիի և անիվների հավաքում",detail:"Շշի կողքերին սոսնձիր երկու լայն ձողիկներ։ Դրանց միջով անցկացրու փայտե շամփուրները և ծայրերին ամրացրու կափարիչ-անիվները։ Ստուգիր, որ անիվները ազատ պտտվեն։"},{title:"Ռեակտիվ շարժիչի մոնտաժ",detail:"Փուչիկի բերանին ամուր իզոլենտով ամրացրու լայն ձողիկը։ Ամբողջ հանգույցը հորիզոնական ամրացրու մեքենայի տանիքին՝ ձողիկի ծայրը ուղղելով ետ։"},{title:"Լիցքավորում և արշավ",detail:"Փչիր փուչիկը ձողիկի միջով, փակիր մատով, տեղադրիր հարթ հատակին և բաց թող։ Ռեակտիվ շիթը մեքենան առաջ կնետի հսկայական արագությամբ։"}],troubleshooting:["Եթե մեքենան շեղվում է կողք՝ անիվների առանցքները զուգահեռ չեն։","Եթե տեղից չի շարժվում՝ շփումը մեծ է առանցքների վրա, կամ փուչիկը չափազանց ծանր է նստած անիվների վրա։"]},{id:"diy-wind-tunnel",title:"Ծխային Աերոդինամիկ Խողովակ (DIY Smoke Tunnel)",subtitle:"Հոսքագծերի և Բեռնուլիի վերամբարձ ուժի տեսանելի փորձարկում",difficulty:"Բարդ",buildTime:"40 րոպե",materials:["Թափանցիկ երկար պլաստիկ արկղ կամ մեծ 2.5լ շիշ (երկու ծայրերը կտրված)","12V համակարգչային հովացուցիչ (cooler fan) կամ վարսահարդարիչ (սառը ռեժիմով)","30 հատ հյութի ձողիկներ (մեղրախորիսխային հոսքի ուղղիչ / honeycomb grid)","Խնկի ձողիկ (անվնաս ծխի աղբյուր) և ստվարաթղթե թևի մոդել"],physicsSecret:"Համակարգչային հովացուցիչը ստեղծում է քաշող օդահոսք։ Ձողիկների մեղրախորիսխը (Honeycomb) հեռացնում է քաոսային տուրբուլենտությունը և ստեղծում զուգահեռ լամինար հոսք։ Երբ խնկի ծուխը մտնում է խողովակ, ծխի բարակ շերտերը հստակ ցույց են տալիս, թե ինչպես են մասնիկները շրջանցում թևի կորությունը և արագանում վերին մակերեսին։",steps:[{title:"Մեղրախորիսխի պատրաստում",detail:"Ձողիկները կտրիր 4 սմ երկարությամբ և կապոցով սոսնձիր իրար։ Տեղադրիր խողովակի մուտքին՝ օդի հոսքը հարթելու համար։"},{title:"Փորձարկման խցիկի տեղադրում",detail:"Խողովակի կենտրոնում բարակ մետաղալարով կախիր փոքրիկ թևի պրոֆիլը՝ թույլ տալով փոխել գրոհի անկյունը։"},{title:"Ծխի մատակարարում և աշխատանք",detail:"Միացրու հովացուցիչը։ Մուտքի մոտ տեղադրիր ծխացող խնկի ձողիկը։ Դիտիր, թե ինչպես են ծխի շերտերը սահում թևի վրայով և ինչպես է առաջանում հոսքի պոկում (stall) մեծ անկյունների դեպքում։"}],troubleshooting:["Եթե ծուխը խառնվում է քաոսային՝ հովացուցիչը շատ ուժեղ է կամ մեղրախորիսխը շատ կարճ է։"]},{id:"flettner-glider",title:"Մագնուսի Էֆեկտով Թռչող Գլան (Ֆլետների Սավառնակ)",subtitle:"Պտտվող մարմնի աերոդինամիկ վերամբարձ ուժ · Բեռնուլիի օրենքը գործողության մեջ",difficulty:"Հեշտ",buildTime:"15 րոպե",materials:["2 միատեսակ թղթե կամ պլաստիկ բաժակ (200-300 մլ)","Կպչուն ժապավեն (սկոչ կամ էլեկտրոիզոլացիոն ժապավեն)","3-4 հատ սովորական ռետինե օղակներ (փողկապ ռետիններ)","Փայտե քանոն կամ ձողիկ (որպես արձակման բռնակ)"],physicsSecret:"Մագնուսի էֆեկտ. Երբ ետադարձ պտույտով (backspin) արձակված գլանը սլանում է առաջ, վերին մակերևույթի պտույտի ուղղությունը համընկնում է հանդիպակաց օդահոսքին՝ արագացնելով այն (նվազեցնելով ճնշումը ըստ Բեռնուլիի)։ Ներքևում շարժումը հակառակ է, և ճնշումը բարձրանում է։ Առաջացած հսկայական վերամբարձ ուժը և ներքև շեղված օդահոսքը (downwash) ստիպում են գլանին սահուն ճախրել օդում՝ հաղթահարելով գրավիտացիան։",steps:[{title:"Գլանի միացում",detail:"Երկու բաժակների հատակները դեմ-դիմաց ամուր կպցրու լայն կպչուն ժապավենով։ Պետք է ստացվի ավազե ժամացույցի տեսք ունեցող համաչափ գլան։"},{title:"Ռետինե շղթայի պատրաստում",detail:"3 կամ 4 ռետինները հանգույցով միացրու իրար՝ ստանալով 30-40 սմ երկարությամբ առաձգական շղթա։ Մի ծայրը կապիր քանոնի ծայրին։"},{title:"Լիցքավորում ետադարձ պտույտով",detail:"Ռետինի ազատ ծայրը սեղմիր բաժակների միացման հատվածին և ռետինը 2-3 պտույտով ամուր փաթաթիր մեջտեղում՝ ՆԵՐՔԵՎԻՑ ՎԵՐԵՎ, որպեսզի բաց թողնելիս այն պտտվի դեպի ետ (backspin)։"},{title:"Արձակում",detail:"Ձախ ձեռքով առաջ մեկնիր քանոնը, աջով ձգիր գլանը դեպի քեզ (ինչպես պարսատիկը) և բաց թող։ Գլանը կտրուկ վեր կսլանա և կսկսի ճախրել։"}],troubleshooting:["Եթե գլանը անմիջապես սուզվում է գետին՝ ռետինը փաթաթել ես սխալ ուղղությամբ (topspin), որն առաջացնում է ներքև սեղմող ուժ։ Փաթաթիր ներքևից վերև։","Եթե թռիչքը ծուռ է՝ բաժակները սոսնձված են ոչ կենտրոնական։ Ուղղիր սիմետրիան։"]},{id:"gravity-well",title:"Տարածաժամանակի և Օրբիտալ Գրավիտացիոն Ջրհոր",subtitle:"Կեպլերի օրբիտաներ, արբանյակների պտույտ և էյնշտեյնյան տարածության կորություն",difficulty:"Միջին",buildTime:"30 րոպե",materials:["Էլաստիկ ձգվող կտոր (սպանդեքս կամ լայկրա, 1x1 մետր)","Մեծ կլոր շրջանակ կամ օղակ (հուլա-հուպ կամ կլոր սեղանի հիմք, 80-100 սմ)","6-8 հատ գրասենյակային ամուր սեղմակներ (կլիպսեր)","Կենտրոնական ծանր գունդ (500 գ - 1 կգ մետաղական գունդ կամ ծանրաքար)","Մանր մետաղական և ապակե գնդիկներ (մարբլներ, 5-20 գրամ)"],physicsSecret:"Կտորի կորությունը մոդելավորում է $U(r) \\sim -1/r$ գրավիտացիոն պոտենցիալ դաշտը։ Շոշափող արագությամբ նետված գնդիկները գծում են էլիպսաձև Կեպլերյան ուղեծրեր։ Երբ շփումը դանդաղեցնում է գնդիկը, նրա օրբիտան պարուրաձև նեղանում է՝ ցուցադրելով արհեստական արբանյակների մթնոլորտային արգելակումն ու անկումը։",steps:[{title:"Թաղանթի ձգում",detail:"Սպանդեքս կտորը հավասարաչափ ձգիր օղակի վրա և ամրացրու սեղմակներով։ Կտորը պետք է լինի հարթ, առանց ծալքերի։"},{title:"Ձգողության կենտրոնի ստեղծում",detail:"Ծանր գունդը դիր կտորի ճիշտ կենտրոնում։ Այն կձևավորի խորը գրավիտացիոն փոս (ջրհոր)։"},{title:"Օրբիտալ արձակում",detail:"Վերցրու փոքր գնդիկը և նետիր կենտրոնի շուրջ շոշափող ուղղությամբ (ոչ թե դեպի կենտրոն)։ Գտիր այն արագությունը, որի դեպքում գնդիկը կատարում է կայուն շրջանաձև պտույտ։"}],troubleshooting:["Եթե գնդիկը միանգամից ընկնում է կենտրոն՝ նետման հորիզոնական արագությունը փոքր է առաջին տիեզերական արագությունից ($v_0 < v_1$)։","Եթե գնդիկը դուրս է թռչում օղակից՝ արագությունը գերազանցել է խույսի արագությունը ($v_0 > v_{\\text{esc}}$)։"]},{id:"diy-ornithopter",title:"Բիոմիմետիկ Թափահարող Թև (Ռետինամոտորով Օրնիտոպտեր)",subtitle:"Թռչնանման թռիչքի ինժեներիա · Լևերային մեխանիզմ և ճկուն աերոէլաստիկ թև",difficulty:"Միջին / Բարդ",buildTime:"45 րոպե",materials:["Բամբուկե շամփուրներ (20 սմ) կամ 1.5 մմ ածխածնային (carbon) ձողիկներ","Ավիամոդելային էլաստիկ ռետինե քուղ (1.5-2 մմ լայնությամբ, 30 սմ երկարությամբ)","Պոլիէթիլենային թաղանթ կամ թեթև մոմած թուղթ / ծխախոտի թուղթ (կալկա)","Պողպատե ամուր մետաղալար (0.8-1 մմ)՝ ծնկաձև լիսեռ (կրանկ) պատրաստելու համար","Հյութի պլաստիկ ձողիկ (սլամիկ) կամ բարակ պլաստիկ ուլունքներ (առանցքակալի համար)","Սուպերսոսինձ (ցիանակրիլատ) կամ տաք սոսինձ և կարի ամուր թել","Կլորաշուրթ աքցան (ծռելու համար)"],physicsSecret:"Ինչո՞ւ է թափահարող թևը թռչունին առաջ մղում, այլ ոչ թե միայն վեր ու վար ցնցում։ Գաղտնիքը թևի ճկուն աերոէլաստիկության (aeroelasticity) մեջ է։ Թևի առաջնային եզրը կոշտ է, իսկ հետևի թաղանթը՝ ճկուն։ Ներքև հարվածի (downstroke) ժամանակ օդի ճնշումը հետևի եզրը ծալում է վեր, ինչի շնորհիվ վերամբարձ ուժի վեկտորը թեքվում է առաջ՝ առաջացնելով և՛ վերամբարձ ուժ, և՛ քարշուժ։ Իսկ Ստրուհալի թիվը (St = f·A/v) 0.2-0.4 միջակայքում ապահովում է մրրիկների պտտման օպտիմալ արդյունավետություն։",steps:[{title:"1. Ֆյուզելաժի (հիմնական առանցքի) պատրաստում",detail:"Վերցրու 20-22 սմ երկարությամբ բամբուկե կամ ածխածնային ձողը։ Առջևի ծայրին ամրացրու 1.5 սմ երկարությամբ պլաստիկ ձողիկը (առանցքակալ)՝ փաթաթելով թելով և սոսնձելով։ Հետևի ծայրին սոսնձիր մետաղալարե փոքրիկ կեռիկ՝ ռետինի համար։"},{title:"2. Ծնկաձև լիսեռի (կրանկշաֆտի) ծռում",detail:"0.8 մմ պողպատե լարից պատրաստիր Z-աձև ծնկաձև լիսեռ (ծնկի շառավիղը՝ 6-8 մմ)։ Անցկացրու առջևի առանցքակալի միջով, իսկ ետևի ծայրը ծռիր կեռիկի տեսքով։ Ծնկին ամրացրու երկու միացնող շատուններ։"},{title:"3. Թևերի հոդակապային մեխանիզմի հավաքում",detail:"Ֆյուզելաժի առջևում ամրացրու T-աձև խաչմերուկ։ Երկու թևերի առաջնային ձողերը հոդակապով ամրացրու T-աձև հենարանին, իսկ շատունները միացրու թևերի լծակներին, որպեսզի լիսեռի պտույտի դեպքում թևերը հավասարաչափ վեր ու վար թափահարեն։"},{title:"4. Ճկուն թաղանթի (մեմբրանի) փակցնում",detail:"Թեթև պոլիէթիլենից կամ կալկայից կտրիր թևի ուրվագիծը (30 սմ ընդհանուր բացվածքով)։ Կարևոր է՝ սոսնձիր ՄԻԱՅՆ առաջնային կոշտ ձողին և ֆյուզելաժին։ Հետևի եզրը պետք է մնա լիովին ազատ և ճկուն։"},{title:"5. Պոչային կայունարարի տեղադրում",detail:"Ֆյուզելաժի հետևում սոսնձիր V-աձև պոչ՝ հորիզոնականից 10-15° դեպի վեր թեքությամբ՝ ապահովելով տանգաժային կայունություն։"},{title:"6. Ռետինամոտորի լարում և թռիչք",detail:"Ռետինե քուղը միացրու կեռիկների միջև։ Լարիր ռետինը 120-150 պտույտով։ Պահիր մարմինը հորիզոնական, բաց թող թևերը և թեթևակի հրիր առաջ։ Թռչունը թափահարելով կսլանա օդ։"}],troubleshooting:["Եթե թռչունը պտտվում է գետնին՝ թևերի մեմբրանի լարվածությունը անհավասար է։ Հավասարեցրու թաղանթը։","Եթե թափահարում է, բայց չի բարձրանում՝ հետևի եզրը չափազանց կոշտ է (չի ճկվում) կամ պոչի անկյունը փոքր է։"]},{id:"diy-glider-polar",title:"Բարձր Աերոդինամիկ Որակի Թերմիկ Սավառնակ",subtitle:"V-աձև կայունացում (Dihedral), պոլյարա և վերընթաց տաք հոսանքների որսում",difficulty:"Միջին",buildTime:"35 րոպե",materials:["Թեթև բալսա փայտ (1.5-2 մմ) կամ դեպրոն (առաստաղի թեթև փրփրապլաստ, 3 մմ)","Ծանրոցի պլաստիլին կամ մանր մետաղադրամ (քթամասի CoM բալանսավորման համար)","Քանոն, մատիտ և մոդելային դանակ","Թղթե կպչուն ժապավեն (մալյարնի սկոչ) կամ PVA սոսինձ","Հղկաթուղթ (մանրահատիկ նաշկա)՝ թևի պրոֆիլի առաջնամասը կլորացնելու համար"],physicsSecret:"Ինչու՞ է սավառնակը կարողանում հարյուրավոր մետրեր սահել առանց շարժիչի։ Գաղտնիքը աերոդինամիկ որակի ($L/D > 15-20$) մեջ է։ Թևի V-աձև թեքությունը (Dihedral angle, 4-6°) ապահովում է ինքնակայունացում կողաթեքման (roll) ժամանակ. երբ սավառնակը թեքվում է մի կողմ, ցածր թևի հորիզոնական պրոյեկցիան և վերամբարձ ուժը մեծանում են՝ ինքնուրույն ուղղելով թռիչքը։ Իսկ Ծանրության Կենտրոնը (CoM) թևի առաջնային քորդայի 28-33%-ի վրա տեղադրելով՝ ապահովվում է կատարյալ տանգաժային կայունություն։",steps:[{title:"Թևերի և պրոֆիլի ձևավորում",detail:"Կտրիր 40 սմ երկարությամբ և 7 սմ լայնությամբ թևի սալիկը։ Հղկաթղթով զգուշորեն կլորացրու վերին առաջնային եզրը, իսկ հետևի եզրը հղկիր սրածայր՝ ստանալով Բեռնուլիի աերոդինամիկ պրոֆիլ։"},{title:"V-աձև Dihedral անկյան ստեղծում",detail:"Թևը կենտրոնից կիսիր երկու մասի։ Ծայրերը բարձրացրու 2-3-ական սմ դեպի վեր և կենտրոնում միացումն ամրացրու սոսնձով ու կպչուն ժապավենով։"},{title:"Ֆյուզելաժի և պոչի հավաքում",detail:"Վերցրու 35 սմ երկարությամբ ուղիղ ձողը։ Հետևի ծայրին ամրացրու հորիզոնական ստաբիլիզատորը և կիլը։ Թևը ամրացրու ֆյուզելաժի վրա առջևից մոտ 8 սմ հեռավորության վրա։"},{title:"Բալանսավորում (CoM կարգավորում)",detail:"Հենիր սավառնակը երկու մատներիդ վրա՝ թևի առաջնային եզրից 2.2 սմ խորությամբ։ Եթե պոչը ծանր է՝ քթամասին ավելացրու մի փոքր պլաստիլին, մինչև սավառնակը կանգնի կատարյալ հորիզոնական։"},{title:"Փորձնական արձակում և թերմիկների որս",detail:"Սավառնակը արձակիր թեթևակի հորիզոնական հրումով։ Ճիշտ կարգավորված մոդելը սահուն կսավառնի ամբողջ սենյակով կամ բացատով՝ օգտագործելով անգամ ամենափոքր վերընթաց օդային հոսքերը։"}],troubleshooting:["Եթե սավառնակը ալիքաձև ցատկոտում է (stall-dive-stall)՝ քթամասը չափազանց թեթև է։ Ավելացրու պլաստիլին քթին։","Եթե քարի պես սուզվում է գետին՝ քիթը ծանր է։ Հեռացրու մի փոքր պլաստիլին։"]}],ut=[{id:"rocket-water-why",question:"Ինչու՞ է 1/3 ջրով լցված հրթիռը թռչում շատ ավելի բարձր, քան միայն սեղմված օդով լցված նույն հրթիռը։",options:["Ջուրը հեղուկ է և քսանյութի պես նվազեցնում է շշի շփումը օդի հետ","Ջրի խտությունը մեծ է, ուստի արտանետվող զանգվածն ու ռեակտիվ իմպուլսը շատ ավելի հզոր են","Ջուրը շոգիանում է և ստեղծում գերտաք գոլորշու ատոմային ճնշում","Միայն օդով հրթիռը չափազանց թեթև է, ուստի ձգողականության ուժը նրան չի կարողանում հրել"],correct:1,explanation:"Ճիշտ է։ Ռեակտիվ շարժման իմպուլսը որոշվում է արտանետվող զանգվածի և արագության արտադրյալով ($p = m v$): Ջրի խտությունը 800 անգամ մեծ է օդից, ուստի նույն ճնշման տակ դուրս ժայթքող ջուրը հաղորդում է շատ ավելի մեծ քարշուժ ($F_{\\text{քարշ}} = \\dot{m} v_e$):"},{id:"rocket-fin-stability",question:"Ի՞նչ տեղի կունենա, եթե հրթիռի վրայից ամբողջությամբ հեռացնենք հետևի կայունարար թևերը (fins)։",options:["Հրթիռը կթռչի շատ ավելի ուղիղ, քանի որ չկա թևերի ավելորդ քաշ","Հրթիռը կհասնի լուսնին, քանի որ օդի դիմադրությունը կդառնա զրո","Հրթիռը օդում կկորցնի կայունությունը, կսկսի քաոսային պտտվել (tumble) և կընկնի","Հրթիռը կմնա արձակման հարթակին և ընդհանրապես չի պոկվի գետնից"],correct:2,explanation:"Ճիշտ է։ Կայուն թռիչքի համար Ճնշման Կենտրոնը (CoP) պետք է գտնվի Ծանրության Կենտրոնից (CoM) ետ։ Թևերը մեծացնում են հետևամասի մակերեսը և CoP-ն տանում են ետ։ Առանց թևերի հրթիռն անկայուն է և օդում սկսում է պտտվել։"},{id:"airfoil-stall",question:"Երբ ինքնաթիռի թևի գրոհի անկյունը (Angle of Attack) գերազանցում է ~15°-ը, ի՞նչ է տեղի ունենում (Stall երևույթ)։",options:["Վերամբարձ ուժը անվերջ աճում է և ինքնաթիռը դուրս է գալիս տիեզերք","Օդի հոսքը պոկվում է թևի վերին մակերեսից (separation), վերամբարձ ուժը կտրուկ ընկնում է, իսկ դիմադրությունը՝ աճում","Օդի ջերմաստիճանը թևի վրա հասնում է 1000°C-ի և հալեցնում այն","Թևը սկսում է ինքնուրույն թափահարել թռչունի պես"],correct:1,explanation:"Ճիշտ է։ Շեղման (stall) կետում օդի հոսքը չի հասցնում շրջանցել թևի կորությունը, առաջանում են հզոր մրրիկներ, և վերամբարձ ուժը կտրուկ նվազում է։ Օդաչուները պետք է իջեցնեն քիթը՝ հոսքը վերականգնելու համար։"},{id:"quadcopter-angular-momentum",question:"Ինչու՞ են քվադրոկոպտերի 4 պտուտակներից 2-ը պտտվում ժամսլաքի (CW), իսկ 2-ը՝ հակառակ (CCW) ուղղությամբ։",options:["Իմպուլսի պտտման մոմենտների փոխադարձ չեզոքացման համար, որպեսզի դրոնի կորպուսը չպտտվի իր առանցքի շուրջ","Որպեսզի մարտկոցը ավելի քիչ տաքանա","Քամուց պաշտպանվելու համար","Զուտ գեղագիտական սիմետրիայի համար"],correct:0,explanation:"Ճիշտ է։ Յուրաքանչյուր պտտվող պտուտակ օդի դիմադրության պատճառով ստեղծում է հակադարձ ռեակտիվ մոմենտ։ Զույգերով հակառակ պտտելով՝ CW և CCW մոմենտները չեզոքացնում են միմյանց, և դրոնը մնում է ուղիղ։ Եթե ցանկանում ենք դրոնը պտտել (Yaw), մի զույգի արագությունը մեծացնում ենք մյուսի համեմատ։"},{id:"supersonic-mach-cone",question:"Ինչու՞ է գերձայնային արագությամբ ($M > 1$) թռչող ինքնաթիռի ետևում առաջանում կոնաձև հարվածային ալիք (Մախի կոն)։",options:["Ինքնաթիռի շարժիչից արտանետվող գազերն են ստեղծում այդ կոնաձև տեսքը","Ինքնաթիռը շարժվում է ձայնային ալիքներից ավելի արագ, ուստի նրա առաջացրած ակուստիկ ալիքները չեն հասցնում առաջ անցնել և կուտակվում են կոնի մակերևույթին","Օդը սառչում է և վերածվում սառցե կոնի","Ինքնաթիռի զանգվածը կրկնապատկվում է ձայնային պատնեշի մոտ"],correct:1,explanation:"Ճիշտ է։ Ձայնը տարածվում է գնդաձև ալիքներով։ Երբ $v > a$, ինքնաթիռը առաջ է անցնում իր սեփական ձայնային ալիքներից։ Բոլոր անցյալ ալիքների շոշափող եզրերը միասին ձևավորում են կոնաձև ճակատ՝ Մախի կոնը, որտեղ անկյունը որոշվում է $\\sin\\mu = 1/M$ բանաձևով։"},{id:"rotorcraft-autorotation",question:"Ինչի՞ շնորհիվ է թղթե միկրո-ուղղաթիռը կամ թխկենու սերմը պտտվելով դանդաղ իջնում գետնին։",options:["Թևերի հակառակ ծալվածքի վրա ներքևից եկող օդի հոսքը ստեղծում է պտտող մոմենտ (ավտորոտացիա)","Ներսում թաքնված փոքրիկ մարտկոցը պտտում է առանցքը","Երկրի մագնիսական դաշտը վանում է թուղթը դեպի վեր","Թուղթը տաքանում է արևից և բարձրանում օդապարիկի նման"],correct:0,explanation:"Ճիշտ է։ Իջնելիս հանդիպակաց օդի հոսքը հրում է թևերին։ Շնորհիվ հակադիր թեքության՝ առաջանում է պտտող մոմենտ։ Պտույտի շնորհիվ թևերը աշխատում են որպես պտուտակ՝ ստեղծելով վերամբարձ ուժ և ապահովելով սահուն վայրէջք։"},{id:"turbofan-bypass-ratio",question:"Ինչու՞ են ժամանակակից ուղևորատար ինքնաթիռներում օգտագործվում բարձր երկկոնտուրության (High-Bypass, BPR > 8) տուրբովենտիլյատորային շարժիչներ։",options:["Նրանք ավելի գեղեցիկ և փայլուն տեսք ունեն թևի տակ","Շրջանցման հոսքի մեծ զանգվածը ավելի ցածր արագությամբ արտանետելով՝ կտրուկ բարձրանում է պրոպուլսիվ օ.գ.գ.-ն և նվազում վառելիքի ծախսը","Որովհետև նրանց ներսում վառելիք ընդհանրապես չի այրվում","Որպեսզի ինքնաթիռը կարողանա թռչել միայն հակառակ ուղղությամբ"],correct:1,explanation:"Ճիշտ է։ Շարժիչի պրոպուլսիվ օգտակար գործողության գործակիցը $\\eta = 2 v_0 / (v_e + v_0)$ է։ Փոքր քանակությամբ գազը գերարագ արտանետելու փոխարեն, բարձր BPR ֆենը մղում է հսկայական զանգվածով սառը օդ համեմատաբար ցածր արագությամբ։ Արդյունքում ստացվում է նույն հզոր քարշուժը ($F = \\dot{m}\\Delta v$), սակայն ծախսվում է 25-30% ավելի քիչ վառելիք և շարժիչը շատ ավելի անաղմուկ է։"},{id:"bernoulli-camber-pressure",question:"Ինչի՞ հետևանքով է թռչող ինքնաթիռի թևի վերին կոր մակերեսին (camber) առաջանում ցածր ճնշման գոտի (վերամբարձ ուժ)։",options:["Վերևի օդը տաքանում է արևից և նոսրանում","Թևի կորության պատճառով վերին օդահոսքի մասնիկները արագանում են ($v_1 > v_2$), ինչը ըստ Բեռնուլիի օրենքի ($P + \\frac{1}{2}\\rho v^2 = \\text{const}$) առաջացնում է ճնշման անկում","Թևի վերևում առաջանում է բացարձակ վակուում","Երկրի մագնիսական դաշտը վանում է օդի մոլեկուլները"],correct:1,explanation:"Ճիշտ է։ Թևի վերին ուռուցիկ մակերեսով անցնելիս հոսքագծերը խտանում են, և օդի մասնիկներն արագանում են։ Համաձայն Բեռնուլիի հավասարման՝ արագության աճը հանգեցնում է ստատիկ ճնշման նվազման ($P_{\\text{վերև}} < P_{\\text{ներքև}}$)։ Ճնշումների այս տարբերությունն էլ ($Delta P$) ստեղծում է վերամբարձ ուժը ($L = \\Delta P \\cdot S$)։"},{id:"orbital-newton-cannon",question:"Ինչու՞ տիեզերակայանում (ISS, բարձրությունը 400 կմ) գտնվող տիեզերագնացները գտնվում են անկշռության վիճակում։",options:["Որովհետև 400 կմ բարձրության վրա Երկրի ձգողականության ուժը (գրավիտացիան) դառնում է զրո","Որովհետև տիեզերակայանն ու տիեզերագնացները գտնվում են Երկրի շուրջ շարունակական անվերջ ազատ անկման մեջ ($v_1 \\approx 7.7$ կմ/վ արագությամբ), իսկ գրավիտացիան այնտեղ նվազել է ընդամենը ~10%-ով ($g \\approx 8.7$ մ/վ²)","Որովհետև կայանի պատերը պաշտպանում են գրավիտացիոն դաշտից","Որովհետև այնտեղ օդի բացակայությունը վերացնում է զանգվածը"],correct:1,explanation:"Ճիշտ է։ Շատ տարածված սխալ է կարծել, թե ուղեծրում գրավիտացիա չկա։ 400 կմ բարձրության վրա Երկրի գրավիտացիոն ձգողությունը $g = 8.7$ մ/վ² է (գետնի 90%-ը)։ Անկշռությունը առաջանում է նրանից, որ կայանն անընդհատ «ընկնում է» Երկրի վրա, բայց իր հորիզոնական մեծ արագության ($v_1$) պատճառով Երկրի մակերևույթը նույն տեմպով կորանում է նրա տակ, և կայանը երբեք չի հասնում գետնին։"},{id:"helicopter-swashplate-physics",question:"Ի՞նչ տարբերություն կա ուղղաթիռի Համատարած քայլի (Collective Pitch) և Շրջափուլային քայլի (Cyclic Pitch) միջև։",options:["Համատարած քայլը փոխում է պտուտակի գույնը, իսկ շրջափուլայինը՝ երկարությունը","Համատարած քայլը (Collective) միաժամանակ փոխում է բոլոր թիակների անկյունը՝ կառավարելով վերելքն ու իջեցումը, իսկ Շրջափուլային քայլը (Cyclic) փոխում է թիակների անկյունը պտույտի փուլին համապատասխան՝ թեքելով սկավառակը առաջ/ետ/կողք","Ուղղաթիռը միայն շրջափուլային քայլ ունի, համատարածը ինքնաթիռներինն է","Համատարած քայլը պտտում է պոչը, իսկ շրջափուլայինը՝ անիվները"],correct:1,explanation:"Ճիշտ է։ Swashplate (լիցքաթիթեղ) մեխանիզմը կատարում է այս հրաշալի ֆունկցիան։ Լիցքաթիթեղը վեր-վար շարժելով՝ մեծանում է բոլոր թիակների գրոհի անկյունը (վերամբարձ ուժ $L$), իսկ այն թեքելով՝ առաջանում է ցիկլիկ անկյունային փոփոխություն, որը 90° գիրոսկոպիկ պրեցեսիայի շնորհիվ թեքում է ողջ քարշուժի վեկտորը թռիչքի ուղղությամբ։"},{id:"ion-propulsion-advantage",question:"Ինչու՞ են խոր տիեզերական միջմոլորակային առաքելություններում (NASA Dawn, BepiColombo) քիմիական հրթիռների փոխարեն օգտագործում իոնային էլեկտրական շարժիչներ։",options:["Իոնային շարժիչները կարող են Երկրի մակերևույթից տիեզերանավն արձակել ակնթարթորեն","Նրանք ունեն հսկայական տեսակարար իմպուլս ($I_{\\text{sp}} > 3000-5000$ վ) և վառելիքի նվազագույն ծախսով (մգ/վ) ամիսներ շարունակ ապահովում են մեծ $\\Delta v$","Իոնային շարժիչները էլեկտրաէներգիա չեն պահանջում","Որպեսզի տիեզերանավը լինի կապույտ գույնի"],correct:1,explanation:"Ճիշտ է։ Էլեկտրաստատիկ դաշտով արագացվող Քսենոնի իոնները արտանետվում են 30-50 կմ/վ արագությամբ ($v_e$), ինչը 10 անգամ գերազանցում է քիմիական հրթիռների արտանետման արագությանը։ Թեև քարշուժը փոքր է (միլինյուտոններ), սակայն ամիսներ շարունակ անընդհատ աշխատելով՝ այն խնայում է տոննաներով վառելիք և ապահովում ահռելի $\\Delta v$։"},{id:"ornithopter-downstroke-physics",question:"Ինչպե՞ս է թռչունի կամ օրնիտոպտերի թևի վայրէջքի հարվածը (downstroke) միաժամանակ ստեղծում և՛ վերամբարձ ուժ, և՛ առաջ մղող քարշուժ։",options:["Թևը պարզապես օդը տաքացնում է ներքևում","Առաջնային եզրը կոշտ է, իսկ հետևի եզրը աերոէլաստիկորեն ծալվում է վեր՝ թեքելով վերամբարձ ուժի վեկտորը առաջ և վեր","Թռչունը թևի վրա ունի ռեակտիվ այրիչներ","Քամին միշտ փչում է թռչունի թիկունքից"],correct:1,explanation:"Ճիշտ է։ Շնորհիվ աերոէլաստիկության (aeroelastic twist)՝ ներքև հարվածելիս թևի ճկուն հետևի եզրը օդի ճնշման տակ բարձրանում է վեր։ Արդյունքում արդյունարար աերոդինամիկ ուժի վեկտորը թեքվում է առաջ և վեր՝ առաջացնելով և՛ վերամբարձ ուժ (lift), և՛ հորիզոնական քարշուժ (propulsive thrust)։"},{id:"thermal-soaring-bank-angle",question:"Ինչու՞ սավառնորդը (glider pilot) չպետք է թերմիկի մեջ պտտվելիս չափազանց մեծ կողաթեքման անկյուն ընտրի (օր. $\\phi > 60^\\circ$)։",options:["Որովհետև ինքնաթիռի թևերը կընկնեն տաքությունից","Մեծ թեքության դեպքում ծանրաբեռնվածությունը ($n = 1/\\cos\\phi$) և ինդուկտիվ դիմադրությունը կտրուկ աճում են՝ հանգեցնելով սեփական իջեցման արագության մեծացման","Որպեսզի արևը չկուրացնի պիլոտի աչքերը","Սավառնակը կարող է պտտվել միայն հարթ առանց թեքվելու"],correct:1,explanation:"Ճիշտ է։ Շրջադարձի ժամանակ գերբեռնվածության աճի ($n = 1/\\cos\\phi$) պատճառով սավառնակի սեփական իջեցման արագությունը ($v_{\\text{sink}}$) կտրուկ մեծանում է։ Եթե $\\phi > 50-60^\\circ$, իջեցման արագությունը գերազանցում է թերմիկի վերընթաց հոսքին, և սավառնակը սկսում է բարձրանալու փոխարեն կորցնել բարձրությունը։ Օպտիմալ անկյունը սովորաբար 30°-40° է։"}],Is=[{id:"badge-rocket",icon:"🚀",title:"Հրթիռաշինարար",desc:"Արձակիր ջրային հրթիռը 30 մետրից ավելի բարձր",points:200,check:e=>(e.rocket?.apogee||0)>=30},{id:"badge-drone",icon:"🛸",title:"Աերոդինամիկայի Վարպետ",desc:"Դրոնի կատարյալ հովերինգ առանց շեղման (Yaw = 0)",points:250,check:e=>Ln({motors:e.drone?.motors||[]}).isHovering},{id:"badge-bernoulli",icon:"💨",title:"Բեռնուլիի Հետազոտող",desc:"Հասիր L/D > 8 գործակցի առանց թևի շեղման (stall)",points:250,check:e=>{const t=Rn({angleDeg:e.tunnel?.angleDeg,airSpeed:e.tunnel?.airSpeed});return!t.stall&&t.liftToDrag>=8}},{id:"badge-supersonic",icon:"⚡",title:"Գերձայնային Պիլոտ",desc:"Ճեղքիր ձայնային պատնեշը (Mach ≥ 1.2)",points:350,check:e=>(e.supersonic?.mach||0)>=1.2},{id:"badge-turbofan",icon:"✈️",title:"Ռեակտիվ Ճարտարագետ",desc:"Բարձր երկկոնտուրային շարժիչով հասիր >80% քարշուժի բաժնեմասի շրջանցման հոսքում",points:500,check:e=>Tn(e.jet||{}).bypassThrustPercent>=80},{id:"badge-orbital",icon:"🛰️",title:"Ուղեծրային Պիոներ",desc:"Արբանյակը դուրս բեր կայուն շրջանաձև LEO ուղեծիր (1-ին տիեզերական արագություն)",points:450,check:e=>Aa(e.orbit||{}).status==="circular"},{id:"badge-escape",icon:"🌌",title:"Տիեզերագնաց",desc:"Հասիր խույսի արագության (2-րդ տիեզերական արագություն, v ≥ 10.8 կմ/վ)",points:600,check:e=>{const t=Aa(e.orbit||{});return t.status==="hyperbolic"||t.status==="parabolic"}},{id:"badge-helicopter",icon:"🚁",title:"Ուղղաթիռի Աս",desc:"Ստացիր հովերինգի կատարյալ հավասարակշռություն և կառավարիր պոչային հակամոմենտը",points:400,check:e=>Bn(e.helicopter||{}).isHovering},{id:"badge-ion",icon:"⚡",title:"Իոնային Պիոներ",desc:"Իոնային շարժիչով հասիր >4000 վ տեսակարար իմպուլսի ($I_{\\text{sp}}$)",points:550,check:e=>Vn(e.ion||{}).specificImpulseSec>=4e3},{id:"badge-glider",icon:"🌬️",title:"Թերմիկ Սավառնող",desc:"Թերմիկի մեջ ստացիր դրական վերելքի արագություն ($w_{\\text{net}} > 1.5$ մ/վ)",points:400,check:e=>Fn(e.glider||{}).netClimbRate>=1.5},{id:"badge-ornithopter",icon:"🕊️",title:"Կենսաթռիչքի Վարպետ",desc:"Ուսումնասիրիր օրնիտոպտերի բիոմիմետիկ նախագիծը DIY բաժնում",points:300,check:e=>e.diySelected==="diy-ornithopter"},{id:"badge-aeroquiz",icon:"🏆",title:"Ավիացիայի Գիտնական",desc:"Պատասխանիր բոլոր հարցերին AeroQuiz-ում",points:300,check:e=>(e.quiz?.score||0)>=10}];function Pn({pitch:e=0,finCount:t=3,noseShape:a="conical",waterRemaining:s=.5,totalWater:n=.5,status:i="ready",speed:r=0,thrust:o=0,showVectors:c=!0,gravity:l=5,drag:u=0}={}){const p=e*180/Math.PI,y=i==="thrust"&&o>0,h=i==="parachute",v=i==="tumble",g=n>0?Math.max(0,Math.min(1,s/n)):0,m=Math.round(g*90);let d="";t>=3&&(d=`
      <!-- Left Fin -->
      <path d="M -18 70 L -42 110 L -18 100 Z" fill="#1cb0f6" stroke="#0e83b8" stroke-width="2" stroke-linejoin="round"/>
      <!-- Right Fin -->
      <path d="M 18 70 L 42 110 L 18 100 Z" fill="#1cb0f6" stroke="#0e83b8" stroke-width="2" stroke-linejoin="round"/>
      <!-- Center Fin -->
      <path d="M -4 70 L 0 108 L 4 70 Z" fill="#0786bf" stroke="#045a82" stroke-width="1.5"/>
    `),t===4&&(d+=`
      <!-- 4th stabilizer accents -->
      <path d="M -12 75 L -28 105 L -12 98 Z" fill="#58cc02" opacity="0.6"/>
      <path d="M 12 75 L 28 105 L 12 98 Z" fill="#58cc02" opacity="0.6"/>
    `);const f=a==="conical"?`<path d="M 0 -75 L 18 -10 L -18 -10 Z" fill="#ff4b4b" stroke="#d93038" stroke-width="2"/>
         <circle cx="0" cy="-68" r="4" fill="#ffd1d1"/>`:'<path d="M -18 -10 C -18 -55 18 -55 18 -10 Z" fill="#ff8a00" stroke="#d97000" stroke-width="2"/>';let x="";if(y){const $=35+Math.min(65,o*.4);x=`
      <g class="rocket-plume">
        <!-- Water jet spray -->
        <path d="M -10 115 Q 0 ${115+$*1.2} 10 115 Q 0 ${115+$*.4} -10 115 Z" fill="#3caaed" opacity="0.85"/>
        <path d="M -6 115 Q 0 ${115+$*.8} 6 115 Z" fill="#ffffff" opacity="0.9"/>
        <!-- Droplet particles -->
        <circle cx="-14" cy="${120+$*.6}" r="3" fill="#3caaed" opacity="0.7"/>
        <circle cx="15" cy="${125+$*.7}" r="3.5" fill="#3caaed" opacity="0.7"/>
        <circle cx="3" cy="${130+$*1.1}" r="4" fill="#69c3f5" opacity="0.8"/>
      </g>
    `}let b="";h&&(b=`
      <g transform="translate(0, -95)">
        <path d="M -65 -35 Q 0 -95 65 -35 Q 35 -40 0 -40 Q -35 -40 -65 -35 Z" fill="#ffc800" stroke="#d9a000" stroke-width="2.5"/>
        <path d="M -20 -40 Q 0 -95 20 -40 Z" fill="#ff4b4b" opacity="0.85"/>
        <!-- Shroud lines -->
        <line x1="-60" y1="-35" x2="-8" y2="15" stroke="#777e90" stroke-width="1.5" stroke-dasharray="3 2"/>
        <line x1="-25" y1="-38" x2="-4" y2="15" stroke="#777e90" stroke-width="1.5"/>
        <line x1="25" y1="-38" x2="4" y2="15" stroke="#777e90" stroke-width="1.5"/>
        <line x1="60" y1="-35" x2="8" y2="15" stroke="#777e90" stroke-width="1.5" stroke-dasharray="3 2"/>
      </g>
    `);let w="";if(c&&i!=="ready"&&i!=="landed"){if(o>5){const k=Math.min(80,o*.45);w+=`
        <g stroke="#58cc02" stroke-width="3.5" fill="#58cc02">
          <line x1="0" y1="-10" x2="0" y2="${-10-k}"/>
          <polygon points="0,${-18-k} -6,${-10-k} 6,${-10-k}"/>
          <text x="12" y="${-10-k/2}" font-size="13" font-weight="700" fill="#235600">F_քարշ (${Math.round(o)} Ն)</text>
        </g>
      `}if(u>1){const k=Math.min(65,u*3.5);w+=`
        <g stroke="#ff8a00" stroke-width="3" fill="#ff8a00">
          <line x1="0" y1="40" x2="0" y2="${40+k}"/>
          <polygon points="0,${46+k} -5,${38+k} 5,${38+k}"/>
          <text x="10" y="${40+k/2}" font-size="12" font-weight="600" fill="#a65400">F_դիմադր (${Math.round(u*10)/10} Ն)</text>
        </g>
      `}const $=Math.min(50,l*6);w+=`
      <g transform="rotate(${-p})" stroke="#ea2b2b" stroke-width="3" fill="#ea2b2b">
        <line x1="0" y1="20" x2="0" y2="${20+$}"/>
        <polygon points="0,${26+$} -5,${18+$} 5,${18+$}"/>
        <text x="10" y="${20+$/2}" font-size="12" font-weight="600" fill="#8c1d1d">F_ծ (${Math.round(l*10)/10} Ն)</text>
      </g>
    `}return`
    <g transform="rotate(${p})" class="rocket-assembly ${v?"is-tumbling":""}">
      ${b}
      ${d}

      <!-- Main transparent bottle body -->
      <rect x="-18" y="-10" width="36" height="115" rx="10" fill="#f0f7fb" stroke="#778e9b" stroke-width="2.5"/>
      <line x1="-12" y1="0" x2="-12" y2="95" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>

      <!-- Water fill rectangle inside bottle -->
      ${m>0?`<rect x="-15" y="${102-m}" width="30" height="${m}" rx="5" fill="#3caaed" opacity="0.6"/>
             <line x1="-14" y1="${102-m}" x2="14" y2="${102-m}" stroke="#65c7f8" stroke-width="2"/>`:""}

      <!-- Nozzle / bottle cap opening -->
      <rect x="-9" y="105" width="18" height="12" rx="3" fill="#465365" stroke="#2e3e50" stroke-width="1.5"/>

      <!-- Nosecone -->
      ${f}

      <!-- Center of Mass (CoM) marker -->
      <g transform="translate(0, 38)" opacity="0.75" title="Ծանրության Կենտրոն (CoM)">
        <circle r="7" fill="#ffffff" stroke="#252525" stroke-width="1.5"/>
        <path d="M 0 -7 A 7 7 0 0 1 7 0 L 0 0 Z" fill="#252525"/>
        <path d="M 0 7 A 7 7 0 0 1 -7 0 L 0 0 Z" fill="#252525"/>
      </g>

      ${x}
      ${w}
    </g>
  `}function ul({angleDeg:e=4,airSpeed:t=20,lift:a=15,drag:s=2,stall:n=!1,streamlineCount:i=7}={}){const r=n||e>15.5||e<-11,o=[],c=60,l=32;for(let y=0;y<i;y++){const h=c+y*l;let v="";if(r)h<160?v=`M 20 ${h} C 160 ${h-25}, 240 ${h+35}, 300 ${h-20} C 360 ${h+30}, 420 ${h-15}, 580 ${h+20}`:v=`M 20 ${h} C 200 ${h+15}, 380 ${h+25}, 580 ${h+35}`;else{const f=h<170?-22*Math.sin(Gt(Math.max(1,e))):16,x=h+e*1.8;v=`M 20 ${h} C 180 ${h+f}, 320 ${h+f*1.2}, 440 ${x} L 580 ${x+10}`}const g=r&&h<160?"#ea2b2b":"#3caaed",m=r&&h<160?"6 4":"none";o.push(`<path d="${v}" fill="none" stroke="${g}" stroke-width="2.5" opacity="0.65" stroke-dasharray="${m}"/>`)}const u=Math.min(90,Math.abs(a)*3),p=Math.min(75,Math.abs(s)*15);return`
    <svg viewBox="0 0 600 320" class="airfoil-wind-tunnel-svg" aria-label="Աերոդինամիկ խողովակ և թևի պրոֆիլ">
      <defs>
        <linearGradient id="tunnel-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f5fafd"/>
          <stop offset="100%" stop-color="#eaf3f8"/>
        </linearGradient>
        <linearGradient id="wing-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#566376"/>
          <stop offset="50%" stop-color="#343f52"/>
          <stop offset="100%" stop-color="#232c3c"/>
        </linearGradient>
      </defs>

      <!-- Wind tunnel bounds -->
      <rect x="15" y="15" width="570" height="290" rx="14" fill="url(#tunnel-bg)" stroke="#cde0eb" stroke-width="2"/>
      <line x1="15" y1="15" x2="585" y2="15" stroke="#0875b0" stroke-width="4"/>
      <line x1="15" y1="305" x2="585" y2="305" stroke="#0875b0" stroke-width="4"/>

      <!-- Airflow streamlines -->
      <g class="streamlines-group">
        ${o.join("")}
      </g>

      <!-- NACA Airfoil Profile placed at (280, 160) -->
      <g transform="translate(280, 160) rotate(${-e})">
        <!-- Airfoil shape (curved upper camber, flatter bottom) -->
        <path d="M -110 0 C -90 -28, 20 -38, 120 0 C 60 12, -70 14, -110 0 Z" fill="url(#wing-grad)" stroke="#1a222d" stroke-width="2.5"/>
        <line x1="-120" y1="0" x2="135" y2="0" stroke="#ffc800" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6"/>
        <circle cx="0" cy="0" r="5" fill="#58cc02"/>
      </g>

      <!-- Vector Overlay at wing center (280, 160) -->
      <g transform="translate(280, 160)">
        <!-- Lift vector (green, vertical upward) -->
        ${u>5?`<g stroke="#58cc02" stroke-width="3.5" fill="#58cc02">
                 <line x1="0" y1="0" x2="0" y2="${-u}"/>
                 <polygon points="0,${-u-8} -6,${-u} 6,${-u}"/>
                 <text x="12" y="${-u/2}" font-size="13" font-weight="700" fill="#235600">Վերամբարձ ուժ L (${a} Ն)</text>
               </g>`:""}
        <!-- Drag vector (orange, horizontal right) -->
        ${p>4?`<g stroke="#ff8a00" stroke-width="3" fill="#ff8a00">
                 <line x1="0" y1="0" x2="${p}" y2="0"/>
                 <polygon points="${p+8},0 ${p},-6 ${p},6"/>
                 <text x="${p/2}" y="22" font-size="12" font-weight="600" fill="#a65400">Դիմադրություն D (${s} Ն)</text>
               </g>`:""}
      </g>

      <!-- Bernoulli Pressure Differential Labels -->
      ${r?"":`
        <!-- Upper Suction Zone (P1 < P2) -->
        <g transform="translate(270, 115)">
          <rect x="-70" y="-13" width="140" height="24" rx="6" fill="#0284c7" fill-opacity="0.12" stroke="#0284c7" stroke-width="1.2"/>
          <text x="0" y="3" font-size="11" font-weight="700" fill="#0369a1" text-anchor="middle">ՑԱԾՐ ՃՆՇՈՒՄ P₁ (v₁ > v₂)</text>
        </g>
        <!-- Lower Pressure Zone (P2 > P1) -->
        <g transform="translate(270, 215)">
          <rect x="-70" y="-13" width="140" height="24" rx="6" fill="#ea580c" fill-opacity="0.12" stroke="#ea580c" stroke-width="1.2"/>
          <text x="0" y="3" font-size="11" font-weight="700" fill="#c2410c" text-anchor="middle">ԲԱՐՁՐ ՃՆՇՈՒՄ P₂ (v₂ < v₁)</text>
        </g>
        <!-- Bernoulli Equation Formula Box -->
        <g transform="translate(35, 260)">
          <rect width="210" height="30" rx="8" fill="#ffffff" fill-opacity="0.9" stroke="#94a3b8" stroke-width="1"/>
          <text x="10" y="20" font-size="11" font-weight="700" fill="#334155">Բեռնուլի՝ P + ½ρv² = const</text>
        </g>
        `}

      <!-- Angle of attack indicator badge -->
      <g transform="translate(40, 48)">
        <rect width="165" height="36" rx="8" fill="#ffffff" stroke="#cde0eb" stroke-width="1.5"/>
        <text x="12" y="23" font-size="13" font-weight="600" fill="#252525">Գրոհի անկյուն՝ <strong>${e}°</strong></text>
      </g>

      <!-- Stall Warning Badge -->
      ${r?`<g transform="translate(380, 48)" class="stall-warning-badge">
               <rect width="180" height="36" rx="8" fill="#fff0ef" stroke="#ea2b2b" stroke-width="2"/>
               <text x="14" y="23" font-size="13" font-weight="700" fill="#b81b1b">⚠️ ՇԵՂՈՒՄ (STALL)</text>
             </g>`:`<g transform="translate(410, 48)">
               <rect width="150" height="36" rx="8" fill="#eff9eb" stroke="#58cc02" stroke-width="1.5"/>
               <text x="12" y="23" font-size="13" font-weight="600" fill="#235600">✓ Կայուն հոսք</text>
             </g>`}
    </svg>
  `}function hl({motors:e=[100,100,100,100],thrusts:t=[1.96,1.96,1.96,1.96],totalThrust:a=7.85,weight:s=7.85,pitchDeg:n=0,rollDeg:i=0,yawTorque:r=0,showVectors:o=!0}={}){const[c,l,u,p]=e,[y,h,v,g]=t,m=Math.abs(r)<.001,d=Math.abs(a-s)<.2&&m&&Math.abs(n)<.5&&Math.abs(i)<.5,f=14,x=Math.min(65,y*f),b=Math.min(65,h*f),w=Math.min(65,v*f),$=Math.min(65,g*f),k=Math.min(80,a*4.5),M=Math.min(80,s*4.5);return`
    <svg viewBox="0 0 600 360" class="drone-simulator-svg" aria-label="Քվադրոկոպտերի դինամիկա և հավասարակշռում">
      <defs>
        <radialGradient id="drone-grid-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f8fcff"/>
          <stop offset="100%" stop-color="#eaf3f9"/>
        </radialGradient>
        <filter id="rotor-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5"/>
        </filter>
      </defs>

      <!-- Background Grid Plane -->
      <rect width="600" height="360" fill="url(#drone-grid-bg)"/>
      <g stroke="#d6e7f2" stroke-width="1" opacity="0.6">
        <line x1="50" y1="180" x2="550" y2="180" stroke-dasharray="4 4"/>
        <line x1="300" y1="30" x2="300" y2="330" stroke-dasharray="4 4"/>
        <ellipse cx="300" cy="180" rx="140" ry="110" fill="none"/>
        <ellipse cx="300" cy="180" rx="220" ry="150" fill="none"/>
      </g>

      <!-- Drone Body transformed by Roll and Pitch tilt -->
      <g transform="translate(300, 180) rotate(${i}) scale(${1-Math.abs(n)*.004})">
        <!-- Structural Arms (Crossed) -->
        <line x1="0" y1="-100" x2="0" y2="100" stroke="#252525" stroke-width="9" stroke-linecap="round"/>
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#252525" stroke-width="9" stroke-linecap="round"/>
        <line x1="0" y1="-100" x2="0" y2="100" stroke="#777777" stroke-width="3" stroke-linecap="round"/>
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#777777" stroke-width="3" stroke-linecap="round"/>

        <!-- Motor 1: Front (0, -100) CW -->
        <g transform="translate(0, -100)">
          <!-- Blurred spinning rotor disk -->
          <ellipse cx="0" cy="0" rx="42" ry="24" fill="#00b4d8" opacity="${.25+c/200*.4}" filter="url(#rotor-blur)"/>
          <ellipse cx="0" cy="0" rx="40" ry="22" fill="none" stroke="#0096c7" stroke-width="2" stroke-dasharray="6 3"/>
          <circle cx="0" cy="0" r="10" fill="#333333" stroke="#1cb0f6" stroke-width="2"/>
          <!-- CW rotation arrow badge -->
          <text x="0" y="34" font-size="11" font-weight="700" text-anchor="middle" fill="#0077b6">M1 (CW ↻)</text>
          ${o&&x>4?`<g stroke="#58cc02" stroke-width="3" fill="#58cc02">
                   <line x1="0" y1="0" x2="0" y2="${-x}"/>
                   <polygon points="0,${-x-6} -4,${-x} 4,${-x}"/>
                   <text x="8" y="${-x/2}" font-size="11" font-weight="700" fill="#2b6b00">${y}Ն</text>
                 </g>`:""}
        </g>

        <!-- Motor 2: Right (120, 0) CCW -->
        <g transform="translate(120, 0)">
          <ellipse cx="0" cy="0" rx="26" ry="38" fill="#ff9f1c" opacity="${.25+l/200*.4}" filter="url(#rotor-blur)"/>
          <ellipse cx="0" cy="0" rx="24" ry="36" fill="none" stroke="#f77f00" stroke-width="2" stroke-dasharray="6 3"/>
          <circle cx="0" cy="0" r="10" fill="#333333" stroke="#ff9f1c" stroke-width="2"/>
          <text x="0" y="44" font-size="11" font-weight="700" text-anchor="middle" fill="#d97000">M2 (CCW ↺)</text>
          ${o&&b>4?`<g stroke="#58cc02" stroke-width="3" fill="#58cc02">
                   <line x1="0" y1="0" x2="0" y2="${-b}"/>
                   <polygon points="0,${-b-6} -4,${-b} 4,${-b}"/>
                   <text x="8" y="${-b/2}" font-size="11" font-weight="700" fill="#2b6b00">${h}Ն</text>
                 </g>`:""}
        </g>

        <!-- Motor 3: Rear (0, 100) CW -->
        <g transform="translate(0, 100)">
          <ellipse cx="0" cy="0" rx="42" ry="24" fill="#00b4d8" opacity="${.25+u/200*.4}" filter="url(#rotor-blur)"/>
          <ellipse cx="0" cy="0" rx="40" ry="22" fill="none" stroke="#0096c7" stroke-width="2" stroke-dasharray="6 3"/>
          <circle cx="0" cy="0" r="10" fill="#333333" stroke="#1cb0f6" stroke-width="2"/>
          <text x="0" y="34" font-size="11" font-weight="700" text-anchor="middle" fill="#0077b6">M3 (CW ↻)</text>
          ${o&&w>4?`<g stroke="#58cc02" stroke-width="3" fill="#58cc02">
                   <line x1="0" y1="0" x2="0" y2="${-w}"/>
                   <polygon points="0,${-w-6} -4,${-w} 4,${-w}"/>
                   <text x="8" y="${-w/2}" font-size="11" font-weight="700" fill="#2b6b00">${v}Ն</text>
                 </g>`:""}
        </g>

        <!-- Motor 4: Left (-120, 0) CCW -->
        <g transform="translate(-120, 0)">
          <ellipse cx="0" cy="0" rx="26" ry="38" fill="#ff9f1c" opacity="${.25+p/200*.4}" filter="url(#rotor-blur)"/>
          <ellipse cx="0" cy="0" rx="24" ry="36" fill="none" stroke="#f77f00" stroke-width="2" stroke-dasharray="6 3"/>
          <circle cx="0" cy="0" r="10" fill="#333333" stroke="#ff9f1c" stroke-width="2"/>
          <text x="0" y="44" font-size="11" font-weight="700" text-anchor="middle" fill="#d97000">M4 (CCW ↺)</text>
          ${o&&$>4?`<g stroke="#58cc02" stroke-width="3" fill="#58cc02">
                   <line x1="0" y1="0" x2="0" y2="${-$}"/>
                   <polygon points="0,${-$-6} -4,${-$} 4,${-$}"/>
                   <text x="8" y="${-$/2}" font-size="11" font-weight="700" fill="#2b6b00">${g}Ն</text>
                 </g>`:""}
        </g>

        <!-- Central Fuselage / Controller Module -->
        <rect x="-26" y="-32" width="52" height="64" rx="14" fill="#1e232a" stroke="#3d4450" stroke-width="2.5"/>
        <rect x="-16" y="-22" width="32" height="30" rx="6" fill="#1cb0f6"/>
        <circle cx="0" cy="18" r="4.5" fill="${d?"#58cc02":"#ff9f1c"}"/>
        <!-- Front Heading Triangle -->
        <polygon points="0,-36 -8,-24 8,-24" fill="#ff4b4b"/>
      </g>

      <!-- Center Dynamic Force Balance Vectors (Total Lift vs Weight) -->
      ${o?`<g transform="translate(300, 180)">
               <!-- Net Lift Vector (Vertical Up) -->
               <g stroke="#1cb0f6" stroke-width="4" fill="#1cb0f6">
                 <line x1="0" y1="0" x2="0" y2="${-k}"/>
                 <polygon points="0,${-k-8} -5,${-k} 5,${-k}"/>
                 <text x="12" y="${-k/2}" font-size="12" font-weight="700" fill="#0369a1">Ընդհանուր քարշուժ՝ ${a} Ն</text>
               </g>
               <!-- Weight Vector (Vertical Down) -->
               <g stroke="#ea2b2b" stroke-width="4" fill="#ea2b2b">
                 <line x1="0" y1="0" x2="0" y2="${M}"/>
                 <polygon points="0,${M+8} -5,${M} 5,${M}"/>
                 <text x="12" y="${M/2}" font-size="12" font-weight="700" fill="#b91c1c">Ծանրություն (W)՝ ${s} Ն</text>
               </g>
             </g>`:""}

      <!-- Status Indicator Pill -->
      <g transform="translate(30, 30)">
        <rect width="180" height="38" rx="10" fill="#ffffff" stroke="#cde0eb" stroke-width="1.5"/>
        <circle cx="20" cy="19" r="6" fill="${d?"#58cc02":m?"#1cb0f6":"#ea2b2b"}"/>
        <text x="36" y="24" font-size="13" font-weight="700" fill="#252525">
          ${d?"ՀՈՎԵՐԻՆԳ (Կայուն)":m?"ԹՌԻՉՔ (Հավասարակշռված)":"ՊՏՏՈՒՄ Է (Անհավասար)"}
        </text>
      </g>

      <!-- Yaw Torque Gauge (Top Right) -->
      <g transform="translate(420, 30)">
        <rect width="150" height="38" rx="10" fill="#ffffff" stroke="#cde0eb" stroke-width="1.5"/>
        <text x="14" y="24" font-size="12" font-weight="600" fill="#4b5563">
          Պտտող մոմենտ՝ <tspan font-weight="700" fill="${m?"#166534":"#b91c1c"}">${r.toFixed(3)} Ն·մ</tspan>
        </text>
      </g>
    </svg>
  `}function fl({mach:e=1,machAngleDeg:t=null,airspeedKmh:a=1225,pressureRatio:s=1,time:n=0}={}){const i=Math.abs(e-1)<.04,r=e>=1,o=400,c=170,l=8,u=32,p=[];for(let v=1;v<=l;v++){const g=o-v*u,m=v*u/e;if(m>5&&m<380){const d=Math.max(.12,.7-v/l*.55),f=r?"#00b4d8":"#38bdf8";p.push(`<circle cx="${g}" cy="${c}" r="${m}" fill="none" stroke="${f}" stroke-width="${i&&v<=2?"3.5":"1.8"}" opacity="${d}"/>`)}}let y="";if(r&&t!==null){const v=t*Math.PI/180,g=320,m=o-g*Math.cos(v),d=c-g*Math.sin(v),f=o-g*Math.cos(v),x=c+g*Math.sin(v);y=`
      <!-- Glowing Mach Shockwave Cone -->
      <polygon points="${o},${c} ${m},${d} ${m-40},${d} ${f-40},${x} ${f},${x}" fill="#38bdf8" opacity="0.12"/>
      <line x1="${o}" y1="${c}" x2="${m}" y2="${d}" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="${o}" y1="${c}" x2="${f}" y2="${x}" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Angle Arc -->
      <path d="M ${o-50} ${c} A 50 50 0 0 0 ${o-50*Math.cos(v)} ${c-50*Math.sin(v)}" fill="none" stroke="#e11d48" stroke-width="2.5"/>
      <text x="${o-82}" y="${c-14}" font-size="13" font-weight="700" fill="#be123c">μ = ${t}°</text>
    `}let h="";return i&&(h=`
      <line x1="${o}" y1="40" x2="${o}" y2="300" stroke="#f59e0b" stroke-width="4" stroke-dasharray="8 4"/>
      <text x="${o-140}" y="70" font-size="13" font-weight="800" fill="#b45309">⚡ ՁԱՅՆԱՅԻՆ ՊԱՏՆԵՇ (M=1.0)</text>
    `),`
    <svg viewBox="0 0 600 340" class="supersonic-simulator-svg" aria-label="Գերձայնային թռիչք և Մախի հարվածային կոն">
      <defs>
        <linearGradient id="sky-supersonic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>

      <!-- Night / High Altitude Stratosphere Sky -->
      <rect width="600" height="340" fill="url(#sky-supersonic)"/>

      <!-- Flight Path Centerline -->
      <line x1="20" y1="${c}" x2="580" y2="${c}" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 6"/>

      <!-- Expanding Acoustic Wavefronts -->
      <g>
        ${p.join("")}
      </g>

      <!-- Mach Shockwave Cone Envelope -->
      ${y}
      ${h}

      <!-- Jet Aircraft Vector Graphic (Nose at noseX, noseY) -->
      <g transform="translate(${o-110}, ${c-18})">
        <!-- Exhaust Fire -->
        <polygon points="-25,18 -8,13 -8,23" fill="#f97316"/>
        <polygon points="-16,18 -8,15 -8,21" fill="#fef08a"/>
        <!-- Delta Wing -->
        <polygon points="20,18 -5,-8 15,18" fill="#475569" stroke="#94a3b8" stroke-width="1.5"/>
        <polygon points="20,18 -5,44 15,18" fill="#475569" stroke="#94a3b8" stroke-width="1.5"/>
        <!-- Fuselage -->
        <path d="M 0 14 L 85 17 Q 110 18 85 19 L 0 22 Z" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5"/>
        <!-- Cockpit Canopy -->
        <ellipse cx="60" cy="18" rx="14" ry="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
        <!-- Vertical Stabilizer Fin -->
        <polygon points="5,18 -15,0 0,18" fill="#ef4444"/>
      </g>

      <!-- Telemetry Info Card (Top Left) -->
      <g transform="translate(30, 24)">
        <rect width="210" height="74" rx="12" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-width="1.5"/>
        <text x="14" y="24" font-size="14" font-weight="700" fill="#38bdf8">Արագություն՝ ${e} M</text>
        <text x="14" y="44" font-size="12" font-weight="600" fill="#94a3b8">Իրական՝ ~${a} կմ/ժ (${(a/3.6).toFixed(0)} մ/վ)</text>
        <text x="14" y="62" font-size="12" font-weight="600" fill="${r?"#34d399":"#fbbf24"}">
          ${r?`Մախի անկյուն՝ μ = ${t}°`:"Ենթաձայնային (ալիքները առաջ են)"}
        </text>
      </g>

      <!-- Shockwave Pressure Jump Card (Top Right) -->
      ${r?`<g transform="translate(420, 24)">
               <rect width="150" height="42" rx="10" fill="#0f172a" fill-opacity="0.85" stroke="#0284c7" stroke-width="1.5"/>
               <text x="12" y="26" font-size="12" font-weight="700" fill="#e0f2fe">Ճնշման թռիչք՝ P₂/P₁ = ${s}x</text>
             </g>`:""}
    </svg>
  `}function ml({throttle:e=75,bypassRatio:t=8.5,thrustKn:a=120,thrustBypassKn:s=98,thrustCoreKn:n=22,bypassThrustPercent:i=81.7,titC:r=1100,fanRpmPct:o=81,coreRpmPct:c=84,showVectors:l=!0}={}){const u=.3+.7*(e/100),p=20+32*(e/100),y=30+65*(e/100),h=Math.min(80,s/150*80),v=Math.min(65,n/60*65);return`
    <svg viewBox="0 0 680 340" class="turbofan-simulator-svg" aria-label="Երկկոնտուր տուրբոօդափոխիչային շարժիչի կտրվածք">
      <defs>
        <linearGradient id="cowl-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="50%" stop-color="#94a3b8"/>
          <stop offset="100%" stop-color="#64748b"/>
        </linearGradient>
        <linearGradient id="core-casing" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#475569"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
        <linearGradient id="bypass-air" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.4"/>
        </linearGradient>
        <linearGradient id="combustor-flame" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f97316"/>
          <stop offset="40%" stop-color="#eab308"/>
          <stop offset="80%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </linearGradient>
        <linearGradient id="exhaust-plume" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#f97316" stop-opacity="0.8"/>
          <stop offset="60%" stop-color="#fbbf24" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <!-- Background chamber tint -->
      <rect x="10" y="10" width="660" height="320" rx="14" fill="#0b1324"/>

      <!-- Centerline axis of symmetry -->
      <line x1="30" y1="170" x2="650" y2="170" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 5"/>

      <!-- 1. Cold Bypass Flow Streams (Top & Bottom) -->
      <path d="M 120 45 L 360 45 L 360 85 L 150 95 Z" fill="url(#bypass-air)"/>
      <path d="M 120 295 L 360 295 L 360 255 L 150 245 Z" fill="url(#bypass-air)"/>
      
      <!-- Flow stream arrows in bypass duct -->
      <g stroke="#38bdf8" stroke-width="2" stroke-linecap="round" opacity="0.75">
        <line x1="160" y1="65" x2="330" y2="65" stroke-dasharray="8 6"/>
        <line x1="160" y1="275" x2="330" y2="275" stroke-dasharray="8 6"/>
      </g>

      <!-- 2. Outer Nacelle / Cowling (Upper & Lower) -->
      <path d="M 60 70 C 50 40, 100 30, 200 30 L 370 35 L 360 55 L 140 55 C 80 55, 70 65, 60 70 Z" fill="url(#cowl-grad)" stroke="#475569" stroke-width="2"/>
      <path d="M 60 270 C 50 300, 100 310, 200 310 L 370 305 L 360 285 L 140 285 C 80 285, 70 275, 60 270 Z" fill="url(#cowl-grad)" stroke="#475569" stroke-width="2"/>

      <!-- 3. Engine Core Cowling / Center Body -->
      <path d="M 140 100 L 320 90 L 460 115 L 490 145 L 490 195 L 460 225 L 320 250 L 140 240 Z" fill="url(#core-casing)" stroke="#64748b" stroke-width="2"/>

      <!-- 4. Concentric Shafts (Spools) along Centerline -->
      <!-- Outer HP Spool N2 (Bronze/gold hollow shaft connecting HPC & HPT) -->
      <rect x="235" y="165" width="165" height="10" rx="2" fill="#d97706" stroke="#b45309" stroke-width="1.5"/>
      <!-- Inner LP Spool N1 (Silver/steel shaft connecting Fan/LPC & LPT) -->
      <rect x="110" y="167.5" width="345" height="5" rx="1.5" fill="#94a3b8" stroke="#475569" stroke-width="1"/>

      <!-- 5. Front Spinner Nosecone -->
      <path d="M 60 170 C 60 140, 115 155, 125 170 C 115 185, 60 200, 60 170 Z" fill="#1e293b" stroke="#64748b" stroke-width="2"/>
      <circle cx="85" cy="170" r="3" fill="#38bdf8"/>

      <!-- 6. Intake Fan (Large Titanium Blades) -->
      <g stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round">
        <line x1="120" y1="52" x2="128" y2="160"/>
        <line x1="120" y1="288" x2="128" y2="180"/>
        <line x1="115" y1="75" x2="125" y2="155"/>
        <line x1="115" y1="265" x2="125" y2="185"/>
      </g>
      <rect x="118" y="152" width="16" height="36" rx="4" fill="#64748b"/>

      <!-- 7. Low Pressure Compressor (LPC / Booster - 3 stages on N1) -->
      <g stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round">
        <line x1="150" y1="110" x2="152" y2="160"/>
        <line x1="150" y1="230" x2="152" y2="180"/>
        <line x1="165" y1="115" x2="167" y2="160"/>
        <line x1="165" y1="225" x2="167" y2="180"/>
        <line x1="180" y1="120" x2="182" y2="160"/>
        <line x1="180" y1="220" x2="182" y2="180"/>
      </g>

      <!-- 8. High Pressure Compressor (HPC - 5 stages on N2) -->
      <g stroke="#cbd5e1" stroke-width="2" stroke-linecap="round">
        <line x1="210" y1="125" x2="211" y2="160"/>
        <line x1="210" y1="215" x2="211" y2="180"/>
        <line x1="225" y1="128" x2="226" y2="160"/>
        <line x1="225" y1="212" x2="226" y2="180"/>
        <line x1="240" y1="131" x2="241" y2="160"/>
        <line x1="240" y1="209" x2="241" y2="180"/>
        <line x1="255" y1="134" x2="256" y2="160"/>
        <line x1="255" y1="206" x2="256" y2="180"/>
        <line x1="270" y1="137" x2="271" y2="160"/>
        <line x1="270" y1="203" x2="271" y2="180"/>
      </g>

      <!-- 9. Annular Combustion Chamber (Combustor & Fuel Injectors) -->
      <rect x="290" y="125" width="55" height="25" rx="5" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
      <rect x="295" y="129" width="${p}" height="17" rx="3" fill="url(#combustor-flame)" opacity="${u}"/>
      <rect x="290" y="190" width="55" height="25" rx="5" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
      <rect x="295" y="194" width="${p}" height="17" rx="3" fill="url(#combustor-flame)" opacity="${u}"/>
      
      <line x1="285" y1="137" x2="295" y2="137" stroke="#ef4444" stroke-width="3"/>
      <line x1="285" y1="202" x2="295" y2="202" stroke="#ef4444" stroke-width="3"/>

      <!-- 10. High Pressure Turbine (HPT on N2) -->
      <g stroke="#f97316" stroke-width="3" stroke-linecap="round">
        <line x1="365" y1="125" x2="366" y2="160"/>
        <line x1="365" y1="215" x2="366" y2="180"/>
      </g>

      <!-- 11. Low Pressure Turbine (LPT on N1) -->
      <g stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round">
        <line x1="390" y1="120" x2="391" y2="160"/>
        <line x1="390" y1="220" x2="391" y2="180"/>
        <line x1="410" y1="115" x2="411" y2="160"/>
        <line x1="410" y1="225" x2="411" y2="180"/>
        <line x1="430" y1="110" x2="431" y2="160"/>
        <line x1="430" y1="230" x2="431" y2="180"/>
      </g>

      <!-- 12. Exhaust Cone & Core Jet Nozzle Plume -->
      <polygon points="490,150 490,190 ${490+y},170" fill="url(#exhaust-plume)"/>
      <path d="M 455 160 L 515 170 L 455 180 Z" fill="#334155"/>

      <!-- Bypass Exhaust stream plumes (Top & Bottom exits) -->
      <polygon points="360,50 360,70 ${360+h*1.5},60" fill="#38bdf8" opacity="0.3"/>
      <polygon points="360,270 360,290 ${360+h*1.5},280" fill="#38bdf8" opacity="0.3"/>

      <!-- 13. Component Labels / Callouts -->
      <g font-size="11" font-weight="700">
        <text x="95" y="24" fill="#38bdf8">Ֆեն (Fan N₁)</text>
        <line x1="120" y1="27" x2="120" y2="48" stroke="#38bdf8" stroke-width="1.5"/>
        <text x="210" y="22" fill="#7dd3fc">Շրջանցիկ Կոնտուր (Bypass ${t}:1)</text>
        <text x="280" y="115" fill="#f97316">Այրման Խցիկ (${r}°C)</text>
        <text x="380" y="102" fill="#cbd5e1">Տուրբիններ (HPT/LPT)</text>
      </g>

      <!-- 14. Live Force Vectors Overlay -->
      ${l?`
        <!-- Bypass Thrust Vector (Top) -->
        <g stroke="#38bdf8" stroke-width="3" fill="#38bdf8">
          <line x1="375" y1="60" x2="${375+h}" y2="60"/>
          <polygon points="${375+h+8},60 ${375+h},55 ${375+h},65"/>
          <text x="${390+h}" y="64" font-size="11" font-weight="700" fill="#7dd3fc">F_շրջ (${s} կՆ)</text>
        </g>
        <!-- Bypass Thrust Vector (Bottom) -->
        <g stroke="#38bdf8" stroke-width="3" fill="#38bdf8">
          <line x1="375" y1="280" x2="${375+h}" y2="280"/>
          <polygon points="${375+h+8},280 ${375+h},275 ${375+h},285"/>
          <text x="${390+h}" y="284" font-size="11" font-weight="700" fill="#7dd3fc">F_շրջ (${s} կՆ)</text>
        </g>
        <!-- Core Jet Thrust Vector (Center) -->
        <g stroke="#f97316" stroke-width="3" fill="#f97316">
          <line x1="520" y1="170" x2="${520+v}" y2="170"/>
          <polygon points="${520+v+8},170 ${520+v},165 ${520+v},175"/>
          <text x="${535+v}" y="174" font-size="11" font-weight="700" fill="#fb923c">F_կորիզ (${n} կՆ)</text>
        </g>
        `:""}

      <!-- Bottom Status Pill -->
      <g transform="translate(25, 290)">
        <rect width="250" height="34" rx="8" fill="#0f172a" fill-opacity="0.9" stroke="#334155" stroke-width="1.5"/>
        <text x="12" y="21" font-size="12" font-weight="700" fill="#22c55e">
          ✓ Շրջանցման Բաժին՝ ${i}%
        </text>
        <text x="175" y="21" font-size="11" font-weight="600" fill="#94a3b8">
          N₁: ${o}% | N₂: ${c}%
        </text>
      </g>
    </svg>
  `}function gl({launchAltitudeKm:e=400,horizontalVelocityKms:t=7.67,orbitModel:a,showVectors:s=!0}={}){const n=a||{},i=n.status||"circular",r=t||7.67,o=n.v1Kms||7.67,c=n.vEscKms||10.85,l=105,u=l/6371,p=l+Math.min(1800,e)*u,y=300,h=250;let v="";if(n.trajectoryPoints&&n.trajectoryPoints.length>1){const k=n.trajectoryPoints.map((M,q)=>{const I=y+M.x*u,L=h+M.y*u;return`${q===0?"M":"L"} ${I.toFixed(1)} ${L.toFixed(1)}`});n.isStableOrbit&&i!=="hyperbolic"&&i!=="parabolic"&&k.push("Z"),v=k.join(" ")}else v=`M ${y} ${h-p} A ${p} ${p} 0 1 0 ${y} ${h+p} A ${p} ${p} 0 1 0 ${y} ${h-p} Z`;let g="#22c55e",m="#14532d",d="#86efac",f="✓ Կայուն Շրջանաձև Ուղեծիր (1-ին տիեզերական)";i==="suborbital_crash"?(g="#ef4444",m="#7f1d1d",d="#fca5a5",f="⚠️ Ենթաուղեծրային Բալիստիկ Անկում (v < v₁)"):i==="elliptic"?(g="#f59e0b",m="#78350f",d="#fde68a",f="⬭ Էլիպսաձև Կեպլերյան Ուղեծիր (Կայուն)"):(i==="parabolic"||i==="hyperbolic")&&(g="#c084fc",m="#581c87",d="#e9d5ff",f="🌌 Խույսի Հետագիծ (2-րդ տիեզերական / Հեռացում)");const x=Math.min(90,Math.max(25,r*6.5)),b=Math.min(55,Math.max(20,(n.gravityAtAlt||8.7)*4.5)),w=y,$=h-p;return`
    <svg viewBox="0 0 600 440" class="orbit-simulator-svg" aria-label="Նյուտոնի ուղեծրային թնդանոթ և Երկիր">
      <defs>
        <!-- Deep Space Canvas Gradient -->
        <radialGradient id="space-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#0a1122"/>
          <stop offset="100%" stop-color="#040711"/>
        </radialGradient>
        <!-- Earth Radial Ocean Gradient -->
        <radialGradient id="earth-ocean" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#1d4ed8"/>
          <stop offset="50%" stop-color="#1e3a8a"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </radialGradient>
        <!-- Atmosphere Glow Filter -->
        <filter id="atmo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6"/>
        </filter>
        <filter id="orbit-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
        </filter>
      </defs>

      <!-- Space Background -->
      <rect width="600" height="440" rx="14" fill="url(#space-bg)"/>

      <!-- Distant Stars -->
      <g fill="#ffffff" opacity="0.35">
        <circle cx="45" cy="40" r="1"/>
        <circle cx="120" cy="85" r="1.5"/>
        <circle cx="210" cy="35" r="1"/>
        <circle cx="510" cy="65" r="1.5"/>
        <circle cx="560" cy="140" r="1"/>
        <circle cx="80" cy="380" r="1"/>
        <circle cx="530" cy="390" r="1.5"/>
        <circle cx="480" cy="320" r="1"/>
        <circle cx="35" cy="220" r="1.2"/>
        <circle cx="560" cy="270" r="1"/>
      </g>

      <!-- Circular LEO Reference Ring (Subtle Dashed) -->
      <circle cx="${y}" cy="${h}" r="${l+400*u}" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="4 4" opacity="0.3"/>

      <!-- Atmospheric Haze Ring (Kármán line 100km) -->
      <circle cx="${y}" cy="${h}" r="${l+100*u}" fill="none" stroke="#38bdf8" stroke-width="3" opacity="0.5" filter="url(#atmo-glow)"/>

      <!-- Actual Orbital Trajectory Path (Glow underlayer + Crisp curve) -->
      ${v?`
        <path d="${v}" fill="none" stroke="${g}" stroke-width="6" opacity="0.4" filter="url(#orbit-glow-filter)"/>
        <path d="${v}" fill="none" stroke="${g}" stroke-width="2.5" stroke-dasharray="${i==="circular"?"none":"6 3"}"/>
      `:""}

      <!-- Earth Globe -->
      <g id="earth-globe">
        <!-- Ocean Base -->
        <circle cx="${y}" cy="${h}" r="${l}" fill="url(#earth-ocean)" stroke="#60a5fa" stroke-width="1.5"/>
        
        <!-- Continents (Curved stylized landmasses) -->
        <path d="M ${y-60} ${h-40} C ${y-30} ${h-70}, ${y+20} ${h-60}, ${y+40} ${h-30} C ${y+50} ${h}, ${y+10} ${h+30}, ${y-20} ${h+15} C ${y-50} ${h+10}, ${y-70} ${h-10}, ${y-60} ${h-40} Z" fill="#15803d" opacity="0.85"/>
        <path d="M ${y+10} ${h+25} C ${y+35} ${h+15}, ${y+65} ${h+35}, ${y+55} ${h+75} C ${y+35} ${h+85}, ${y+15} ${h+60}, ${y+10} ${h+25} Z" fill="#166534" opacity="0.85"/>
        <path d="M ${y-75} ${h+10} C ${y-45} ${h+20}, ${y-35} ${h+60}, ${y-60} ${h+70} C ${y-80} ${h+60}, ${y-85} ${h+30}, ${y-75} ${h+10} Z" fill="#15803d" opacity="0.8"/>
        
        <!-- Polar Ice Caps -->
        <ellipse cx="${y}" cy="${h-l+6}" rx="32" ry="8" fill="#f8fafc" opacity="0.9"/>
        <ellipse cx="${y}" cy="${h+l-6}" rx="28" ry="7" fill="#f8fafc" opacity="0.9"/>

        <!-- Earth Radius Label -->
        <line x1="${y}" y1="${h}" x2="${y+l}" y2="${h}" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="3 3"/>
        <text x="${y+35}" y="${h-6}" font-size="10" font-weight="700" fill="#93c5fd">R_E = 6,371 կմ</text>
        <circle cx="${y}" cy="${h}" r="3.5" fill="#38bdf8"/>
      </g>

      <!-- Launch Mountain / Orbital Station Tower -->
      <g id="launch-tower">
        <polygon points="${y-7},${h-l} ${y+7},${h-l} ${y},${$}" fill="#64748b" stroke="#334155" stroke-width="1.2"/>
        <rect x="${y-4}" y="${$-3}" width="8" height="6" rx="2" fill="#38bdf8"/>
        <!-- Tower Height Indicator -->
        <text x="${y-14}" y="${(h-l+$)/2+3}" font-size="9" font-weight="700" fill="#cbd5e1" text-anchor="end">h = ${e} կմ</text>
      </g>

      <!-- Satellite at Orbital Launch Point (satX, satY) -->
      <g transform="translate(${w}, ${$})">
        <!-- Satellite Main Bus -->
        <rect x="-8" y="-6" width="16" height="12" rx="3" fill="#e2e8f0" stroke="#0f172a" stroke-width="1.5"/>
        <!-- Solar Panels (Left & Right) -->
        <rect x="-26" y="-5" width="16" height="10" rx="1.5" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
        <line x1="-18" y1="-5" x2="-18" y2="5" stroke="#bae6fd" stroke-width="0.8"/>
        <rect x="10" y="-5" width="16" height="10" rx="1.5" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
        <line x1="18" y1="-5" x2="18" y2="5" stroke="#bae6fd" stroke-width="0.8"/>
        <circle cx="0" cy="0" r="2.5" fill="#22c55e"/>
      </g>

      <!-- Live Dynamic Vectors Overlay -->
      ${s?`
        <!-- Tangential Velocity Vector (Horizontal, Cyan/Green) -->
        <g stroke="${g}" stroke-width="3" fill="${g}">
          <line x1="${w}" y1="${$}" x2="${w+x}" y2="${$}"/>
          <polygon points="${w+x+7},${$} ${w+x},${$-4.5} ${w+x},${$+4.5}"/>
          <text x="${w+x+12}" y="${$-6}" font-size="11" font-weight="700" fill="${g}">
            v₀ = ${r} կմ/վ (Հորիզոնական արագություն)
          </text>
        </g>

        <!-- Gravitational Centripetal Acceleration Vector (Points to Earth Center, Red) -->
        <g stroke="#ef4444" stroke-width="3" fill="#ef4444">
          <line x1="${w}" y1="${$}" x2="${w}" y2="${$+b}"/>
          <polygon points="${w},${$+b+7} ${w-4.5},${$+b} ${w+4.5},${$+b}"/>
          <text x="${w+8}" y="${$+b/2+4}" font-size="11" font-weight="700" fill="#fca5a5">
            g = ${n.gravityAtAlt||8.7} մ/վ² (Ազատ անկում)
          </text>
        </g>
      `:""}

      <!-- Apoapsis / Periapsis Markers if Elliptic -->
      ${i==="elliptic"?`
        <g transform="translate(25, 60)">
          <rect width="180" height="48" rx="8" fill="#1e293b" fill-opacity="0.9" stroke="#f59e0b" stroke-width="1.5"/>
          <text x="10" y="20" font-size="11" font-weight="700" fill="#fde68a">Ապոգեյ (h_a)՝ ${n.apoapsisKm} կմ</text>
          <text x="10" y="38" font-size="11" font-weight="700" fill="#93c5fd">Պերիգեյ (h_p)՝ ${n.periapsisKm} կմ</text>
        </g>
      `:""}

      <!-- Top Status Banner Pill -->
      <g transform="translate(20, 18)">
        <rect width="360" height="34" rx="8" fill="${m}" fill-opacity="0.92" stroke="${g}" stroke-width="1.5"/>
        <text x="14" y="22" font-size="12" font-weight="700" fill="${d}">
          ${f}
        </text>
      </g>

      <!-- Bottom Right Telemetry Box -->
      <g transform="translate(380, 360)">
        <rect width="200" height="64" rx="8" fill="#0f172a" fill-opacity="0.92" stroke="#334155" stroke-width="1.5"/>
        <text x="12" y="20" font-size="11" font-weight="700" fill="#38bdf8">1-ին տիեզերական v₁՝ ${o} կմ/վ</text>
        <text x="12" y="38" font-size="11" font-weight="700" fill="#c084fc">2-րդ տիեզերական v_esc՝ ${c} կմ/վ</text>
        <text x="12" y="54" font-size="10" font-weight="600" fill="#94a3b8">
          Պարբերություն T՝ ${n.periodMin?n.periodMin+" րոպե":"Անվերջ / Անկում"}
        </text>
      </g>
    </svg>
  `}function bl({colPitchDeg:e=11,tiltForwardDeg:t=0,tiltRollDeg:a=0,mainTorqueNm:s=4200,tailAntiTorqueNm:n=4200,netYawTorqueNm:i=0,yawState:r="balanced",isHover:o=!0,flightState:c="hover",totalThrustKn:l=20.16,verticalLiftKn:u=20.16,forwardThrustKn:p=0,showVectors:y=!0}={}){const h=200-(e-4)*1.5,v=-t,g=e,m=Math.min(85,Math.max(15,u*3.8)),d=Math.min(65,Math.abs(p)*12);let f="#22c55e",x="✓ Կայուն Կուրս (Հակապտտող մոմենտը հավասարակշռված է)";return r==="yaw_left"?(f="#ef4444",x="⚠️ Պոչային հակամոմենտը թույլ է → Անկառավարելի պտույտ ձախ"):r==="yaw_right"&&(f="#f59e0b",x="⚠️ Պոչային հակամոմենտը ավելցուկային է → Պտույտ աջ"),`
    <svg viewBox="0 0 600 380" class="helicopter-simulator-svg" aria-label="Ուղղաթիռի լիցքաթիթեղ և ռոտորի աերոդինամիկա">
      <defs>
        <linearGradient id="heli-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </linearGradient>
        <linearGradient id="mast-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#64748b"/>
          <stop offset="50%" stop-color="#94a3b8"/>
          <stop offset="100%" stop-color="#475569"/>
        </linearGradient>
        <linearGradient id="blade-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="50%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>

      <!-- Background Box -->
      <rect width="600" height="380" rx="14" fill="url(#heli-bg)" stroke="#cbd5e1" stroke-width="2"/>

      <!-- Tail Boom & Tail Rotor Silhouette (Right Side) -->
      <g id="tail-section" transform="translate(360, 250)">
        <!-- Tail Boom Tube -->
        <polygon points="0,0 180,-15 180,-5 0,15" fill="#475569"/>
        <!-- Vertical Stabilizer Fin -->
        <polygon points="170,-45 195,-55 190,15 170,10" fill="#334155"/>
        <!-- Tail Rotor Hub & Blades -->
        <circle cx="185" cy="-20" r="6" fill="#f97316"/>
        <line x1="185" y1="-50" x2="185" y2="10" stroke="#f97316" stroke-width="4" stroke-linecap="round"/>
        <!-- Tail Rotor Anti-Torque Thrust Arrow -->
        <g stroke="#06b6d4" stroke-width="3" fill="#06b6d4">
          <line x1="185" y1="-20" x2="185" y2="-70"/>
          <polygon points="185,-78 180,-70 190,-70"/>
          <text x="140" y="-82" font-size="11" font-weight="700" fill="#0891b2">F_պոչ (${n} Ն·մ)</text>
        </g>
      </g>

      <!-- Main Helicopter Fuselage Base -->
      <g id="fuselage" transform="translate(180, 240)">
        <!-- Cabin Silhouette -->
        <path d="M 0 35 C -40 35, -70 10, -70 -20 C -70 -45, -30 -50, 20 -50 C 90 -50, 180 -15, 180 15 C 180 35, 120 35, 0 35 Z" fill="#334155"/>
        <!-- Cockpit Glass Window -->
        <path d="M -20 -45 C -55 -40, -65 -25, -65 -15 C -45 -15, -10 -25, 0 -45 Z" fill="#38bdf8" opacity="0.8"/>
        <!-- Landing Skids -->
        <line x1="-50" y1="45" x2="140" y2="45" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
        <line x1="-20" y1="35" x2="-30" y2="45" stroke="#1e293b" stroke-width="3"/>
        <line x1="80" y1="35" x2="70" y2="45" stroke="#1e293b" stroke-width="3"/>
      </g>

      <!-- Main Rotor Mast (Vertical Steel Shaft) -->
      <rect x="232" y="90" width="16" height="150" fill="url(#mast-grad)" stroke="#334155" stroke-width="1.5"/>

      <!-- Main Rotor Torque Reaction Spiral (Orange Arrow) -->
      <g stroke="#f97316" stroke-width="2.5" fill="none">
        <path d="M 220 220 C 210 230, 270 235, 260 215" stroke-dasharray="4 2"/>
        <polygon points="262,210 256,218 266,217" fill="#f97316"/>
        <text x="272" y="225" font-size="10" font-weight="700" fill="#ea580c">τ_ռեակցիա (${s} Ն·մ)</text>
      </g>

      <!-- Swashplate Assembly (Լիցքաթիթեղ) -->
      <g id="swashplate-assembly" transform="translate(240, ${h}) rotate(${v})">
        <!-- Lower Fixed (Stationary) Swashplate -->
        <rect x="-36" y="10" width="72" height="10" rx="4" fill="#64748b" stroke="#334155" stroke-width="1.5"/>
        <text x="42" y="18" font-size="9" font-weight="700" fill="#475569">Անշարժ սկավառակ</text>
        
        <!-- Ball Bearing Divider -->
        <circle cx="-20" cy="8" r="2.5" fill="#e2e8f0"/>
        <circle cx="0" cy="8" r="2.5" fill="#e2e8f0"/>
        <circle cx="20" cy="8" r="2.5" fill="#e2e8f0"/>

        <!-- Upper Rotating Swashplate -->
        <rect x="-38" y="-2" width="76" height="9" rx="3.5" fill="#0284c7" stroke="#0369a1" stroke-width="1.5"/>
        <text x="42" y="5" font-size="9" font-weight="700" fill="#0284c7">Պտտվող սկավառակ</text>

        <!-- Pushrod Links up to Rotor Head -->
        <line x1="-28" y1="-2" x2="-28" y2="-50" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
        <line x1="28" y1="-2" x2="28" y2="-50" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- Rotor Head & Blade Grips at Mast Top (240, 90) -->
      <g id="rotor-head" transform="translate(240, 90) rotate(${v})">
        <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="#0f172a" stroke-width="2"/>
        
        <!-- Left Blade (Advancing Blade) -->
        <g transform="translate(-12, 0) rotate(${g})">
          <polygon points="0,-4 -190,-7 -190,7 0,4" fill="url(#blade-grad)" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="-185" y1="0" x2="-5" y2="0" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3"/>
          <text x="-150" y="-12" font-size="10" font-weight="700" fill="#1e293b">Թիակ 1 (Առաջընթաց)</text>
        </g>

        <!-- Right Blade (Retreating Blade) -->
        <g transform="translate(12, 0) rotate(${-g})">
          <polygon points="0,-4 190,-7 190,7 0,4" fill="url(#blade-grad)" stroke="#0f172a" stroke-width="1.5"/>
          <line x1="5" y1="0" x2="185" y2="0" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3"/>
          <text x="90" y="-12" font-size="10" font-weight="700" fill="#1e293b">Թիակ 2 (Հետընթաց)</text>
        </g>
      </g>

      <!-- Live Force Vectors at Rotor Hub (240, 90) -->
      ${y?`
        <!-- Vertical Lift Vector (Green) -->
        <g stroke="#22c55e" stroke-width="3.5" fill="#22c55e">
          <line x1="240" y1="90" x2="240" y2="${90-m}"/>
          <polygon points="240,${90-m-8} 234,${90-m} 246,${90-m}"/>
          <text x="248" y="${90-m/2}" font-size="11" font-weight="700" fill="#15803d">
            L_վերամբարձ = ${u} կՆ
          </text>
        </g>

        <!-- Forward Propulsion Vector (Cyan, if cyclic tilt active) -->
        ${d>4?`
          <g stroke="#0284c7" stroke-width="3" fill="#0284c7">
            <line x1="240" y1="90" x2="${240-p*10}" y2="90"/>
            <polygon points="${240-p*10-7},90 ${240-p*10},85 ${240-p*10},95"/>
            <text x="${240-p*10-15}" y="82" font-size="11" font-weight="700" fill="#0284c7" text-anchor="end">
              T_առաջ = ${p} կՆ
            </text>
          </g>
        `:""}
      `:""}

      <!-- Top Status Banner Pill -->
      <g transform="translate(20, 20)">
        <rect width="360" height="34" rx="8" fill="#0f172a" fill-opacity="0.9" stroke="${f}" stroke-width="1.5"/>
        <text x="14" y="22" font-size="12" font-weight="700" fill="${f}">
          ${x}
        </text>
      </g>

      <!-- Bottom Swashplate Callout -->
      <g transform="translate(20, 320)">
        <rect width="320" height="42" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="12" y="18" font-size="11" font-weight="700" fill="#0f172a">
          ⚙️ Լիցքաթիթեղ (Swashplate)՝
        </text>
        <text x="12" y="34" font-size="10" font-weight="600" fill="#64748b">
          Կոլեկտիվ քայլ՝ ${e}° | Ցիկլիկ թեքում՝ ${t}°
        </text>
      </g>
    </svg>
  `}function yl({beamVoltageV:e=1500,beamCurrentA:t=1.8,propellant:a="xenon",thrustMilliN:s=128,specificImpulseSec:n=4788,exhaustVelocityKms:i=46.95,beamPowerKw:r=2.7,showVectors:o=!0}={}){const c={xenon:{primary:"#38bdf8",secondary:"#818cf8",plasma:"#a855f7"},krypton:{primary:"#4ade80",secondary:"#2dd4bf",plasma:"#34d399"},argon:{primary:"#c084fc",secondary:"#e879f9",plasma:"#d946ef"},iodine:{primary:"#f43f5e",secondary:"#fb7185",plasma:"#e11d48"}},l=c[a]||c.xenon,u=Math.min(1,Math.max(.3,t/3)),p=Math.min(220,Math.max(80,100+(e-1e3)*.05));return`
    <svg viewBox="0 0 680 380" class="aerolab-art ion-art" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Իոնային շարժիչ և տիեզերական պարուրաձև ուղեծիր">
      <defs>
        <!-- Deep Space Background Gradient -->
        <radialGradient id="space-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#0b132b"/>
          <stop offset="60%" stop-color="#050a18"/>
          <stop offset="100%" stop-color="#020617"/>
        </radialGradient>

        <!-- Ion Plume Gradient -->
        <linearGradient id="ion-plume-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${l.primary}" stop-opacity="${.95*u}"/>
          <stop offset="40%" stop-color="${l.secondary}" stop-opacity="${.75*u}"/>
          <stop offset="85%" stop-color="${l.plasma}" stop-opacity="${.35*u}"/>
          <stop offset="100%" stop-color="${l.primary}" stop-opacity="0"/>
        </linearGradient>

        <!-- Plasma Glow in Chamber -->
        <radialGradient id="plasma-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
          <stop offset="30%" stop-color="${l.primary}" stop-opacity="0.8"/>
          <stop offset="70%" stop-color="${l.plasma}" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
        </radialGradient>

        <!-- Metallic Grid Shader -->
        <linearGradient id="metal-chassis" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#64748b"/>
          <stop offset="30%" stop-color="#334155"/>
          <stop offset="70%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>

        <!-- Solar Panel Cell Pattern -->
        <pattern id="solar-grid" width="12" height="10" patternUnits="userSpaceOnUse">
          <rect width="12" height="10" fill="#1e3a8a" stroke="#3b82f6" stroke-width="0.8"/>
          <line x1="0" y1="5" x2="12" y2="5" stroke="#60a5fa" stroke-width="0.5"/>
        </pattern>
      </defs>

      <!-- Background with Stars -->
      <rect width="680" height="380" fill="url(#space-bg)"/>
      <g fill="#94a3b8" opacity="0.6">
        <circle cx="45" cy="35" r="1.2"/>
        <circle cx="120" cy="70" r="0.8"/>
        <circle cx="210" cy="25" r="1.5"/>
        <circle cx="340" cy="65" r="1.0"/>
        <circle cx="450" cy="40" r="1.2"/>
        <circle cx="560" cy="85" r="1.0"/>
        <circle cx="630" cy="30" r="1.4"/>
        <circle cx="90" cy="340" r="1.0"/>
        <circle cx="230" cy="360" r="1.2"/>
        <circle cx="480" cy="350" r="0.8"/>
        <circle cx="620" cy="320" r="1.3"/>
      </g>

      <!-- Left Section: Cutaway Schematic of Ion Thruster -->
      <g id="thruster-schematic" transform="translate(40, 180)">
        <!-- Spacecraft Body / Avionics Hull -->
        <polygon points="-30,-85 30,-85 30,85 -30,85 -40,60 -40,-60" fill="url(#metal-chassis)" stroke="#475569" stroke-width="2"/>
        <text x="-25" y="-92" font-size="10" font-weight="700" fill="#94a3b8">Տիեզերանավի Կորպուս</text>

        <!-- Solar Array Wing (Top Left) -->
        <rect x="-35" y="-140" width="85" height="45" rx="3" fill="url(#solar-grid)" stroke="#60a5fa" stroke-width="1.5"/>
        <line x1="5" y1="-95" x2="5" y2="-85" stroke="#94a3b8" stroke-width="3"/>
        <text x="7" y="-120" font-size="9" font-weight="700" fill="#93c5fd" text-anchor="middle">Արևային Մարտկոց</text>

        <!-- Xenon Propellant Tank (Spherical COPV) -->
        <circle cx="0" cy="0" r="26" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <path d="M -18 -18 C -5 -30, 20 -20, 22 5" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity="0.6"/>
        <text x="0" y="4" font-size="9" font-weight="700" fill="#e0f2fe" text-anchor="middle">${a.toUpperCase()}</text>
        <text x="0" y="15" font-size="8" font-weight="600" fill="#7dd3fc" text-anchor="middle">Բալոն</text>

        <!-- Propellant Feed Line & Valve -->
        <path d="M 26 0 L 50 0" stroke="#0284c7" stroke-width="3" fill="none"/>
        <polygon points="40,-4 46,0 40,4" fill="#38bdf8"/>

        <!-- Ionization Discharge Chamber -->
        <path d="M 50,-50 L 125,-50 L 125,50 L 50,50 Z" fill="#0f172a" stroke="#64748b" stroke-width="2"/>
        
        <!-- Permanent Ring Magnets (Cusp Magnetic Confinement) -->
        <rect x="52" y="-48" width="10" height="8" rx="2" fill="#ef4444"/>
        <rect x="80" y="-48" width="10" height="8" rx="2" fill="#3b82f6"/>
        <rect x="108" y="-48" width="10" height="8" rx="2" fill="#ef4444"/>
        <rect x="52" y="40" width="10" height="8" rx="2" fill="#ef4444"/>
        <rect x="80" y="40" width="10" height="8" rx="2" fill="#3b82f6"/>
        <rect x="108" y="40" width="10" height="8" rx="2" fill="#ef4444"/>

        <!-- Plasma Glow Inside Chamber -->
        <ellipse cx="88" cy="0" rx="32" ry="38" fill="url(#plasma-core)"/>
        
        <!-- Ions (Xe+) and Electrons (e-) floating in plasma -->
        <g font-size="9" font-weight="800">
          <text x="70" y="-12" fill="#38bdf8">${a==="xenon"?"Xe⁺":"Ion⁺"}</text>
          <text x="95" y="15" fill="#38bdf8">${a==="xenon"?"Xe⁺":"Ion⁺"}</text>
          <text x="80" y="28" fill="#fbbf24">e⁻</text>
          <text x="100" y="-18" fill="#fbbf24">e⁻</text>
        </g>

        <!-- Electrostatic Accelerator Grids (Screen Grid & Accel Grid) -->
        <!-- Screen Grid (+1500V) -->
        <line x1="126" y1="-48" x2="126" y2="48" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 2"/>
        <text x="126" y="-55" font-size="8" font-weight="700" fill="#38bdf8" text-anchor="middle">+${e}V</text>
        <text x="126" y="-65" font-size="8" font-weight="700" fill="#94a3b8" text-anchor="middle">Էկրանային ցանց</text>

        <!-- Accelerator Grid (-300V) -->
        <line x1="133" y1="-48" x2="133" y2="48" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4 2"/>
        <text x="133" y="60" font-size="8" font-weight="700" fill="#ef4444" text-anchor="middle">-300V</text>
        <text x="133" y="70" font-size="8" font-weight="700" fill="#94a3b8" text-anchor="middle">Արագացնող ցանց</text>

        <!-- High-Velocity Ion Plume Ejection -->
        <path d="M 134,-44 Q ${134+p*.6} -65 ${134+p} -75 L ${134+p} 75 Q ${134+p*.6} 65 134 44 Z" fill="url(#ion-plume-grad)"/>

        <!-- Fast Ion Streamers -->
        <g stroke="${l.primary}" stroke-width="1.8" opacity="0.8">
          <line x1="135" y1="-25" x2="${135+p*.9}" y2="-38" stroke-dasharray="10 4"/>
          <line x1="135" y1="0" x2="${135+p}" y2="0" stroke-dasharray="12 4"/>
          <line x1="135" y1="25" x2="${135+p*.9}" y2="38" stroke-dasharray="10 4"/>
        </g>

        <!-- Hollow Cathode Neutralizer (spraying electrons into plume) -->
        <g id="neutralizer" transform="translate(142, -58)">
          <rect x="0" y="0" width="14" height="8" rx="2" fill="#e2e8f0" stroke="#475569" stroke-width="1"/>
          <!-- Electron spray path -->
          <path d="M 14 4 Q 30 10 45 28" fill="none" stroke="#fbbf24" stroke-width="1.5" stroke-dasharray="2 2"/>
          <circle cx="45" cy="28" r="2" fill="#fbbf24"/>
          <text x="20" y="-6" font-size="8" font-weight="700" fill="#fbbf24">Չեզոքացուցիչ (e⁻)</text>
        </g>

        <!-- Live Force Vectors -->
        ${o?`
          <!-- Exhaust Ion Thrust Vector (Right, blue) -->
          <g stroke="${l.primary}" stroke-width="2.5" fill="${l.primary}">
            <line x1="135" y1="0" x2="220" y2="0"/>
            <polygon points="227,0 218,-5 218,5"/>
            <text x="231" y="-8" font-size="10" font-weight="700" fill="${l.primary}">v_e = ${i} կմ/վ</text>
          </g>

          <!-- Reaction Thrust on Spacecraft (Left, orange) -->
          <g stroke="#f97316" stroke-width="3" fill="#f97316">
            <line x1="-30" y1="0" x2="-95" y2="0"/>
            <polygon points="-102,0 -93,-5 -93,5"/>
            <text x="-106" y="-8" font-size="10" font-weight="700" fill="#f97316" text-anchor="end">F_քարշ = ${s} մՆ</text>
          </g>
        `:""}
      </g>

      <!-- Right Section: Continuous Interplanetary Spiral Trajectory Inset -->
      <g id="orbital-spiral-inset" transform="translate(425, 45)">
        <rect width="235" height="190" rx="12" fill="#0f172a" fill-opacity="0.85" stroke="#334155" stroke-width="1.5"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#38bdf8">Տիեզերական Պարույր (Low-Thrust)</text>

        <!-- Center: Sun -->
        <g transform="translate(118, 105)">
          <circle cx="0" cy="0" r="10" fill="#f59e0b" filter="drop-shadow(0 0 6px #f59e0b)"/>
          
          <!-- Inner Planet (Earth Orbit) -->
          <circle cx="0" cy="0" r="32" fill="none" stroke="#38bdf8" stroke-width="1" stroke-dasharray="3 3" opacity="0.6"/>
          <circle cx="32" cy="0" r="3.5" fill="#38bdf8"/>
          <text x="36" y="10" font-size="7" font-weight="700" fill="#38bdf8">Երկիր</text>

          <!-- Outer Target (Mars / Asteroid Belt) -->
          <circle cx="0" cy="0" r="72" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="4 3" opacity="0.6"/>
          <circle cx="-72" cy="0" r="3.5" fill="#ef4444"/>
          <text x="-72" y="-6" font-size="7" font-weight="700" fill="#ef4444" text-anchor="middle">Մարս</text>

          <!-- Continuous Outward Ion Spiral Trajectory -->
          <path d="M 32 0 
                   C 32 25, 10 38, -10 38 
                   C -35 38, -48 15, -48 -10
                   C -48 -40, -15 -58, 15 -58
                   C 48 -58, 68 -25, 68 10
                   C 68 45, 30 72, -15 72
                   C -50 72, -72 40, -72 0"
                fill="none" stroke="${l.primary}" stroke-width="2" stroke-dasharray="5 3"/>
          
          <!-- Spacecraft Icon on Spiral -->
          <circle cx="15" cy="-58" r="3" fill="#ffffff" stroke="${l.primary}" stroke-width="1.5"/>
          <polygon points="12,-63 20,-58 12,-53" fill="${l.primary}"/>
        </g>

        <text x="14" y="174" font-size="9" font-weight="600" fill="#94a3b8">
          Անընդհատ միկրոքարշուժով պարուրաձև թռիչք
        </text>
      </g>

      <!-- Bottom Telemetry HUD Bar -->
      <g transform="translate(425, 250)">
        <rect width="235" height="110" rx="10" fill="#1e293b" fill-opacity="0.9" stroke="#475569" stroke-width="1.5"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#e2e8f0">Իոնային Տելեմետրիա</text>
        <line x1="14" y1="32" x2="220" y2="32" stroke="#334155" stroke-width="1"/>
        
        <text x="14" y="52" font-size="10" font-weight="600" fill="#94a3b8">Տեսակարար Իմպուլս (I_sp)՝</text>
        <text x="220" y="52" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="end">${n} վ</text>
        
        <text x="14" y="72" font-size="10" font-weight="600" fill="#94a3b8">Արտահոսքի Արագություն՝</text>
        <text x="220" y="72" font-size="11" font-weight="700" fill="#22c55e" text-anchor="end">${i} կմ/վ</text>
        
        <text x="14" y="92" font-size="10" font-weight="600" fill="#94a3b8">Էլեկտրական Հզորություն՝</text>
        <text x="220" y="92" font-size="11" font-weight="700" fill="#fbbf24" text-anchor="end">${r} կՎտ</text>
      </g>
    </svg>
  `}function vl({airSpeedKmh:e=90,bankAngleDeg:t=30,thermalStrength:a=3.5,thermalRadius:s=120,turnRadiusM:n=78,loadFactor:i=1.15,turnSinkRate:r=1.1,thermalUpdraft:o=3.2,netClimbRate:c=2.1,bestLd:l=38,isClimbing:u=!0,showVectors:p=!0}={}){const y=c>0,h=y?"#22c55e":"#ef4444",v=y?`🟢 ՎԵՐԵԼՔ ԹԵՐՄԻԿՈՒՄ՝ +${c} մ/վ`:`🔴 ԻՋԵՑՈՒՄ (ԿՈՐՈՒՍՏ)՝ ${c} մ/վ`,g=Math.max(30,Math.min(130,n/150*100));return`
    <svg viewBox="0 0 680 380" class="aerolab-art glider-art" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Սավառնակը թերմիկ օդային հոսանքում և բևեռային կորը">
      <defs>
        <!-- Atmospheric Sky Gradient -->
        <linearGradient id="sky-thermal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#bae6fd"/>
          <stop offset="55%" stop-color="#e0f2fe"/>
          <stop offset="85%" stop-color="#f0fdf4"/>
          <stop offset="100%" stop-color="#bbf7d0"/>
        </linearGradient>

        <!-- Thermal Convection Heatmap Gradient -->
        <radialGradient id="thermal-column" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fef08a" stop-opacity="0.85"/>
          <stop offset="45%" stop-color="#fed7aa" stop-opacity="0.55"/>
          <stop offset="80%" stop-color="#fecaca" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#e0f2fe" stop-opacity="0"/>
        </radialGradient>

        <!-- Glider Wing Gradient -->
        <linearGradient id="glider-wing" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="50%" stop-color="#e2e8f0"/>
          <stop offset="100%" stop-color="#cbd5e1"/>
        </linearGradient>
      </defs>

      <!-- Sky & Landscape Background -->
      <rect width="680" height="380" fill="url(#sky-thermal)"/>

      <!-- Horizon Ground Landscape -->
      <path d="M 0 330 Q 180 310 360 335 T 680 325 L 680 380 L 0 380 Z" fill="#86efac" opacity="0.6"/>
      <path d="M 0 345 Q 220 330 440 350 T 680 340 L 680 380 L 0 380 Z" fill="#4ade80" opacity="0.8"/>

      <!-- Convective Thermal Column (Center at X=240, Y=180) -->
      <g id="thermal-updraft-column" transform="translate(240, 180)">
        <ellipse cx="0" cy="0" rx="140" ry="150" fill="url(#thermal-column)"/>

        <!-- Upward Flow Streamline Arrows -->
        <g stroke="#f59e0b" stroke-width="2" stroke-linecap="round" fill="#f59e0b" opacity="0.75">
          <line x1="-70" y1="90" x2="-70" y2="-90" stroke-dasharray="8 6"/>
          <polygon points="-70,-96 -74,-88 -66,-88"/>
          
          <line x1="-25" y1="110" x2="-25" y2="-110" stroke-width="2.5" stroke-dasharray="10 5"/>
          <polygon points="-25,-118 -30,-108 -20,-108"/>

          <line x1="25" y1="110" x2="25" y2="-110" stroke-width="2.5" stroke-dasharray="10 5"/>
          <polygon points="25,-118 20,-108 30,-108"/>

          <line x1="70" y1="90" x2="70" y2="-90" stroke-dasharray="8 6"/>
          <polygon points="70,-96 66,-88 74,-88"/>
        </g>
        <text x="0" y="-128" font-size="11" font-weight="700" fill="#b45309" text-anchor="middle">
          Թերմիկ Կոնվեկտիվ Սյուն (w_core = ${a} մ/վ)
        </text>

        <!-- Circling Track Oval (3D projection) -->
        <ellipse cx="0" cy="0" rx="${g}" ry="${g*.45}" fill="none" stroke="#0284c7" stroke-width="2" stroke-dasharray="6 4" opacity="0.7"/>

        <!-- Glider Position on Orbit -->
        <g id="glider-actor" transform="translate(${g*.75}, ${-g*.3}) rotate(${t})">
          <!-- Sailplane Body (Fuselage) -->
          <ellipse cx="0" cy="0" rx="26" ry="4.5" fill="#ffffff" stroke="#334155" stroke-width="1.5"/>
          <!-- Cockpit Canopy (Blue tint) -->
          <ellipse cx="6" cy="-1.5" rx="9" ry="2.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1"/>
          <!-- High-Aspect-Ratio Slender Wings -->
          <polygon points="-4,-4 -75,-6 -75,6 -4,4" fill="url(#glider-wing)" stroke="#334155" stroke-width="1.2"/>
          <polygon points="4,-4 75,-6 75,6 4,4" fill="url(#glider-wing)" stroke="#334155" stroke-width="1.2"/>
          <!-- T-Tail Stabilizer -->
          <line x1="-22" y1="0" x2="-22" y2="-12" stroke="#334155" stroke-width="2"/>
          <line x1="-27" y1="-12" x2="-17" y2="-12" stroke="#334155" stroke-width="2"/>

          <!-- Dynamic Force Vectors on Banked Glider -->
          ${p?`
            <!-- Lift Vector L (Perpendicular to wings, green) -->
            <g stroke="#22c55e" stroke-width="2.5" fill="#22c55e">
              <line x1="0" y1="0" x2="0" y2="-48"/>
              <polygon points="0,-55 -4,-47 4,-47"/>
              <text x="6" y="-35" font-size="9" font-weight="700" fill="#15803d">L_վերամբարձ</text>
            </g>

            <!-- Centrifugal Force (Horizontal, orange) -->
            <g stroke="#f97316" stroke-width="2" fill="#f97316">
              <line x1="0" y1="0" x2="35" y2="0"/>
              <polygon points="41,0 33,-4 33,4"/>
              <text x="12" y="14" font-size="8" font-weight="700" fill="#c2410c">F_կենտրոնախույս</text>
            </g>
          `:""}
        </g>

        <!-- Circling Radius Indicator -->
        <line x1="0" y1="0" x2="${g*.75}" y2="${-g*.3}" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="3 3"/>
        <circle cx="0" cy="0" r="3" fill="#0369a1"/>
        <text x="${g*.35}" y="${-g*.15-5}" font-size="9" font-weight="700" fill="#0369a1">
          R = ${n} մ
        </text>
      </g>

      <!-- Left Inset: Glider Drag Polar Graph -->
      <g id="polar-curve-graph" transform="translate(25, 45)">
        <rect width="180" height="155" rx="10" fill="#ffffff" fill-opacity="0.9" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="12" y="20" font-size="11" font-weight="700" fill="#0f172a">Սավառնակի Պոլյարա</text>
        <text x="12" y="32" font-size="8" font-weight="600" fill="#64748b">v_sink vs v_forward</text>

        <!-- Coordinate axes -->
        <g stroke="#94a3b8" stroke-width="1.2">
          <!-- Forward Speed axis (X) -->
          <line x1="25" y1="42" x2="165" y2="42"/>
          <text x="160" y="38" font-size="8" fill="#64748b" text-anchor="end">v_արագ (կմ/ժ)</text>
          
          <!-- Sink axis (Y pointing DOWN) -->
          <line x1="25" y1="42" x2="25" y2="140"/>
          <text x="28" y="136" font-size="8" fill="#64748b">v_իջեցում (մ/վ)</text>
        </g>

        <!-- Polar Curve (Characteristic Parabolic Sink Curve) -->
        <path d="M 35 110 Q 75 60 110 75 T 160 135" fill="none" stroke="#2563eb" stroke-width="2.5"/>

        <!-- Tangent Line for Best Glide Ratio (Max L/D) -->
        <line x1="25" y1="42" x2="145" y2="120" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3 2"/>
        <text x="135" y="115" font-size="8" font-weight="700" fill="#d97706">L/D = ${l}</text>

        <!-- Current Operating Point Dot -->
        <circle cx="${Math.min(155,Math.max(35,25+(e-60)*1.1))}" 
                cy="${Math.min(140,Math.max(50,42+r*25))}" 
                r="4.5" fill="#ef4444" stroke="#ffffff" stroke-width="1.5"/>
      </g>

      <!-- Top Status Banner Pill -->
      <g transform="translate(240, 25)">
        <rect width="250" height="34" rx="8" fill="#0f172a" fill-opacity="0.9" stroke="${h}" stroke-width="1.5"/>
        <text x="125" y="22" font-size="11" font-weight="700" fill="${h}" text-anchor="middle">
          ${v}
        </text>
      </g>

      <!-- Right Telemetry Panel -->
      <g transform="translate(480, 45)">
        <rect width="180" height="230" rx="10" fill="#0f172a" fill-opacity="0.9" stroke="#334155" stroke-width="1.5"/>
        <text x="14" y="24" font-size="11" font-weight="700" fill="#f8fafc">Թռիչքային Տվյալներ</text>
        <line x1="14" y1="32" x2="166" y2="32" stroke="#334155" stroke-width="1"/>
        
        <text x="14" y="52" font-size="10" font-weight="600" fill="#94a3b8">Առաջընթաց Արագություն՝</text>
        <text x="166" y="52" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="end">${e} կմ/ժ</text>
        
        <text x="14" y="80" font-size="10" font-weight="600" fill="#94a3b8">Կողաթեքում (phi)՝</text>
        <text x="166" y="80" font-size="11" font-weight="700" fill="#e2e8f0" text-anchor="end">${t}°</text>

        <text x="14" y="108" font-size="10" font-weight="600" fill="#94a3b8">Գերբեռնվածություն (n)՝</text>
        <text x="166" y="108" font-size="11" font-weight="700" fill="#fbbf24" text-anchor="end">${i} g</text>

        <text x="14" y="136" font-size="10" font-weight="600" fill="#94a3b8">Թերմիկ Վերելք՝</text>
        <text x="166" y="136" font-size="11" font-weight="700" fill="#22c55e" text-anchor="end">+${o} մ/վ</text>

        <text x="14" y="164" font-size="10" font-weight="600" fill="#94a3b8">Սավառնակի Իջեցում՝</text>
        <text x="166" y="164" font-size="11" font-weight="700" fill="#f87171" text-anchor="end">-${r} մ/վ</text>

        <line x1="14" y1="180" x2="166" y2="180" stroke="#334155" stroke-width="1"/>

        <text x="14" y="202" font-size="10" font-weight="700" fill="#e2e8f0">Արդյունարար Վերելք՝</text>
        <text x="166" y="202" font-size="12" font-weight="800" fill="${h}" text-anchor="end">
          ${y?"+":""}${c} մ/վ
        </text>
      </g>
    </svg>
  `}const xl=[{level:1,title:"Մակարդակ 1 — Ֆիզիկայի բացարձակ հիմունքներ",subtitle:"Շարժում, դիրք, արագություն, արագացում, զանգված և ձգողություն",icon:"🧭",status:"active",description:"Սովորիր թռիչքի մեխանիկայի հիմնասյուները զրոյից՝ առանց բարդ բանաձևերի անգիր սովորելու։ Բոլոր օրենքները կբացահայտես ինքդ՝ փորձերի միջոցով։",lessons:["1.1","1.2","1.3","1.4","1.5"]},{level:2,title:"Մակարդակ 2 — Օդի օվկիանոսը և աերոդինամիկայի ծնունդը",subtitle:"Մթնոլորտ, օդի խտություն, ճնշում և դիմադրության ուժ",icon:"💨",status:"preview",description:"Ինչո՞ւ օդը դատարկություն չէ։ Ինչպե՞ս է օդի խտությունը պահում թռչուններին ու օդանավերին։",lessons:["2.1","2.2","2.3","2.4"]},{level:3,title:"Մակարդակ 3 — Առաջին թռչող մոդելները",subtitle:"Թղթե սավառնակներ, ծանրության կենտրոն (CoM) և կայունություն",icon:"📐",status:"preview",description:"Ինչո՞ւ է ինքնաթիռը սավառնում կամ գահավիժում։ Ինչպե՞ս ճիշտ տեղադրել ծանրության և վերամբարձ ուժերի կենտրոնները։",lessons:["3.1","3.2","3.3"]},{level:4,title:"Մակարդակ 4 — Ինքնաթիռներ և Ուղղաթիռներ",subtitle:"Բեռնուլիի սկզբունք, թևի պրոֆիլ (Airfoil), կրող պտուտակներ",icon:"✈️",status:"preview",description:"Ինչպե՞ս է թևի ձևը ստեղծում վերամբարձ ուժ։ Ինչպե՞ս են ուղղաթիռները կառավարում թեքությունը swashplate մեխանիզմով։",lessons:["4.1","4.2","4.3","4.4"]},{level:5,title:"Մակարդակ 5 — Ռեակտիվ շարժիչներ և Գերձայնային արագություններ",subtitle:"Բրեյթոնի ցիկլ, տուրբոֆեն շարժիչներ, Մախի կոն և հարվածային ալիքներ",icon:"⚡",status:"preview",description:"Ինչպե՞ս են տուրբինները սեղմում օդը և ստեղծում տասնյակ տոննաների քարշող ուժ։ Ի՞նչ է տեղի ունենում ձայնի պատնեշը հաղթահարելիս։",lessons:["5.1","5.2","5.3"]},{level:6,title:"Մակարդակ 6 — Հրթիռային ֆիզիկա և Ուղեծրային թռիչքներ",subtitle:"Նյուտոնի 3-րդ օրենք, Ցիոլկովսկու բանաձև, առաջին տիեզերական արագություն",icon:"🛰️",status:"preview",description:"Ինչպե՞ս է հրթիռը շարժվում անօդ տիեզերքում։ Ինչպե՞ս է արբանյակը մնում ուղեծրում՝ առանց ընկնելու։",lessons:["6.1","6.2","6.3"]},{level:7,title:"Մակարդակ 7 — Ինժեներական նախագծում և Ավիացիայի ապագան",subtitle:"Իոնային շարժիչներ, էլեկտրական ավիացիա և ինքնավար անօդաչուներ",icon:"🌟",status:"preview",description:"Տիեզերական միջմոլորակային ճամփորդությունների ապագան և ժամանակակից աերոկոսմիկական ինժեներիան։",lessons:["7.1","7.2"]}],Rt={"1.1":{id:"1.1",level:1,number:"1.1",title:"Ի՞նչ է շարժումը և ինչպե՞ս ենք այն չափում",subtitle:"Հաշվարկման մարմին, հետագիծ, ճանապարհ և տեղափոխության վեկտոր",badge:"🧭 ՏԱՐԱԾՈՒԹՅԱՆ ՈՒՂԵՑՈՒՅՑ",xpReward:50,steps:[{stepIndex:0,type:"question",badge:"ՀԱՐՑ 1 / ՄՏԱԾԻ՛Ր",title:"Ի՞նչ է իրականում շարժումը",prompt:"Պատկերացրու՝ դու նստած ես սլացող գնացքում և գիրք ես կարդում։ Դու շարժվո՞ւմ ես, թե՞ գտնվում ես դադարի վիճակում։",detail:"Մի՛ շտապիր հիշել դասագրքի սահմանումները։ Մտածիր քո և քեզ շրջապատող առարկաների տեսանկյունից։"},{stepIndex:1,type:"prediction",badge:"ԿԱՆԽԱՏԵՍՈՒՄ",title:"Ընտրիր քո կարծիքը նախքան փորձը սկսելը",options:[{id:0,text:"Այո, ես միանշանակ շարժվում եմ, որովհետև գնացքը մեծ արագությամբ ընթանում է ռելսերի վրայով։",isInsight:!1},{id:1,text:"Ոչ, ես չեմ շարժվում, որովհետև նստած եմ իմ նստատեղին և իմ գրքի նկատմամբ անշարժ եմ։",isInsight:!1},{id:2,text:"Կախված է նրանից, թե ո՛ր մարմնի նկատմամբ ենք դիտարկում՝ կառամատույցի՞, թե՞ գնացքի վագոնի։",isInsight:!0}]},{stepIndex:2,type:"experiment",badge:"ԻՆՏԵՐԱԿՏԻՎ ՓՈՐՁ",title:"Հաշվարկման համակարգի և տեղափոխության լաբորատորիա",instruction:"Փոխիր դիտորդի դիրքը («Կառամատույցի դիտորդ» ↔ «Վագոնի ուղևոր») և հետևիր ուղևորի շարժմանը։ Այնուհետև գործարկիր փակ շրջանաձև հետագծով վազքը և համեմատիր անցած ճանապարհը (s) ու տեղափոխության վեկտորը (Δr)։",widgetType:"relative-motion"},{stepIndex:3,type:"observation",badge:"ԴԻՏԱՐԿՈՒՄ",title:"Ի՞նչ տեսար սիմուլյացիայում",questions:["Երբ դիտորդը կառամատույցում էր, վագոնի ուղևորը շարժվո՞ւմ էր։","Երբ դիտորդը վագոնի ներսում էր, նույն ուղևորը շարժվո՞ւմ էր։","Երբ շրջանաձև վազքուղով մարմինը վերադարձավ սկզբնակետ, որքա՞ն դարձավ նրա տեղափոխության վեկտորի երկարությունը։"]},{stepIndex:4,type:"explanation",badge:"ՖԻԶԻԿԱՅԻ ԳԱՂՏՆԻՔԸ",title:"Շարժումը հարաբերական է, իսկ ճանապարհն ու տեղափոխությունը՝ տարբեր",content:`
          <p><strong>1. Շարժման հարաբերականությունը.</strong> Տիեզերքում չկա «բացարձակ անշարժ» կետ։ Շարժում ասելով հասկանում ենք մարմնի դիրքի փոփոխությունը <em>մեկ այլ մարմնի (հաշվարկման մարմնի)</em> նկատմամբ։ Վագոնի նստատեղի նկատմամբ դու անշարժ ես, բայց ռելսերի կամ կառամատույցում կանգնած մարդու նկատմամբ՝ շարժվում ես նույն արագությամբ, ինչ գնացքը։</p>
          <p><strong>2. Ճանապարհ vs Տեղափոխություն.</strong></p>
          <ul>
            <li><strong>Ճանապարհ ($s$).</strong> Այն հետագծի լրիվ երկարությունն է, որով անցել է մարմինը (սկալյար մեծություն, չունի ուղղություն, երբեք չի կարող նվազել)։</li>
            <li><strong>Տեղափոխություն ($\vec{\\Delta r}$).</strong> Սկզբնական դիրքը վերջնական դիրքին միացնող ուղղորդված հատվածն է (վեկտոր)։</li>
          </ul>
          <p class="highlight-callout">Եթե դու առավոտյան դուրս ես գալիս տնից, անցնում 5 կմ և երեկոյան վերադառնում տուն, քո անցած <strong>ճանապարհը 10 կմ է</strong>, բայց քո <strong>տեղափոխությունը ճիշտ 0 մ է</strong>, քանի որ սկզբնակետդ ու վերջնակետդ համընկնում են։</p>
        `},{stepIndex:5,type:"challenge",badge:"ԱՄՐԱՊՆԴՄԱՆ ՄԱՐՏԱՀՐԱՎԵՐ",title:"Ստուգիր գիտելիքդ",question:"Աթլետը վազում է 400 մետր երկարությամբ շրջանաձև վազքուղով։ Մեկ լրիվ պտույտ կատարելուց հետո որքա՞ն է նրա անցած ճանապարհը ($s$) և որքա՞ն է նրա տեղափոխության մոդուլը ($|\\vec{\\Delta r}|$):",options:[{id:0,text:"Ճանապարհը՝ 400 մ, տեղափոխությունը՝ 400 մ",correct:!1},{id:1,text:"Ճանապարհը՝ 400 մ, տեղափոխությունը՝ 0 մ",correct:!0},{id:2,text:"Ճանապարհը՝ 0 մ, տեղափոխությունը՝ 400 մ",correct:!1},{id:3,text:"Երկուսն էլ հավասար են 0 մ",correct:!1}],hint:"Հիշի՛ր. ճանապարհը վազած ամբողջ հետագիծն է, իսկ տեղափոխությունը՝ սկզբնական և վերջնական կետերի միջև ուղիղ հեռավորությունը։ Որտե՞ղ է աթլետը վերջում։",explanation:"Աթլետն անցել է 400 մետրանոց գիծը ($s = 400\\text{ մ}$), բայց քանի որ նա վերադարձել է մեկնարկի կետին, նրա սկզբնակետն ու վերջնակետը համընկել են, ուստի տեղափոխությունը $0\\text{ մ}$ է։"},{stepIndex:6,type:"complete",badge:"🏆 ԴԱՍՆ ԱՎԱՐՏՎԱԾ Է",title:"Գերազանց է։ Դու բացահայտեցիր շարժման հիմքը",unlockedFormula:{symbol:"\\vec{\\Delta r} = \\vec{r}_2 - \\vec{r}_1 \\quad (s = \\int |v| dt)",name:"Տեղափոխության վեկտոր և անցած ճանապարհ",units:"Միավորը՝ մետր (մ / m)"},summary:"Այժմ դու հստակ տարբերում ես հաշվարկման համակարգը, ճանապարհն ու տեղափոխությունը։ Հաջորդ դասում կպարզենք, թե ինչպես է դիրքը փոխվում ժամանակի ընթացքում՝ արագությունը։"}]},"1.2":{id:"1.2",level:1,number:"1.2",title:"Արագություն. որքա՞ն արագ է փոխվում դիրքը",subtitle:"Հավասարաչափ vs Անհավասարաչափ շարժում, ակնթարթային և միջին արագություն",badge:"⚡ ԱՐԱԳՈՒԹՅԱՆ ՎԱՐՊԵՏ",xpReward:50,steps:[{stepIndex:0,type:"question",badge:"ՀԱՐՑ 2 / ՄՏԱԾԻ՛Ր",title:"Սպիդոմետրն ընդդեմ ժամացույցի",prompt:"Մեքենան Երևանից Սևան (60 կմ) հասավ ուղիղ 1 ժամում։ Արդյո՞ք դա նշանակում է, որ մեքենայի սպիդոմետրը ամբողջ ճանապարհին ցույց էր տալիս ճիշտ 60 կմ/ժ։",detail:"Պատկերացրու իրական երթևեկությունը՝ լուսացույցներ, ոլորաններ և մայրուղի։"},{stepIndex:1,type:"prediction",badge:"ԿԱՆԽԱՏԵՍՈՒՄ",title:"Ընտրիր քո պատասխանը",options:[{id:0,text:"Այո, հակառակ դեպքում նա չէր կարող ուղիղ 1 ժամում անցնել 60 կիլոմետրը։",isInsight:!1},{id:1,text:"Ոչ, նա երբեմն կանգնել է լուսացույցի տակ (0 կմ/ժ), երբեմն ընթացել 90 կմ/ժ-ով։ 60 կմ/ժ-ը նրա միջին արագությունն է։",isInsight:!0},{id:2,text:"Մեքենայի արագությունը միշտ եղել է 60-ից ցածր, իսկ վերջին վայրկյանին է հասել 60-ի։",isInsight:!1}]},{stepIndex:2,type:"experiment",badge:"ԻՆՏԵՐԱԿՏԻՎ ՓՈՐՁ",title:"Հավասարաչափ վազորդն ընդդեմ իրական մեքենայի",instruction:"Համեմատիր հաստատուն 5 մ/վ արագությամբ վազող մարզիկին և կարմիր լուսացույցի մոտ կանգնող մեքենային։ Ուսումնասիրի՛ր s-t (ճանապարհ-ժամանակ) և v-t (արագություն-ժամանակ) իրական գրաֆիկները։",widgetType:"speed-track"},{stepIndex:3,type:"observation",badge:"ԴԻՏԱՐԿՈՒՄ",title:"Ի՞նչ տեսար գրաֆիկներում",questions:["Երբ մեքենան կանգնած էր կարմիր լույսի տակ, ի՞նչ էր կատարվում s-t գրաֆիկի հետ (այն հորիզոնական հարթվե՞ց)։","Հավասարաչափ շարժման դեպքում s-t գրաֆիկը թեք ուղիղ գի՞ծ է։ Ինչի՞ հետ է կապված այդ թեքությունը։"]},{stepIndex:4,type:"explanation",badge:"ՖԻԶԻԿԱՅԻ ԳԱՂՏՆԻՔԸ",title:"Ակնթարթային արագություն vs Միջին ճանապարհային արագություն",content:`
          <p><strong>1. Ակնթարթային արագություն ($v$).</strong> Արագությունն է տվյալ կոնկրետ պահին (այն, ինչ ցույց է տալիս մեքենայի սպիդոմետրը)։ Մաթեմատիկորեն դա $s(t)$ գրաֆիկի շոշափողի թեքությունն է՝ $v = \\frac{ds}{dt}$։</p>
          <p><strong>2. Միջին արագություն ($v_{միջ}$).</strong> Ամբողջ անցած ճանապարհի հարաբերությունն է ամբողջ ծախսված ժամանակին՝</p>
          <div class="math-callout">$$v_{միջ} = \\frac{s_{ընդհանուր}}{t_{ընդհանուր}}$$</div>
          <p class="highlight-callout"><strong>ԿԱՐԵՎՈՐ ԶԳՈՒՇԱՑՈՒՄ.</strong> Միջին արագությունը սովորական արագությունների թվաբանական միջինը չէ՛։ Եթե դու 100 կմ գնաս 100 կմ/ժ-ով (1 ժամ), իսկ հետ գաս 50 կմ/ժ-ով (2 ժամ), քո միջին արագությունը կլինի ոչ թե 75, այլ $200 / 3 \\approx 66.7\\text{ կմ/ժ}$։</p>
        `},{stepIndex:5,type:"challenge",badge:"ԱՄՐԱՊՆԴՄԱՆ ՄԱՐՏԱՀՐԱՎԵՐ",title:"Ինքնաթիռի միջին արագության հաշվարկ",question:"Ինքնաթիռը առաջին 300 կմ-ը թռավ 300 կմ/ժ արագությամբ (1 ժամում), իսկ հաջորդ 300 կմ-ը՝ 600 կմ/ժ արագությամբ (0.5 ժամում)։ Որքա՞ն է նրա միջին արագությունը ամբողջ 600 կմ ճանապարհին։",options:[{id:0,text:"450 կմ/ժ (արագությունների կեսը)",correct:!1},{id:1,text:"400 կմ/ժ (ընդհանուր ճանապարհը բաժանած ընդհանուր ժամանակի վրա)",correct:!0},{id:2,text:"500 կմ/ժ",correct:!1},{id:3,text:"350 կմ/ժ",correct:!1}],hint:"Օգտվիր $v_{միջ} = s_{ընդ} / t_{ընդ}$ բանաձևից։ Ընդհանուր ճանապարհը $300 + 300 = 600\\text{ կմ}$ է։ Ընդհանուր ժամանակը՝ $1 + 0.5 = 1.5\\text{ ժամ}$։ Բաժանի՛ր 600-ը 1.5-ի վրա։",explanation:"Ճիշտ է։ $s_{ընդ} = 600\\text{ կմ}$, $t_{ընդ} = 1.5\\text{ ժ}$։ $v_{միջ} = 600 / 1.5 = 400\\text{ կմ/ժ}$։ Քանի որ դանդաղ արագությամբ ինքնաթիռը թռել է ավելի երկար ժամանակ (1 ժամ ընդդեմ 0.5 ժամի), միջին արագությունը ավելի մոտ է 300-ին, քան 600-ին։"},{stepIndex:6,type:"complete",badge:"🏆 ԴԱՍՆ ԱՎԱՐՏՎԱԾ Է",title:"Հիանալի է։ Դու տիրապետում ես արագության հաշվարկին",unlockedFormula:{symbol:"v = \\frac{s}{t} \\quad (v_{միջ} = \\frac{\\sum s}{\\sum t})",name:"Արագության հիմնական բանաձև",units:"Միավորը՝ մ/վ (մետր վայրկյանում), 1 մ/վ = 3.6 կմ/ժ"},summary:"Իսկ ի՞նչ է տեղի ունենում, երբ արագությունն ինքն է փոխվում վայրկյան առ վայրկյան։ Հաջորդ դասում կբացահայտենք արագացումը։"}]},"1.3":{id:"1.3",level:1,number:"1.3",title:"Արագացում. երբ արագությունն ինքն է փոխվում",subtitle:"Թեք հարթություն, Գալիլեյի կենտ թվերի կանոն (1:3:5) և արագացման մոդել",badge:"🎢 ՇԱՐԺՄԱՆ ԹԱՓ",xpReward:50,steps:[{stepIndex:0,type:"question",badge:"ՀԱՐՑ 3 / ՄՏԱԾԻ՛Ր",title:"Ինչպե՞ս է գնդակը գլորվում թեքությամբ",prompt:"Եթե գնդակը դադարի վիճակից բաց թողնես թեք տախտակի վրայով, արդյո՞ք այն յուրաքանչյուր հաջորդ վայրկյանին կանցնի նույնքան հեռավորություն։",detail:"Պատկերացրու՝ ինչպես ես սահնակով սահում սարից ցած։"},{stepIndex:1,type:"prediction",badge:"ԿԱՆԽԱՏԵՍՈՒՄ",title:"Ընտրիր քո կանխատեսումը",options:[{id:0,text:"Այո, որովհետև տախտակի թեքությունը հավասարաչափ է և չի փոխվում։",isInsight:!1},{id:1,text:"Ոչ, ամեն հաջորդ վայրկյանին այն կանցնի ավելի ու ավելի մեծ հեռավորություն, քանի որ նրա արագությունն աճում է։",isInsight:!0},{id:2,text:"Սկզբում շատ արագ կգլորվի, իսկ հետո կսկսի դանդաղել շփման պատճառով։",isInsight:!1}]},{stepIndex:2,type:"experiment",badge:"ԻՆՏԵՐԱԿՏԻՎ ՓՈՐՁ",title:"Գալիլեյի թեք հարթությունը և ստրոբոսկոպիկ հետքերը",instruction:"Փոխիր հարթության թեքության անկյունը (10°, 20°, 30°) և բաց թող գնդակը։ Ուշադրություն դարձրու ամեն 1 վայրկյանը մեկ թողած ստրոբոսկոպիկ կետերին և նրանց միջև հեռավորությունների հարաբերությանը։",widgetType:"acceleration-ramp"},{stepIndex:3,type:"observation",badge:"ԴԻՏԱՐԿՈՒՄ",title:"Ի՞նչ տեսար ստրոբոսկոպիկ նշաններում",questions:["Առաջին վայրկյանի անցած ճանապարհը համեմատած երկրորդ վայրկյանի ճանապարհի հետ ինչպիսի՞ն էր։","Հեռավորությունները համապատասխանո՞ւմ էին 1d, 3d, 5d, 7d հարաբերությանը։","Թեքության անկյունը մեծացնելիս արագացման չափը մեծացա՞վ։"]},{stepIndex:4,type:"explanation",badge:"ՖԻԶԻԿԱՅԻ ԳԱՂՏՆԻՔԸ",title:"Արագացումը արագության փոփոխման տեմպն է",content:`
          <p><strong>1. Ի՞նչ է արագացումը ($a$).</strong> Այն ցույց է տալիս, թե <em>որքանով է փոխվում արագությունը 1 վայրկյանում</em>։ Եթե ինքնաթիռի արագացումը $5\\text{ մ/վ}^2$ է, ապա յուրաքանչյուր վայրկյան նրա արագությունն ավելանում է $5\\text{ մ/վ}$-ով ($18\\text{ կմ/ժ}$-ով)։</p>
          <div class="math-callout">$$a = \\frac{v - v_0}{t}$$</div>
          <p><strong>2. Գալիլեյի կենտ թվերի հանճարեղ կանոնը.</strong> Գալիլեո Գալիլեյը 1604 թ.-ին ապացուցեց, որ հավասարաչափ արագացող մարմնի անցած ճանապարհները հաջորդական հավասար ժամանակամիջոցներում հարաբերում են ինչպես կենտ թվերը՝ <strong>$1 : 3 : 5 : 7 : 9...$</strong></p>
          <p>Ընդհանուր անցած ճանապարհը կախված է ժամանակի քառակուսուց՝ $s = \\frac{a t^2}{2}$։ Եթե ժամանակը կրկնապատկվում է, անցած ճանապարհը քառապատկվում է ($2^2 = 4$)։</p>
        `},{stepIndex:5,type:"challenge",badge:"ԱՄՐԱՊՆԴՄԱՆ ՄԱՐՏԱՀՐԱՎԵՐ",title:"Հաշվիր կործանիչի թռիչքային արագությունը",question:"Ռեակտիվ ինքնաթիռը թռիչքուղու վրա դադարի վիճակից արագանում է հաստատուն $4\\text{ մ/վ}^2$ արագացմամբ։ Որքա՞ն կլինի նրա արագությունը 5 վայրկյան անց։",options:[{id:0,text:"9 մ/վ (4 + 5)",correct:!1},{id:1,text:"20 մ/վ (4 × 5)",correct:!0},{id:2,text:"100 մ/վ",correct:!1},{id:3,text:"40 մ/վ",correct:!1}],hint:"Քանի որ սկզբնական արագությունը $0$ է, արագությունը հաշվվում է $v = a \\cdot t$ բանաձևով։ Բազմապատկի՛ր արագացումը (4) ժամանակով (5)։",explanation:"Կեցցե՛ս։ $v = a \\cdot t = 4\\text{ մ/վ}^2 \\times 5\\text{ վ} = 20\\text{ մ/վ}$ (որը հավասար է $72\\text{ կմ/ժ}$)։ Իսկ անցած ճանապարհը այդ 5 վայրկյանում կազմել է $s = \\frac{a t^2}{2} = \\frac{4 \\times 25}{2} = 50\\text{ մ}$։"},{stepIndex:6,type:"complete",badge:"🏆 ԴԱՍՆ ԱՎԱՐՏՎԱԾ Է",title:"Հիանալի առաջընթաց։ Դու հասկացար արագացման բնույթը",unlockedFormula:{symbol:"a = \\frac{\\Delta v}{\\Delta t}, \\quad s = v_0 t + \\frac{a t^2}{2}",name:"Հավասարաչափ արագացող շարժման օրենքներ",units:"Միավորը՝ մ/վ² (մետր վայրկյան քառակուսի)"},summary:"Հաջորդ հարցը. ի՞նչն է ստիպում մարմնին արագանալ կամ դանդաղել։ Պատասխանը ՈՒԺՆ է և ԶԱՆԳՎԱԾԸ։"}]},"1.4":{id:"1.4",level:1,number:"1.4",title:"Զանգված և իներցիա. ինչո՞ւ են ծանր մարմինները դժվարությամբ շարժվում",subtitle:"Շփումից զուրկ օդային ռելս, Նյուտոնի 1-ին և 2-րդ օրենքներ (F = m·a)",badge:"🏋️ ԻՆԵՐՑԻԱՅԻ ԳԱՂՏՆԻՔԸ",xpReward:50,steps:[{stepIndex:0,type:"question",badge:"ՀԱՐՑ 4 / ՄՏԱԾԻ՛Ր",title:"Ծանր սայլակն ընդդեմ թեթև սայլակի",prompt:"Եթե դատարկ սայլակին և ծանր ապրանքներով բարձած սայլակին հրես ճիշտ միևնույն ուժով, ո՞ր մեկն ավելի հեշտությամբ ու արագ կարագանա։",detail:"Պատկերացրու խանութի սայլակը՝ դատարկ և լիքը լցված վիճակում։"},{stepIndex:1,type:"prediction",badge:"ԿԱՆԽԱՏԵՍՈՒՄ",title:"Ընտրիր քո կանխատեսումը",options:[{id:0,text:"Երկուսն էլ կհավաքեն նույն արագացումը, որովհետև կիրառված հրող ուժը ճիշտ նույնն է։",isInsight:!1},{id:1,text:"Դատարկ (թեթև) սայլակը կհավաքի շատ ավելի մեծ արագացում, քանի որ նրա զանգվածը փոքր է։",isInsight:!0},{id:2,text:"Ծանր սայլակը ավելի արագ կընթանա, քանի որ մեծ քաշն ավելի շատ էներգիա է կուտակում։",isInsight:!1}]},{stepIndex:2,type:"experiment",badge:"ԻՆՏԵՐԱԿՏԻՎ ՓՈՐՁ",title:"Օդային բարձիկով ռելս (բացարձակ անշփում սեղան)",instruction:"Համեմատիր թեթև (1 կգ) և ծանր (5 կգ) սայլակները։ Երկուսի վրա էլ կիրառվում է հաստատուն 10 Ն քարշող ուժ։ Գործարկիր փորձը և չափիր արագացումները։",widgetType:"mass-inertia"},{stepIndex:3,type:"observation",badge:"ԴԻՏԱՐԿՈՒՄ",title:"Ի՞նչ ցույց տվեց փորձը",questions:["1 կգ սայլակի արագացումը քանի՞ մ/վ² էր (10 Ն / 1 կգ = 10 մ/վ²)։","5 կգ սայլակի արագացումը քանի՞ մ/վ² էր (10 Ն / 5 կգ = 2 մ/վ²)։","Քանի որ զանգվածը 5 անգամ մեծ էր, արագացումը ճիշտ 5 անգամ փոքրա՞վ։"]},{stepIndex:4,type:"explanation",badge:"ՖԻԶԻԿԱՅԻ ԳԱՂՏՆԻՔԸ",title:"Զանգվածը իներտության չափն է. Նյուտոնի 2-րդ օրենքը",content:`
          <p><strong>1. Իներցիա.</strong> Մարմնի հատկությունն է՝ պահպանելու իր դադարի կամ ուղղագիծ հավասարաչափ շարժման վիճակը, քանի դեռ արտաքին ուժը նրան չի ստիպել փոխել այն (Նյուտոնի 1-ին օրենք)։</p>
          <p><strong>2. Զանգված ($m$).</strong> Մարմնի իներտության քանակական չափն է։ Որքան մեծ է մարմնի զանգվածը, այնքան նա ավելի համառորեն է «դիմադրում» իր արագությունը փոխելուն։</p>
          <div class="math-callout">$$F = m \\cdot a \\implies a = \\frac{F}{m}$$</div>
          <p class="highlight-callout">Այս հիմնարար օրենքը բացատրում է, թե ինչու են ավիացիայում և տիեզերագնացության մեջ պայքարում յուրաքանչյուր ավելորդ գրամի դեմ։ Որքան թեթև է ինքնաթիռը կամ հրթիռը, նույն շարժիչի ուժի ($F$) դեպքում այն կստանա շատ ավելի մեծ արագացում ($a$)։</p>
        `},{stepIndex:5,type:"challenge",badge:"ԱՄՐԱՊՆԴՄԱՆ ՄԱՐՏԱՀՐԱՎԵՐ",title:"Տիեզերական իներցիայի ստուգում",question:"Տիեզերքում (լրիվ անկշռության և անօդ տարածության մեջ) տիեզերագնացը հրում է 10 կգ արբանյակը և 1000 կգ տիեզերանավը միևնույն 50 Ն ուժով։ Ի՞նչ կարելի է ասել նրանց արագացումների մասին։",options:[{id:0,text:"Երկուսն էլ կստանան միևնույն արագացումը, որովհետև տիեզերքում կշիռ չկա",correct:!1},{id:1,text:"10 կգ արբանյակը կստանա 5 մ/վ² արագացում, իսկ տիեզերանավը՝ 0.05 մ/վ² (100 անգամ պակաս)",correct:!0},{id:2,text:"Տիեզերանավն ընդհանրապես չի շարժվի, քանի որ շատ ծանր է",correct:!1},{id:3,text:"Երկուսն էլ ակնթարթորեն կշարժվեն լույսի արագությամբ",correct:!1}],hint:"Կշիռը և ձգողությունը կարող են բացակայել, բայց զանգվածն ու իներցիան մնում են անփոփոխ։ Օգտագործի՛ր $a = F / m$ բանաձևը երկուսի համար։",explanation:"Իրավացի՛ ես։ Թեև մարմինները տիեզերքում կշիռ չունեն, նրանց զանգվածը և իներցիան չեն վերանում։ Արբանյակը կստանա $a = 50 / 10 = 5\\text{ մ/վ}^2$, իսկ տիեզերանավը՝ $a = 50 / 1000 = 0.05\\text{ մ/վ}^2$ արագացում։"},{stepIndex:6,type:"complete",badge:"🏆 ԴԱՍՆ ԱՎԱՐՏՎԱԾ Է",title:"Հիանալի է։ Դու յուրացրիր դինամիկայի գլխավոր օրենքը",unlockedFormula:{symbol:"F = m \\cdot a \\iff a = \\frac{F}{m}",name:"Նյուտոնի 2-րդ օրենք (Դինամիկայի հիմնական օրենք)",units:"Ուժի միավորը՝ Նյուտոն (Ն / N = կգ·մ/վ²)"},summary:"Հիմա անցնենք բոլոր ժամանակների ամենահայտնի փորձին՝ ինչպե՞ս են մարմիններն ընկնում Երկրի ձգողության տակ։"}]},"1.5":{id:"1.5",level:1,number:"1.5",title:"Ծանրության ուժ և ազատ անկում. Գալիլեյի մեծ հայտնագործությունը",subtitle:"Պիզայի աշտարակ, վակուումային խցիկ, օդի դիմադրություն vs Ազատ անկում (g = 9.81 մ/վ²)",badge:"🌍 ՁԳՈՂՈՒԹՅԱՆ ՀԱՂԹԱՆԱԿԸ",xpReward:100,steps:[{stepIndex:0,type:"question",badge:"ՀԱՐՑ 5 / ՄՏԱԾԻ՛Ր",title:"Գո՞ւնդը, թե՞ փետուրը",prompt:"Եթե բարձրահարկ շենքի տանիքից միաժամանակ բաց թողնենք 5 կգ կշռող երկաթե գունդը և թեթև փետուրը, ո՞րը առաջինը կհասնի գետնին։ Իսկ ի՞նչ կլինի, եթե ամբողջ օդը դուրս քաշենք (վակուումում)։",detail:"Արիստոտելը 2000 տարի կարծում էր, որ ծանր մարմինները միշտ ավելի արագ են ընկնում։ Ճի՞շտ էր նա։"},{stepIndex:1,type:"prediction",badge:"ԿԱՆԽԱՏԵՍՈՒՄ",title:"Ընտրիր քո կանխատեսումը",options:[{id:0,text:"Երկաթե գունդը միշտ կընկնի առաջինը, որովհետև Երկիրը նրան ավելի մեծ ուժով է ձգում։",isInsight:!1},{id:1,text:"Օդում գունդը կընկնի շատ ավելի շուտ, բայց վակուումում երկուսն էլ կընկնեն ճիշտ միաժամանակ։",isInsight:!0},{id:2,text:"Վակուումում փետուրը կսավառնի դեպի վեր, իսկ գունդը կընկնի վար։",isInsight:!1}]},{stepIndex:2,type:"experiment",badge:"ԻՆՏԵՐԱԿՏԻՎ ՓՈՐՁ",title:"Գալիլեյի վակուումային աշտարակը",instruction:"Փորձիր երկու ռեժիմները՝ «Օդով լցված մթնոլորտ» և «Վակուում (Անօդ տարածություն)»։ Բաց թող 5 կգ երկաթե գունդն ու 0.005 կգ փետուրը։ Դանդաղեցրու ժամանակը դանդաղ կադրերի սահիչով և համեմատիր նրանց ընկնելու վայրկյանները։",widgetType:"galileo-drop"},{stepIndex:3,type:"observation",badge:"ԴԻՏԱՐԿՈՒՄ",title:"Ի՞նչ ցույց տվեց վակուումային խցիկը",questions:["Օդի առկայությամբ փետուրը ինչո՞ւ էր դանդաղ սավառնում (օդի աերոդինամիկ դիմադրությո՞ւնն էր նրան պահում)։","Երբ օդը հեռացվեց, փետուրը և երկաթե գունդը կողք-կողքի՞ ընկան։","Նրանց երկուսի արագացումն էլ հավասարվե՞ց 9.81 մ/վ²-ի։"]},{stepIndex:4,type:"explanation",badge:"ՖԻԶԻԿԱՅԻ ԳԱՂՏՆԻՔԸ",title:"Ինչո՞ւ են բոլոր մարմինները վակուումում ընկնում նույն արագացմամբ",content:`
          <p>Այս հարցը պատմության ամենահիասքանչ մտավոր հայտնագործություններից է։ Ինչո՞ւ 1000 անգամ ծանր գունդը վակուումում չի ընկնում 1000 անգամ ավելի արագ.</p>
          <ol>
            <li>Այո՛, Երկիրը գնդին ձգում է 1000 անգամ ավելի մեծ ծանրության ուժով՝ $F_{ծ} = m \\cdot g$։</li>
            <li>Բայց գունդն ունի նաև 1000 անգամ ավելի մեծ զանգված և հետևաբար <strong>1000 անգամ ավելի մեծ իներցիա</strong> (նա 1000 անգամ ավելի շատ է դիմադրում շարժվելուն)։</li>
          </ol>
          <div class="math-callout">$$a = \\frac{F}{m} = \\frac{m \\cdot g}{m} = g \\approx 9.81\\text{ մ/վ}^2$$</div>
          <p class="highlight-callout"><strong>Զանգվածը ($m$) կրճատվում է։</strong> Բոլոր մարմինները Երկրի վրա վակուումում ընկնում են ճիշտ միևնույն $g = 9.81\\text{ մ/վ}^2$ ազատ անկման արագացմամբ։ Միայն օդի աերոդինամիկ դիմադրությունն է, որ դանդաղեցնում է փետուրին, պարաշյուտին կամ թղթին։ Եվ հենց այդ դիմադրությունն ու վերամբարձ ուժն էլ թույլ են տալիս ինքնաթիռներին թռչել։</p>
        `},{stepIndex:5,type:"challenge",badge:"ԱՄՐԱՊՆԴՄԱՆ ՄԱՐՏԱՀՐԱՎԵՐ",title:"Ապոլոն 15 առաքելությունը Լուսնի վրա",question:"1971 թ.-ին տիեզերագնաց Դեյվիդ Սքոթը Լուսնի վրա (որտեղ օդ չկա) միաժամանակ բաց թողեց 1.32 կգ կշռող ալյումինե մուրճը և 0.03 կգ բազեի փետուրը։ Ի՞նչ տեղի ունեցավ իրականում։",options:[{id:0,text:"Մուրճը հասավ Լուսնի մակերևույթին շատ ավելի շուտ, քանի որ 44 անգամ ավելի ծանր էր",correct:!1},{id:1,text:"Փետուրը մնաց օդում կախված, քանի որ քաշ չուներ",correct:!1},{id:2,text:"Երկուսն էլ ընկան ճիշտ միաժամանակ՝ ապացուցելով Գալիլեյի տեսությունը",correct:!0},{id:3,text:"Փետուրը հասավ ավելի շուտ, որովհետև ավելի փոքր էր",correct:!1}],hint:"Լուսնի վրա մթնոլորտ չկա։ Ոչ մի օդ չի խանգարում փետուրին։ Ինչպե՞ս պետք է ընկնեն մարմինները վակուումում։",explanation:"Հիանալի՛ է։ Ողջ աշխարհը հեռուստացույցով տեսավ, թե ինչպես մուրճն ու փետուրը միասին հարվածեցին Լուսնի փոշուն։ Դա ֆիզիկայի պատմության ամենահայտնի փորձն էր։"},{stepIndex:6,type:"complete",badge:"🎖️ ՄԱԿԱՐԴԱԿ 1-Ի ԳԱԳԱԹՆԱԿԵՏ",title:"Շնորհավորո՛ւմ ենք։ Դու ավարտեցիր Մակարդակ 1-ը",unlockedFormula:{symbol:"F_g = m \\cdot g, \\quad g = 9.81\\text{ մ/վ}^2",name:"Ծանրության ուժ և ազատ անկման արագացում",units:"g = 9.81 մ/վ² (Լուսնի վրա՝ 1.62 մ/վ²)"},summary:"Դու անցար ճանապարհը զրոյից՝ շարժման հարաբերականությունից մինչև ազատ անկում։ Այժմ դու պատրաստ ես ուսումնասիրելու թռիչքի ամենակարևոր տարրը՝ ՕԴԸ և ԱԵՐՈԴԻՆԱՄԻԿԱՆ։"}]}},$l={title:"Տնային Անվտանգ Ինժեներիա. Թղթե Սավառնակի Կայունություն և Ծանրության Կենտրոն",badge:"🛠️ 100% ԱՆՎՏԱՆԳ DIY ՆԱԽԱԳԻԾ",difficulty:"Սկսնակ",durationMin:20,materials:[{id:"paper",name:"1 հատ սովորական A4 թուղթ (80 գ/մ²)",icon:"📄"},{id:"clip",name:"2-3 հատ փոքր մետաղյա ամրակ (скрепка)",icon:"📎"},{id:"ruler",name:"Քանոն և մատիտ",icon:"📏"},{id:"tape",name:"Փոքր կպչուն ժապավեն (սկոչ)",icon:"🩹"}],safetyWarning:"Այս փորձը լիովին անվտանգ է, չի պարունակում այրվող, ճնշման տակ գտնվող կամ վտանգավոր նյութեր։ Թեստային նետումները կատարել ազատ տարածքում՝ ոչ մարդկանց ուղղությամբ։",steps:[{step:1,title:"Ծալիր դասական սավառնակը",instruction:"A4 թուղթը ծալիր երկայնքով մեջտեղից։ Բացիր և վերևի երկու անկյունները ծալիր դեպի կենտրոնական գիծը՝ ստանալով սուր եռանկյունի։"},{step:2,title:"Թևերի ձևավորում",instruction:"Եռանկյունու ծայրը ծալիր վար, ապա նորից կողերը ծալիր կենտրոն։ Կիսիր երկայնքով և ծալիր թևերը այնպես, որ թևի հարթությունը լինի լայն (ոչ թե նեղ կործանիչի նման)։"},{step:3,title:"Գտիր ծանրության կենտրոնը (CoM - Center of Mass)",instruction:"Տեղադրիր սավառնակի կորպուսը քո ցուցամատի ծայրին։ Գտի՛ր այն կետը, որտեղ սավառնակը մնում է հորիզոնական հավասարակշռված՝ առանց առաջ կամ հետ ընկնելու։ Նշիր այդ կետը մատիտով։"},{step:4,title:"Ախտորոշիչ փորձարկում #1. Առանց բեռի նետում",instruction:"Թեթև հորիզոնական հրումով բաց թող սավառնակը։ Եթե այն անմիջապես քիթը բարձրացնում է վեր, կորցնում արագությունը և գահավիժում հետ (stall), նշանակում է՝ ծանրության կենտրոնը չափազանց հետ է։"},{step:5,title:"Հավասարակշռում ամրակով (Trimming)",instruction:"Ամրացրու 1 ամրակ սավառնակի քթի հատվածում։ Կրկին ստուգիր ծանրության կենտրոնը (այն տեղաշարժվել է դեպի առաջ)։ Նորից նետիր. այժմ սավառնակը կկատարի երկար, հարթ և կայուն սահող թռիչք։"},{step:6,title:"Բարձրության ղեկերի կարգավորում (Elevators)",instruction:"Թևերի հետևի եզրերին մկրատով արա 5 մմ երկու փոքր կտրվածք և թեթևակի ծալիր դեպի վեր (1-2 մմ)։ Դիտարկիր, թե ինչպես է օդի հոսքը ճնշում այդ հատվածին և բարձրացնում քիթը՝ հարթեցնելով հետագիծը։"}],engineeringTakeaway:"Բոլոր իսկական ինքնաթիռներում ծանրության կենտրոնը (CoM) պետք է գտնվի աերոդինամիկ կենտրոնից (CoL - Center of Lift) թեթևակի առաջ, որպեսզի թռիչքը լինի բնականոն կայուն։"};function Dt(e){e.aerolabLearning||(e.aerolabLearning={activeMode:"path",currentLessonId:null,activeStep:0,userPrediction:null,challengeSelected:null,challengeSubmitted:!1,showHint:!1,xp:0,streak:1,completedLessons:[],lessonScores:{},diyProgress:{materialsChecked:[],stepsCompleted:[]}});const t=e.aerolabLearning;return t.completedLessons||=[],t.lessonScores||={},t.diyProgress||={materialsChecked:[],stepsCompleted:[]},t.diyProgress.materialsChecked||=[],t.diyProgress.stepsCompleted||=[],t.xp||=0,t.streak=Math.max(1,t.streak||1),t}function Gn(e,t){if(t==="1.1")return!0;const s=(parseFloat(t)-.1).toFixed(1);return e.completedLessons.includes(s)}function wl(e,t,a=50){const s=Dt(e);s.completedLessons.includes(t)||(s.completedLessons.push(t),s.xp+=a,s.lessonScores[t]={completedAt:new Date().toISOString(),xp:a})}function kl(e,t){const a=Dt(e),s=a.diyProgress.stepsCompleted.indexOf(t);s>=0?a.diyProgress.stepsCompleted.splice(s,1):a.diyProgress.stepsCompleted.push(t)}function Ml(e,t){const a=Dt(e),s=a.diyProgress.materialsChecked.indexOf(t);s>=0?a.diyProgress.materialsChecked.splice(s,1):a.diyProgress.materialsChecked.push(t)}const te=(e,t=1)=>Number(e.toFixed(t)).toLocaleString("hy-AM");function Sl(e,t){return e?(e.innerHTML="",t==="relative-motion"?Cl(e):t==="speed-track"?Al(e):t==="acceleration-ramp"?ql(e):t==="mass-inertia"?Il(e):t==="galileo-drop"?El(e):(e.innerHTML='<p class="muted">Սիմուլյատորը հասանելի չէ։</p>',()=>{})):()=>{}}function Cl(e){let t="frame",a="platform",s=!1,n=100,i=0,r=0,o=null,c=performance.now();const l=document.createElement("div");l.className="aero-widget-box",l.innerHTML=`
    <div class="aero-widget-header">
      <div class="aero-mode-pills" role="tablist">
        <button class="aero-pill-btn active" data-submode="frame">🚂 Հաշվարկման համակարգ (Գնացք)</button>
        <button class="aero-pill-btn" data-submode="lap">🏃 Շրջանաձև վազքուղի (s vs Δr)</button>
      </div>
      <div class="aero-widget-actions">
        <button class="aero-icon-btn" id="btn-play-pause" title="Միացնել/Դադարեցնել">▶️ Սկսել</button>
        <button class="aero-icon-btn" id="btn-reset" title="Վերականգնել">🔄 Վերականգնել</button>
      </div>
    </div>

    <div class="aero-widget-viewport">
      <canvas id="cv-relative" width="700" height="320" style="width:100%; height:auto; display:block; background:#0b1329; border-radius:12px;"></canvas>
    </div>

    <div class="aero-widget-controls" id="controls-frame">
      <div class="aero-control-row">
        <label>Դիտորդի տեսանկյուն (Հաշվարկման մարմին)՝</label>
        <div class="btn-group">
          <button class="aero-toggle-btn active" id="btn-obs-plat">🏢 Կառամատույցի դիտորդ (Անշարժ կայարան)</button>
          <button class="aero-toggle-btn" id="btn-obs-train">💺 Վագոնի ուղևոր (Նստած գնացքում)</button>
        </div>
      </div>
      <div class="aero-telemetry-badge" id="telemetry-frame">
        <span>Գնացքի արագություն՝ <strong>72 կմ/ժ (20 մ/վ)</strong></span>
        <span>Ուղևորի արագություն դիտորդի նկատմամբ՝ <strong id="val-passenger-v">20 մ/վ</strong></span>
      </div>
    </div>

    <div class="aero-widget-controls" id="controls-lap" style="display:none;">
      <div class="aero-telemetry-grid">
        <div class="aero-stat-card">
          <span class="aero-stat-label">Անցած ճանապարհ (s)</span>
          <span class="aero-stat-value" id="val-lap-s" style="color:#58cc02;">0 մ</span>
          <span class="aero-stat-hint">Հետագծի լրիվ երկարությունը</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Տեղափոխության մոդուլ (|Δr|)</span>
          <span class="aero-stat-value" id="val-lap-dr" style="color:#1cb0f6;">0 մ</span>
          <span class="aero-stat-hint">Ուղիղ վեկտորը սկզբից դեպի վերջ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Լրիվ պտույտներ</span>
          <span class="aero-stat-value" id="val-lap-count" style="color:#ffc800;">0</span>
          <span class="aero-stat-hint">400 մ շրջագիծ</span>
        </div>
      </div>
    </div>
  `,e.appendChild(l);const u=l.querySelector("#cv-relative"),p=u.getContext("2d"),y=l.querySelector("#btn-play-pause"),h=l.querySelector("#btn-reset"),v=l.querySelector("#btn-obs-plat"),g=l.querySelector("#btn-obs-train"),m=l.querySelector("#val-passenger-v"),d=l.querySelector("#controls-frame"),f=l.querySelector("#controls-lap"),x=l.querySelector("#val-lap-s"),b=l.querySelector("#val-lap-dr"),w=l.querySelector("#val-lap-count");function $(){if(p.clearRect(0,0,u.width,u.height),t==="frame"){const M=p.createLinearGradient(0,0,0,220);M.addColorStop(0,"#0d1b38"),M.addColorStop(1,"#1b3260"),p.fillStyle=M,p.fillRect(0,0,u.width,220),p.fillStyle="#222938",p.fillRect(0,220,u.width,100),p.strokeStyle="#4a5568",p.lineWidth=4,p.beginPath(),p.moveTo(0,260),p.lineTo(u.width,260),p.stroke();const q=a==="platform"?0:-n%700;p.save(),p.translate(q,0),p.fillStyle="#2b6cb0",p.fillRect(80,160,110,32),p.strokeStyle="#63b3ed",p.strokeRect(80,160,110,32),p.fillStyle="#fff",p.font="bold 13px sans-serif",p.fillText("🏢 ԵՐԵՎԱՆ",95,182),p.fillStyle="#718096",p.fillRect(130,192,10,30);for(let T=0;T<6;T++){const V=250+T*160;p.fillStyle="#2d3748",p.fillRect(V+12,175,8,45),p.fillStyle="#22543d",p.beginPath(),p.arc(V+16,165,24,0,Math.PI*2),p.fill()}p.restore();const I=a==="platform"?n%(u.width+300)-200:220;p.save(),p.fillStyle="#3182ce",p.strokeStyle="#63b3ed",p.lineWidth=2,p.beginPath(),p.roundRect(I,160,260,95,10),p.fill(),p.stroke(),p.fillStyle="#e2e8f0";for(let T=0;T<3;T++)p.fillRect(I+25+T*75,175,55,38),p.strokeStyle="#2b6cb0",p.strokeRect(I+25+T*75,175,55,38);p.fillStyle="#1a202c";for(let T=0;T<4;T++)p.beginPath(),p.arc(I+35+T*60,260,14,0,Math.PI*2),p.fill(),p.strokeStyle="#a0aec0",p.lineWidth=3,p.stroke();const L=I+127,E=195;p.fillStyle="#f6ad55",p.beginPath(),p.arc(L,E,8,0,Math.PI*2),p.fill(),p.fillStyle="#e53e3e",p.fillRect(L-7,E+8,14,12),p.fillStyle="#fefcbf",p.fillRect(L-4,E+12,10,6),p.font="12px sans-serif",a==="platform"?(p.fillStyle="#48bb78",p.beginPath(),p.arc(60,225,10,0,Math.PI*2),p.fill(),p.fillStyle="#fff",p.fillText("👀 Դու (Կառամատույց)",20,255),m.textContent="20 մ/վ (սլանում է)",m.style.color="#e53e3e"):(p.fillStyle="#fff",p.fillText("👀 Դու (Վագոնում նստած ես)",L-60,150),m.textContent="0 մ/վ (լրիվ անշարժ)",m.style.color="#48bb78"),p.restore()}else{p.fillStyle="#0a1020",p.fillRect(0,0,u.width,u.height);const M=350,q=160,I=230,L=95;p.strokeStyle="#2d3748",p.lineWidth=36,p.beginPath(),p.ellipse(M,q,I,L,0,0,Math.PI*2),p.stroke(),p.strokeStyle="#c53030",p.lineWidth=26,p.stroke(),p.strokeStyle="#fed7d7",p.setLineDash([8,8]),p.lineWidth=2,p.stroke(),p.setLineDash([]);const E=M+I,T=q;p.strokeStyle="#fff",p.lineWidth=4,p.beginPath(),p.moveTo(E-14,T),p.lineTo(E+14,T),p.stroke(),p.fillStyle="#fff",p.font="bold 12px sans-serif",p.fillText("ՍԿԻԶԲ / START",E-45,T+28);const V=M+I*Math.cos(i),D=q+L*Math.sin(i);p.strokeStyle="#00f2fe",p.lineWidth=3,p.beginPath(),p.moveTo(E,T),p.lineTo(V,D),p.stroke();const Z=Math.atan2(D-T,V-E);p.fillStyle="#00f2fe",p.beginPath(),p.moveTo(V,D),p.lineTo(V-10*Math.cos(Z-Math.PI/6),D-10*Math.sin(Z-Math.PI/6)),p.lineTo(V-10*Math.cos(Z+Math.PI/6),D-10*Math.sin(Z+Math.PI/6)),p.fill(),p.fillStyle="#ffc800",p.beginPath(),p.arc(V,D,10,0,Math.PI*2),p.fill(),p.strokeStyle="#fff",p.lineWidth=2,p.stroke();const A=V-E,F=D-T,O=Math.hypot(A,F)/(I*2)*127.3;x.textContent=`${te(r,1)} մ`,b.textContent=`${te(O,1)} մ`,w.textContent=`${Math.floor(r/400)}`}}function k(M){const q=Math.min((M-c)/1e3,.1);c=M,s&&(t==="frame"?n+=160*q:(i+=.85*q,r+=400/(2*Math.PI)*.85*q),$()),o=requestAnimationFrame(k)}return y.onclick=()=>{s=!s,y.textContent=s?"⏸️ Դադար":"▶️ Սկսել",B("tap")},h.onclick=()=>{s=!1,y.textContent="▶️ Սկսել",n=100,i=0,r=0,B("control"),$()},l.querySelectorAll("[data-submode]").forEach(M=>{M.onclick=()=>{l.querySelectorAll("[data-submode]").forEach(q=>q.classList.remove("active")),M.classList.add("active"),t=M.dataset.submode,t==="frame"?(d.style.display="block",f.style.display="none"):(d.style.display="none",f.style.display="block"),B("control"),$()}}),v.onclick=()=>{a="platform",v.classList.add("active"),g.classList.remove("active"),B("control"),$()},g.onclick=()=>{a="train",g.classList.add("active"),v.classList.remove("active"),B("control"),$()},$(),o=requestAnimationFrame(k),()=>{cancelAnimationFrame(o)}}function Al(e){let t=!1,a=0,s=null,n=performance.now(),i=0,r=0,o=0;const c=document.createElement("div");c.className="aero-widget-box",c.innerHTML=`
    <div class="aero-widget-header">
      <div class="aero-badge-pill">⏱️ ՃԱՆԱՊԱՐՀ ԵՎ ԱՐԱԳՈՒԹՅՈՒՆ (s-t & v-t)</div>
      <div class="aero-widget-actions">
        <button class="aero-icon-btn" id="btn-speed-play">▶️ Գործարկել</button>
        <button class="aero-icon-btn" id="btn-speed-reset">🔄 Սկզբնակետ</button>
      </div>
    </div>

    <div class="aero-widget-viewport">
      <canvas id="cv-speed" width="700" height="320" style="width:100%; height:auto; display:block; background:#0f172a; border-radius:12px;"></canvas>
    </div>

    <div class="aero-widget-controls">
      <div class="aero-telemetry-grid">
        <div class="aero-stat-card">
          <span class="aero-stat-label">Ժամանակ (t)</span>
          <span class="aero-stat-value" id="val-time" style="color:#ffc800;">0.0 վ</span>
          <span class="aero-stat-hint">Փորձի տևողությունը</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Վազորդ (Հավասարաչափ)</span>
          <span class="aero-stat-value" id="val-runner-stat" style="color:#58cc02;">v = 5.0 մ/վ</span>
          <span class="aero-stat-hint" id="val-runner-s">s = 0.0 մ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Մեքենա (Անհավասարաչափ)</span>
          <span class="aero-stat-value" id="val-car-stat" style="color:#1cb0f6;">v = 0.0 մ/վ</span>
          <span class="aero-stat-hint" id="val-car-avg">v_միջ = 0.0 մ/վ</span>
        </div>
      </div>
      <div class="aero-graph-legend">
        <span><strong style="color:#58cc02;">— Վազորդ՝</strong> հաստատուն 5 մ/վ (ուղիղ թեք գիծ s-t գրաֆիկում)</span>
        <span><strong style="color:#1cb0f6;">— Մեքենա՝</strong> արագացում, կանգառ լուսացույցի տակ (հորիզոնական հարթ հատված), ապա սլացք</span>
      </div>
    </div>
  `,e.appendChild(c);const l=c.querySelector("#cv-speed"),u=l.getContext("2d"),p=c.querySelector("#btn-speed-play"),y=c.querySelector("#btn-speed-reset"),h=c.querySelector("#val-time"),v=c.querySelector("#val-runner-stat"),g=c.querySelector("#val-runner-s"),m=c.querySelector("#val-car-stat"),d=c.querySelector("#val-car-avg"),f=[];function x($){if($<4)return{v:3.75*$,s:.5*3.75*$*$};if($<8)return{v:15,s:30+15*($-4)};if($<11){const M=$-8;return{v:Math.max(0,15-5*M),s:90+15*M-.5*5*M*M}}else{if($<16)return{v:0,s:112.5};{const M=$-16,q=4.5;return{v:Math.min(25,q*M),s:112.5+.5*q*Math.min(M,25/q)**2+(M>25/q?25*(M-25/q):0)}}}}function b(){u.clearRect(0,0,l.width,l.height),u.fillStyle="#1e293b",u.fillRect(0,0,l.width,150),u.fillStyle="#27272a",u.fillRect(0,15,l.width,50),u.fillStyle="#fff",u.font="10px sans-serif",u.fillText("🏃 ՎԱԶՈՒՂԻ (v = 5 մ/վ const)",10,28),u.fillStyle="#18181b",u.fillRect(0,75,l.width,65),u.fillStyle="#fff",u.fillText("🚗 ԱՎՏՈՄԱՅՐՈՒՂԻ (Լուսացույցով)",10,88),u.strokeStyle="#e4e4e7",u.lineWidth=2,u.setLineDash([12,12]),u.beginPath(),u.moveTo(0,110),u.lineTo(l.width,110),u.stroke(),u.setLineDash([]);const $=380;u.fillStyle="#09090b",u.fillRect($-10,50,20,40);const k=a>=8&&a<16;u.fillStyle=k?"#ef4444":"#27272a",u.beginPath(),u.arc($,60,6,0,Math.PI*2),u.fill(),u.fillStyle=k?"#27272a":"#22c55e",u.beginPath(),u.arc($,78,6,0,Math.PI*2),u.fill();const M=(l.width-80)/300,q=Math.min(l.width-30,40+i*M),I=Math.min(l.width-30,40+r*M);if(u.fillStyle="#58cc02",u.beginPath(),u.arc(q,45,12,0,Math.PI*2),u.fill(),u.fillStyle="#fff",u.font="bold 12px sans-serif",u.fillText("🏃",q-8,49),u.fillStyle="#1cb0f6",u.beginPath(),u.roundRect(I-18,100,36,18,4),u.fill(),u.fillStyle="#fff",u.fillText("🚗",I-8,114),u.fillStyle="#090d16",u.fillRect(0,155,l.width,165),u.strokeStyle="#334155",u.lineWidth=1.5,u.beginPath(),u.moveTo(50,165),u.lineTo(50,305),u.lineTo(l.width-20,305),u.stroke(),u.fillStyle="#94a3b8",u.font="11px sans-serif",u.fillText("s (մ)",15,175),u.fillText("t (վ)",l.width-35,318),f.length>1){const T=l.width-80,V=125;u.strokeStyle="#58cc02",u.lineWidth=2.5,u.beginPath(),f.forEach((D,Z)=>{const A=50+D.t/25*T,F=305-D.sRunner/250*V;Z===0?u.moveTo(A,F):u.lineTo(A,F)}),u.stroke(),u.strokeStyle="#1cb0f6",u.lineWidth=2.5,u.beginPath(),f.forEach((D,Z)=>{const A=50+D.t/25*T,F=305-D.sCar/250*V;Z===0?u.moveTo(A,F):u.lineTo(A,F)}),u.stroke()}}function w($){const k=Math.min(($-n)/1e3,.1);if(n=$,t&&a<25){a+=k,i=5*a;const M=x(a);r=M.s,o=M.v,f.push({t:a,sRunner:i,sCar:r,vRunner:5,vCar:o}),h.textContent=`${te(a,1)} վ`,v.textContent=`v = 5.0 մ/վ (${te(5*3.6,0)} կմ/ժ)`,g.textContent=`s = ${te(i,1)} մ`,m.textContent=`v = ${te(o,1)} մ/վ (${te(o*3.6,0)} կմ/ժ)`;const q=a>0?r/a:0;d.textContent=`v_միջ = ${te(q,1)} մ/վ (${te(q*3.6,0)} կմ/ժ)`,b()}s=requestAnimationFrame(w)}return p.onclick=()=>{t=!t,p.textContent=t?"⏸️ Դադար":"▶️ Գործարկել",B("tap")},y.onclick=()=>{t=!1,a=0,i=0,r=0,o=0,f.length=0,p.textContent="▶️ Գործարկել",h.textContent="0.0 վ",v.textContent="v = 5.0 մ/վ",g.textContent="s = 0.0 մ",m.textContent="v = 0.0 մ/վ",d.textContent="v_միջ = 0.0 մ/վ",B("control"),b()},b(),s=requestAnimationFrame(w),()=>{cancelAnimationFrame(s)}}function ql(e){let t=20,a=!1,s=0,n=null,i=performance.now();const r=[],o=document.createElement("div");o.className="aero-widget-box",o.innerHTML=`
    <div class="aero-widget-header">
      <div class="aero-badge-pill">🎢 ԳԱԼԻԼԵՅԻ ԹԵՔ ՀԱՐԹՈՒԹՅՈՒՆ ԵՎ ԱՐԱԳԱՑՈՒՄ</div>
      <div class="aero-widget-actions">
        <button class="aero-icon-btn" id="btn-ramp-play">▶️ Բաց թողնել գունդը</button>
        <button class="aero-icon-btn" id="btn-ramp-reset">🔄 Սկզբնակետ</button>
      </div>
    </div>

    <div class="aero-widget-viewport">
      <canvas id="cv-ramp" width="700" height="320" style="width:100%; height:auto; display:block; background:#0b1329; border-radius:12px;"></canvas>
    </div>

    <div class="aero-widget-controls">
      <div class="aero-control-row">
        <label>Հարթության թեքության անկյունը (θ)՝ <strong id="lbl-angle">20°</strong></label>
        <input type="range" id="rng-angle" min="10" max="40" step="5" value="20" style="flex:1; max-width:240px;" />
      </div>
      <div class="aero-telemetry-grid">
        <div class="aero-stat-card">
          <span class="aero-stat-label">Արագացում (a = g·sin θ)</span>
          <span class="aero-stat-value" id="val-ramp-a" style="color:#ffc800;">3.35 մ/վ²</span>
          <span class="aero-stat-hint">Հաստատուն թափ հարթությամբ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Ակնթարթային արագություն (v)</span>
          <span class="aero-stat-value" id="val-ramp-v" style="color:#1cb0f6;">0.0 մ/վ</span>
          <span class="aero-stat-hint" id="val-ramp-kmh">0.0 կմ/ժ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Անցած ճանապարհ (s)</span>
          <span class="aero-stat-value" id="val-ramp-s" style="color:#58cc02;">0.0 մ</span>
          <span class="aero-stat-hint">s = a·t² / 2</span>
        </div>
      </div>
      <div class="aero-strobe-legend">
        💡 <strong>Գալիլեյի կենտ թվերի օրենքը.</strong> Յուրաքանչյուր 1 վայրկյանում անցած ճանապարհների հարաբերությունն է <strong>1d : 3d : 5d : 7d...</strong>
      </div>
    </div>
  `,e.appendChild(o);const c=o.querySelector("#cv-ramp"),l=c.getContext("2d"),u=o.querySelector("#btn-ramp-play"),p=o.querySelector("#btn-ramp-reset"),y=o.querySelector("#rng-angle"),h=o.querySelector("#lbl-angle"),v=o.querySelector("#val-ramp-a"),g=o.querySelector("#val-ramp-v"),m=o.querySelector("#val-ramp-kmh"),d=o.querySelector("#val-ramp-s");function f(){return 9.81*Math.sin(t*Math.PI/180)}function x(){l.clearRect(0,0,c.width,c.height);const $=60,k=70,M=580,q=t*Math.PI/180,I=$+M*Math.cos(q),L=k+M*Math.sin(q);l.fillStyle="#1e293b",l.beginPath(),l.moveTo($,k),l.lineTo(I,L),l.lineTo($,L),l.closePath(),l.fill(),l.strokeStyle="#475569",l.lineWidth=8,l.beginPath(),l.moveTo($-10,k-2),l.lineTo(I+10,L+2),l.stroke(),l.strokeStyle="#ffc800",l.lineWidth=2,l.beginPath(),l.arc($,L,60,-q,0),l.stroke(),l.fillStyle="#ffc800",l.font="12px sans-serif",l.fillText(`θ = ${t}°`,$+70,L-10),r.forEach(F=>{l.fillStyle="#00f2fe",l.beginPath(),l.arc(F.x,F.y,6,0,Math.PI*2),l.fill(),l.fillStyle="#fff",l.font="bold 11px sans-serif",l.fillText(F.label,F.x-10,F.y-12)});const E=f(),T=.5*E*s*s,V=Math.min(M,T*22),D=$+V*Math.cos(q)-14*Math.sin(q),Z=k+V*Math.sin(q)-14*Math.cos(q);l.fillStyle="#ef4444",l.beginPath(),l.arc(D,Z,14,0,Math.PI*2),l.fill(),l.strokeStyle="#fff",l.lineWidth=2,l.stroke();const A=E*s;if(A>.1){const F=Math.min(60,A*3.5),j=D+F*Math.cos(q),O=Z+F*Math.sin(q);l.strokeStyle="#22c55e",l.lineWidth=3,l.beginPath(),l.moveTo(D,Z),l.lineTo(j,O),l.stroke()}}let b=1;function w($){const k=Math.min(($-i)/1e3,.1);if(i=$,a){s+=k;const M=f(),q=.5*M*s*s,I=M*s;if(s>=b&&q*22<550){const L=t*Math.PI/180,E=q*22,T=60+E*Math.cos(L),V=70+E*Math.sin(L),D=Math.floor(b),Z=2*D-1;r.push({x:T,y:V,t:b,label:`${D}վ (${Z}d)`}),b+=1,B("tap")}g.textContent=`${te(I,1)} մ/վ`,m.textContent=`${te(I*3.6,1)} կմ/ժ`,d.textContent=`${te(q,1)} մ`,q*22>=580&&(a=!1,u.textContent="▶️ Բաց թողնել գունդը"),x()}n=requestAnimationFrame(w)}return y.oninput=()=>{t=Number(y.value),h.textContent=`${t}°`,v.textContent=`${te(f(),2)} մ/վ²`,x()},u.onclick=()=>{a=!a,u.textContent=a?"⏸️ Դադար":"▶️ Բաց թողնել գունդը",B("tap")},p.onclick=()=>{a=!1,s=0,b=1,r.length=0,u.textContent="▶️ Բաց թողնել գունդը",g.textContent="0.0 մ/վ",m.textContent="0.0 կմ/ժ",d.textContent="0.0 մ",B("control"),x()},v.textContent=`${te(f(),2)} մ/վ²`,x(),n=requestAnimationFrame(w),()=>{cancelAnimationFrame(n)}}function Il(e){let t=1,a=5,s=10,n=!1,i=0,r=null,o=performance.now();const c=document.createElement("div");c.className="aero-widget-box",c.innerHTML=`
    <div class="aero-widget-header">
      <div class="aero-badge-pill">🏋️ ՕԴԱՅԻՆ ՌԵԼՍ ԵՎ ԻՆԵՐՑԻԱ (F = m·a)</div>
      <div class="aero-widget-actions">
        <button class="aero-icon-btn" id="btn-inertia-play">▶️ Կիրառել ուժը</button>
        <button class="aero-icon-btn" id="btn-inertia-reset">🔄 Սկզբնակետ</button>
      </div>
    </div>

    <div class="aero-widget-viewport">
      <canvas id="cv-inertia" width="700" height="320" style="width:100%; height:auto; display:block; background:#0b1329; border-radius:12px;"></canvas>
    </div>

    <div class="aero-widget-controls">
      <div class="aero-control-row">
        <label>Կիրառվող քարշող ուժը (F)՝ <strong id="lbl-force">10 Ն</strong></label>
        <input type="range" id="rng-force" min="5" max="25" step="5" value="10" style="flex:1; max-width:200px;" />
        <label style="margin-left:16px;">Ծանր սայլակի զանգվածը (m₂)՝</label>
        <select id="sel-mass2" class="aero-select" style="padding:4px 8px; border-radius:6px; background:#1e293b; color:#fff; border:1px solid #475569;">
          <option value="2">2 կգ</option>
          <option value="5" selected>5 կգ (5x ավելի ծանր)</option>
          <option value="10">10 կգ (10x ավելի ծանր)</option>
        </select>
      </div>
      <div class="aero-telemetry-grid">
        <div class="aero-stat-card">
          <span class="aero-stat-label">Սայլակ A (m₁ = 1 կգ)</span>
          <span class="aero-stat-value" id="val-a1" style="color:#58cc02;">a₁ = 10.0 մ/վ²</span>
          <span class="aero-stat-hint" id="val-v1">v₁ = 0.0 մ/վ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Սայլակ B (m₂ = 5 կգ)</span>
          <span class="aero-stat-value" id="val-a2" style="color:#1cb0f6;">a₂ = 2.0 մ/վ²</span>
          <span class="aero-stat-hint" id="val-v2">v₂ = 0.0 մ/վ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Արագացումների հարաբերություն</span>
          <span class="aero-stat-value" id="val-ratio" style="color:#ffc800;">a₁ / a₂ = 5.0</span>
          <span class="aero-stat-hint">Հավասար է m₂ / m₁ հարաբերությանը</span>
        </div>
      </div>
    </div>
  `,e.appendChild(c);const l=c.querySelector("#cv-inertia"),u=l.getContext("2d"),p=c.querySelector("#btn-inertia-play"),y=c.querySelector("#btn-inertia-reset"),h=c.querySelector("#rng-force"),v=c.querySelector("#lbl-force"),g=c.querySelector("#sel-mass2"),m=c.querySelector("#val-a1"),d=c.querySelector("#val-v1"),f=c.querySelector("#val-a2"),x=c.querySelector("#val-v2"),b=c.querySelector("#val-ratio");function w(){u.clearRect(0,0,l.width,l.height);const M=s/t,q=s/a,I=.5*M*i*i,L=.5*q*i*i;u.fillStyle="#1e293b",u.fillRect(40,50,620,60),u.fillStyle="#64748b";for(let V=0;V<20;V++)u.beginPath(),u.arc(60+V*30,80,2,0,Math.PI*2),u.fill();u.fillStyle="#1e293b",u.fillRect(40,180,620,60);for(let V=0;V<20;V++)u.beginPath(),u.arc(60+V*30,210,2,0,Math.PI*2),u.fill();u.strokeStyle="#e2e8f0",u.setLineDash([4,4]),u.lineWidth=2,u.beginPath(),u.moveTo(600,40),u.lineTo(600,250),u.stroke(),u.setLineDash([]),u.fillStyle="#94a3b8",u.font="11px sans-serif",u.fillText("🏁 ԵԶՐԱԳԻԾ",580,32);const E=Math.min(560,50+I*35);u.fillStyle="#58cc02",u.beginPath(),u.roundRect(E,60,48,36,6),u.fill(),u.fillStyle="#fff",u.font="bold 12px sans-serif",u.fillText("1 կգ",E+10,82),u.strokeStyle="#ffc800",u.lineWidth=3,u.beginPath(),u.moveTo(E+48,78),u.lineTo(E+48+s*2.2,78),u.stroke(),u.fillStyle="#ffc800",u.fillText(`F = ${s} Ն`,E+52+s*2.2,82);const T=Math.min(540,50+L*35);u.fillStyle="#1cb0f6",u.beginPath(),u.roundRect(T,190,72,38,6),u.fill(),u.fillStyle="#fff",u.fillText(`${a} կգ`,T+20,213),u.strokeStyle="#ffc800",u.lineWidth=3,u.beginPath(),u.moveTo(T+72,209),u.lineTo(T+72+s*2.2,209),u.stroke(),u.fillStyle="#ffc800",u.fillText(`F = ${s} Ն`,T+76+s*2.2,213)}function $(M){const q=Math.min((M-o)/1e3,.1);if(o=M,n){i+=q;const I=s/t,L=s/a,E=I*i,T=L*i;d.textContent=`v₁ = ${te(E,1)} մ/վ`,x.textContent=`v₂ = ${te(T,1)} մ/վ`,.5*I*i*i*35>=520&&(n=!1,p.textContent="▶️ Կիրառել ուժը"),w()}r=requestAnimationFrame($)}function k(){m.textContent=`a₁ = ${te(s/t,1)} մ/վ²`,f.textContent=`a₂ = ${te(s/a,1)} մ/վ²`,b.textContent=`a₁ / a₂ = ${te(a/t,1)}`,v.textContent=`${s} Ն`,w()}return h.oninput=()=>{s=Number(h.value),k()},g.onchange=()=>{a=Number(g.value),k()},p.onclick=()=>{n=!n,p.textContent=n?"⏸️ Դադար":"▶️ Կիրառել ուժը",B("tap")},y.onclick=()=>{n=!1,i=0,p.textContent="▶️ Կիրառել ուժը",d.textContent="v₁ = 0.0 մ/վ",x.textContent="v₂ = 0.0 մ/վ",B("control"),w()},k(),r=requestAnimationFrame($),()=>{cancelAnimationFrame(r)}}function El(e){let t=!1,a=!1,s=0,n=1,i=null,r=performance.now(),o=0,c=0,l=0,u=0;const p=document.createElement("div");p.className="aero-widget-box",p.innerHTML=`
    <div class="aero-widget-header">
      <div class="aero-badge-pill">🌍 ԳԱԼԻԼԵՅԻ ԱԶԱՏ ԱՆԿՄԱՆ ԽՑԻԿ (ԱՆՕԴ ՎԱԿՈՒՈՒՄ)</div>
      <div class="aero-widget-actions">
        <button class="aero-icon-btn" id="btn-drop-play">⬇️ Բաց թողնել</button>
        <button class="aero-icon-btn" id="btn-drop-reset">🔄 Սկզբնակետ</button>
      </div>
    </div>

    <div class="aero-widget-viewport">
      <canvas id="cv-drop" width="700" height="340" style="width:100%; height:auto; display:block; background:#070d1e; border-radius:12px;"></canvas>
    </div>

    <div class="aero-widget-controls">
      <div class="aero-control-row">
        <label>Միջավայրի ռեժիմ՝</label>
        <div class="btn-group">
          <button class="aero-toggle-btn active" id="btn-mode-air">💨 Օդային մթնոլորտ (Առկա է դիմադրություն)</button>
          <button class="aero-toggle-btn" id="btn-mode-vac">🌌 Վակուում (Ամբողջ օդը քաշված է)</button>
        </div>
      </div>
      <div class="aero-telemetry-grid">
        <div class="aero-stat-card">
          <span class="aero-stat-label">Ծանր երկաթե գունդ (5 կգ)</span>
          <span class="aero-stat-value" id="val-ball-v" style="color:#ef4444;">v = 0.0 մ/վ</span>
          <span class="aero-stat-hint" id="val-ball-y">h = 50.0 մ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Թեթև փետուր (0.005 կգ)</span>
          <span class="aero-stat-value" id="val-feather-v" style="color:#ffc800;">v = 0.0 մ/վ</span>
          <span class="aero-stat-hint" id="val-feather-y">h = 50.0 մ</span>
        </div>
        <div class="aero-stat-card">
          <span class="aero-stat-label">Ազատ անկման արագացում</span>
          <span class="aero-stat-value" style="color:#58cc02;">g = 9.81 մ/վ²</span>
          <span class="aero-stat-hint">F_ձգ = m·g</span>
        </div>
      </div>
    </div>
  `,e.appendChild(p);const y=p.querySelector("#cv-drop"),h=y.getContext("2d"),v=p.querySelector("#btn-drop-play"),g=p.querySelector("#btn-drop-reset"),m=p.querySelector("#btn-mode-air"),d=p.querySelector("#btn-mode-vac"),f=p.querySelector("#val-ball-v"),x=p.querySelector("#val-ball-y"),b=p.querySelector("#val-feather-v"),w=p.querySelector("#val-feather-y"),$=40,k=290,M=k-$;function q(){h.clearRect(0,0,y.width,y.height),h.fillStyle=t?"rgba(10, 20, 45, 0.9)":"rgba(30, 58, 95, 0.4)",h.fillRect(200,$,300,M),h.strokeStyle="#60a5fa",h.lineWidth=3,h.strokeRect(200,$,300,M),h.fillStyle="#94a3b8",h.font="10px sans-serif";for(let T=0;T<=50;T+=10){const V=$+T/50*M;h.strokeStyle="#334155",h.lineWidth=1,h.beginPath(),h.moveTo(200,V),h.lineTo(215,V),h.stroke(),h.fillText(`${50-T} մ`,170,V+4)}if(h.font="bold 12px sans-serif",t)h.fillStyle="#a855f7",h.fillText("🌌 ԿԱՏԱՐՅԱԼ ՎԱԿՈՒՈՒՄ (ՕԴԸ ՀԱՆՎԱԾ Է)",240,25);else{h.fillStyle="#38bdf8",h.fillText("💨 ՕԴԱՅԻՆ ՄԹՆՈԼՈՐՏ (1.225 կգ/մ³)",255,25),h.fillStyle="rgba(186, 230, 253, 0.25)";for(let T=0;T<25;T++){const V=210+T*47%280,D=$+10+T*37%(M-20);h.fillRect(V,D,2,2)}}const L=$+o/50*M;h.fillStyle="#ef4444",h.beginPath(),h.arc(280,Math.min(k-12,L+12),12,0,Math.PI*2),h.fill(),h.strokeStyle="#fff",h.lineWidth=2,h.stroke(),h.fillStyle="#fff",h.font="bold 11px sans-serif",h.fillText("5 կգ",270,Math.min(k-26,L-2));const E=$+l/50*M;h.save(),h.translate(420,Math.min(k-10,E+10)),!t&&a&&l<49&&h.rotate(Math.sin(s*6)*.35),h.fillStyle="#fef08a",h.beginPath(),h.ellipse(0,0,16,6,Math.PI/4,0,Math.PI*2),h.fill(),h.strokeStyle="#ca8a04",h.lineWidth=1.5,h.stroke(),h.restore(),h.fillStyle="#fef08a",h.fillText("0.005 կգ",395,Math.min(k-26,E-2))}function I(L){const E=Math.min((L-r)/1e3,.05)*n;if(r=L,a){s+=E;const T=9.81;if(o<50){let V=0;t||(V=.5*1.225*c*c*.47*.02/5);const D=T-V;c+=D*E,o+=c*E,o>=50&&(o=50,c=0)}if(l<50){let V=0;t||(V=.5*1.225*u*u*1.2*.008/.005);const D=Math.max(0,T-V);u+=D*E,l+=u*E,l>=50&&(l=50,u=0)}f.textContent=`v = ${te(c,1)} մ/վ`,x.textContent=`h = ${te(Math.max(0,50-o),1)} մ`,b.textContent=`v = ${te(u,1)} մ/վ`,w.textContent=`h = ${te(Math.max(0,50-l),1)} մ`,o>=50&&l>=50&&(a=!1,v.textContent="⬇️ Բաց թողնել",B("complete")),q()}i=requestAnimationFrame(I)}return m.onclick=()=>{t=!1,m.classList.add("active"),d.classList.remove("active"),B("control"),q()},d.onclick=()=>{t=!0,d.classList.add("active"),m.classList.remove("active"),B("control"),q()},v.onclick=()=>{a=!a,v.textContent=a?"⏸️ Դադար":"⬇️ Բաց թողնել",B("tap")},g.onclick=()=>{a=!1,s=0,o=0,c=0,l=0,u=0,v.textContent="⬇️ Բաց թողնել",f.textContent="v = 0.0 մ/վ",x.textContent="h = 50.0 մ",b.textContent="v = 0.0 մ/վ",w.textContent="h = 50.0 մ",B("control"),q()},q(),i=requestAnimationFrame(I),()=>{cancelAnimationFrame(i)}}const Pe=(e,t=1)=>Number(e.toFixed(t)).toLocaleString("hy-AM");function Hn(){return{tab:"rocket",rocket:Nn({bottleVolume:.0015,waterFraction:.35,pressureBar:5,dryMass:.16,finCount:3,angleDeg:75,noseShape:"conical",parachute:!0}),drone:{motors:[100,100,100,100],mass:.8,altitude:1.5},helicopter:{collective:50,cyclicPitch:0,cyclicRoll:0,tailPedal:50,mainRpm:400},tunnel:{angleDeg:4,airSpeed:20},supersonic:{mach:1.2,altitude:5e3},jet:{throttle:75,bypassRatio:8.5,altitude:0,airspeedKmh:250},orbit:{launchAltitudeKm:400,horizontalVelocityKms:7.67},glider:{airSpeedKmh:90,bankAngleDeg:30,thermalStrength:3.5,thermalRadius:120},ion:{beamVoltageV:1500,beamCurrentA:1.8,propellant:"xenon",spacecraftMassKg:650},diySelected:"water-rocket",quiz:{index:0,selected:null,submitted:!1,score:0,answers:{}},running:!1,showVectors:!0}}function Rl(e){e.aerolab||=Hn();const t=e.aerolab,a=Dt(e),s=a.activeMode!=="sandbox";return`
    <div class="aerolab-container" data-tab="${t.tab}" data-mode="${a.activeMode}">
      <!-- Hub Header & Mode Switcher -->
      <header class="aero-hub-header">
        <div class="aero-hub-top">
          <div class="aero-hub-meta">
            <span class="aero-badge">🚀 ԱԵՐՈԴԻՆԱՄԻԿԱ ԵՎ ԻՆԺԵՆԵՐԻԱ</span>
            <h1>Թռչող Սարքերի Լաբորատորիա</h1>
            <p class="aero-hub-sub">
              Ֆիզիկայի բացարձակ զրոյից մինչև աերոդինամիկա և տիեզերական հրթիռներ՝ ինտերակտիվ քայլ առ քայլ փորձերով։
            </p>
          </div>

          <!-- Gamification HUD -->
          <div class="aero-hub-hud">
            <div class="aero-hud-pill xp" title="Ընդհանուր վաստակած միավորներ">
              <span class="aero-hud-icon">⚡</span>
              <strong>${a.xp}</strong>
              <small>XP</small>
            </div>
            <div class="aero-hud-pill streak" title="Ամենօրյա ուսումնական շարք">
              <span class="aero-hud-icon">🔥</span>
              <strong>${a.streak}</strong>
              <small>օր</small>
            </div>
            <div class="aero-hud-pill progress" title="Մակարդակ 1-ի ավարտված դասեր">
              <span class="aero-hud-icon">🧭</span>
              <strong>${a.completedLessons.length} / 5</strong>
              <small>դաս</small>
            </div>
          </div>
        </div>

        <!-- Mode Segmented Switcher -->
        <div class="aero-mode-switcher-wrap">
          <div class="aero-mode-switcher" role="tablist">
            <button class="aero-mode-tab ${s?"active":""}" data-aeromode="path">
              <span class="aero-mode-icon">🎓</span>
              <span class="aero-mode-text">Ուսուցման Ճանապարհ</span>
              <span class="aero-mode-badge">Duolingo + Brilliant</span>
            </button>
            <button class="aero-mode-tab ${s?"":"active"}" data-aeromode="sandbox">
              <span class="aero-mode-icon">🛠️</span>
              <span class="aero-mode-text">Ազատ Լաբորատորիա</span>
              <span class="aero-mode-badge">12 Սիմուլյատոր</span>
            </button>
          </div>
        </div>
      </header>

      ${s?Tl(a):Ll(t)}

      ${a.currentLessonId?Fl(a):""}
    </div>
  `}function Ll(e){return`
    <div class="aerolab-sandbox-wrap">
      <!-- Navigation Tabs (Duolingo Style 3D Pills) -->
      <nav class="aerolab-tabs" role="tablist" aria-label="Լաբորատորիայի բաժիններ">
        <button class="tab-button ${e.tab==="rocket"?"active":""}" data-aerotab="rocket" role="tab" aria-selected="${e.tab==="rocket"}">
          <span class="tab-icon">🚀</span>
          <span>Հրթիռի Թռիչք</span>
        </button>
        <button class="tab-button ${e.tab==="drone"?"active":""}" data-aerotab="drone" role="tab" aria-selected="${e.tab==="drone"}">
          <span class="tab-icon">🛸</span>
          <span>Քվադրոկոպտեր</span>
        </button>
        <button class="tab-button ${e.tab==="helicopter"?"active":""}" data-aerotab="helicopter" role="tab" aria-selected="${e.tab==="helicopter"}">
          <span class="tab-icon">🚁</span>
          <span>Ուղղաթիռ & Swashplate</span>
        </button>
        <button class="tab-button ${e.tab==="tunnel"?"active":""}" data-aerotab="tunnel" role="tab" aria-selected="${e.tab==="tunnel"}">
          <span class="tab-icon">💨</span>
          <span>Աերոդինամիկ Խողովակ</span>
        </button>
        <button class="tab-button ${e.tab==="supersonic"?"active":""}" data-aerotab="supersonic" role="tab" aria-selected="${e.tab==="supersonic"}">
          <span class="tab-icon">⚡</span>
          <span>Գերձայնային Թռիչք</span>
        </button>
        <button class="tab-button ${e.tab==="jet"?"active":""}" data-aerotab="jet" role="tab" aria-selected="${e.tab==="jet"}">
          <span class="tab-icon">✈️</span>
          <span>Տուրբոֆեն Շարժիչ</span>
        </button>
        <button class="tab-button ${e.tab==="orbit"?"active":""}" data-aerotab="orbit" role="tab" aria-selected="${e.tab==="orbit"}">
          <span class="tab-icon">🛰️</span>
          <span>Ուղեծրային Թնդանոթ</span>
        </button>
        <button class="tab-button ${e.tab==="glider"?"active":""}" data-aerotab="glider" role="tab" aria-selected="${e.tab==="glider"}">
          <span class="tab-icon">🌬️</span>
          <span>Թերմիկ Սավառնում</span>
        </button>
        <button class="tab-button ${e.tab==="ion"?"active":""}" data-aerotab="ion" role="tab" aria-selected="${e.tab==="ion"}">
          <span class="tab-icon">⚡</span>
          <span>Իոնային Շարժիչ</span>
        </button>
        <button class="tab-button ${e.tab==="diy"?"active":""}" data-aerotab="diy" role="tab" aria-selected="${e.tab==="diy"}">
          <span class="tab-icon">🛠️</span>
          <span>Տնային DIY Ինժեներիա</span>
        </button>
        <button class="tab-button ${e.tab==="badges"?"active":""}" data-aerotab="badges" role="tab" aria-selected="${e.tab==="badges"}">
          <span class="tab-icon">🏆</span>
          <span>Ձեռքբերումներ</span>
        </button>
        <button class="tab-button ${e.tab==="quiz"?"active":""}" data-aerotab="quiz" role="tab" aria-selected="${e.tab==="quiz"}">
          <span class="tab-icon">🎯</span>
          <span>Մինի-Ստուգում</span>
        </button>
      </nav>

      <!-- Tab Content Area -->
      <div class="aerolab-content">
        ${Nl(e)}
      </div>
    </div>
  `}function Tl(e){const t=["1.1","1.2","1.3","1.4","1.5"],a=["pos-center","pos-left","pos-right","pos-left-sub","pos-right-sub"],s=t.map((r,o)=>{const c=Rt[r],l=e.completedLessons.includes(r),u=Gn(e,r),p=u&&!l,y=l?"completed":p?"current":"locked",h=l?"✓":u?c.badge.split(" ")[0]:"🔒";return`
      <div class="aero-node-wrapper ${a[o]} status-${y}">
        ${p?'<div class="aero-node-callout">ՍԿՍԵԼ</div>':""}
        <button class="aero-node-btn ${y}" data-openlesson="${r}" aria-label="${c.title}" ${u?"":"disabled"}>
          <span class="aero-node-icon">${h}</span>
          ${l?'<span class="aero-node-check-badge">✓</span>':""}
        </button>
        <div class="aero-node-info">
          <span class="aero-node-num">Դաս ${r}</span>
          <strong class="aero-node-title">${c.title}</strong>
          <span class="aero-node-reward">+${c.xpReward} XP</span>
        </div>
      </div>
    `}).join(""),n=e.completedLessons.length>=5,i=`
    <div class="aero-node-wrapper pos-center status-${n?"completed":"locked"}">
      <button class="aero-node-btn trophy ${n?"completed":"locked"}" ${n?"":"disabled"}>
        <span class="aero-node-icon">🏆</span>
      </button>
      <div class="aero-node-info">
        <span class="aero-node-num">ՄԱԿԱՐԴԱԿ 1-Ի ԳԱՎԱԹ</span>
        <strong class="aero-node-title">${n?"Շնորհավորո՛ւմ ենք։ Բոլոր 5 դասերը հանձնված են":"Ավարտիր բոլոր 5 դասերը"}</strong>
      </div>
    </div>
  `;return`
    <div class="aero-path-container">
      <!-- Level 1 Banner -->
      <section class="aero-level-banner">
        <div class="aero-level-badge">🧭 ՄԱԿԱՐԴԱԿ 1 / 7</div>
        <h2>Ֆիզիկայի Բացարձակ Հիմունքներ</h2>
        <p>Շարժում, դիրք, արագություն, արագացում, զանգված, իներցիա և Գալիլեյի ազատ անկում։</p>
        <div class="aero-level-progress-bar">
          <div class="aero-level-progress-fill" style="width: ${e.completedLessons.length*20}%"></div>
        </div>
        <span class="aero-level-progress-label">${e.completedLessons.length} / 5 դաս ավարտված (${e.completedLessons.length*20}%)</span>
      </section>

      <!-- Duolingo Snake Learning Path -->
      <section class="aero-snake-section">
        <div class="aero-snake-path">
          ${s}
          ${i}
        </div>
      </section>

      <!-- Safe DIY Glider Engineering Box -->
      ${Bl(e)}

      <!-- Upcoming Curriculum Roadmap (Levels 2-7) -->
      <section class="aero-roadmap-section">
        <h3 class="aero-roadmap-title">🗺️ Հետագա Ուսումնական Ծրագիր</h3>
        <p class="aero-roadmap-sub">Բացահայտիր թռիչքի գիտության հաջորդ մակարդակները՝ Մակարդակ 1-ն ավարտելուց հետո։</p>
        <div class="aero-roadmap-grid">
          ${xl.slice(1).map(r=>`
            <div class="aero-roadmap-card preview">
              <div class="roadmap-card-icon">${r.icon}</div>
              <div class="roadmap-card-info">
                <h4>${r.title}</h4>
                <span class="roadmap-card-sub">${r.subtitle}</span>
                <p>${r.description}</p>
              </div>
              <span class="roadmap-card-badge">Շուտով</span>
            </div>
          `).join("")}
        </div>
      </section>
    </div>
  `}function Bl(e){const t=$l,a=e.diyProgress?.materialsChecked||[],s=e.diyProgress?.stepsCompleted||[];return`
    <section class="aero-diy-card">
      <div class="aero-diy-header">
        <div class="aero-diy-meta">
          <span class="aero-badge-pill green">${t.badge}</span>
          <h3>${t.title}</h3>
          <p class="aero-diy-sub">Փորձիր ֆիզիկան սեփական ձեռքերով՝ սովորական թղթով և ամրակներով։</p>
        </div>
        <div class="aero-diy-stats">
          <span>⏱️ ${t.durationMin} րոպե</span>
          <span>📊 ${t.difficulty}</span>
        </div>
      </div>

      <div class="aero-diy-safety-banner">
        🛡️ <strong>Անվտանգության երաշխիք.</strong> ${t.safetyWarning}
      </div>

      <div class="aero-diy-grid">
        <!-- Materials Checklist -->
        <div class="aero-diy-col">
          <h4>📋 Անհրաժեշտ նյութեր</h4>
          <ul class="aero-diy-checklist">
            ${t.materials.map(n=>`
              <li>
                <label class="aero-checkbox-label">
                  <input type="checkbox" data-diymat="${n.id}" ${a.includes(n.id)?"checked":""} />
                  <span class="aero-check-text">${n.icon} ${n.name}</span>
                </label>
              </li>
            `).join("")}
          </ul>
        </div>

        <!-- Step by Step Guide -->
        <div class="aero-diy-col steps">
          <h4>👣 Քայլ առ քայլ ինժեներական հավաքում</h4>
          <div class="aero-diy-steps-list">
            ${t.steps.map(n=>`
              <div class="aero-diy-step-item ${s.includes(n.step)?"done":""}">
                <div class="step-check-col">
                  <input type="checkbox" data-diystep="${n.step}" ${s.includes(n.step)?"checked":""} />
                </div>
                <div class="step-text-col">
                  <strong>Քայլ ${n.step}. ${n.title}</strong>
                  <p>${n.instruction}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Engineering Takeaway -->
      <div class="aero-diy-takeaway">
        💡 <strong>Ինժեներական Եզրակացություն.</strong> ${t.engineeringTakeaway}
      </div>
    </section>
  `}function Fl(e){if(!e.currentLessonId)return"";const t=Rt[e.currentLessonId];if(!t)return"";const a=e.activeStep||0,s=t.steps[a],n=["Հարց","Կանխատեսում","Փորձ","Դիտարկում","Բացատրություն","Մարտահրավեր","Ավարտ"];return`
    <div class="aero-modal-backdrop" role="dialog" aria-modal="true" aria-label="${t.title}">
      <div class="aero-modal-container">
        <!-- Modal Top Bar -->
        <header class="aero-modal-header">
          <div class="aero-modal-title-col">
            <span class="aero-modal-badge">${t.badge}</span>
            <h3>Դաս ${t.number}. ${t.title}</h3>
          </div>
          <button class="aero-modal-close-btn" data-closelesson title="Փակել">✕</button>
        </header>

        <!-- 7-Step Progress Pill Tracker -->
        <div class="aero-step-tracker" role="tablist">
          ${n.map((i,r)=>`
            <div class="aero-step-pill ${r===a?"active":r<a?"done":""}">
              <span class="aero-step-num">${r+1}</span>
              <span class="aero-step-name">${i}</span>
            </div>
          `).join("")}
        </div>

        <!-- Active Step Main Body -->
        <div class="aero-modal-body">
          ${Vl(t,s,e)}
        </div>
      </div>
    </div>
  `}function Vl(e,t,a){if(t.type==="question")return`
      <div class="aero-step-pane question-pane">
        <div class="aero-step-header-tag">${t.badge}</div>
        <h2>${t.title}</h2>
        <div class="aero-question-hero">
          <p class="aero-question-prompt">${t.prompt}</p>
          <div class="aero-question-detail">💡 ${t.detail}</div>
        </div>
        <div class="aero-step-footer">
          <button class="button" data-stepadvance="1">
            <span>Առաջարկել կանխատեսում</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;if(t.type==="prediction")return`
      <div class="aero-step-pane prediction-pane">
        <div class="aero-step-header-tag">${t.badge}</div>
        <h2>${t.title}</h2>
        <p class="aero-step-sub">Ընտրիր տարբերակը, որն ըստ քեզ ճիշտ է։ Փորձից հետո կտեսնենք իրականությունը։</p>

        <div class="aero-prediction-options">
          ${t.options.map(s=>`
            <button class="aero-option-card ${a.userPrediction===s.id?"selected":""}" data-predictchoice="${s.id}">
              <span class="aero-option-radio">${a.userPrediction===s.id?"●":"○"}</span>
              <span class="aero-option-text">${s.text}</span>
            </button>
          `).join("")}
        </div>

        <div class="aero-step-footer">
          <button class="button" data-stepadvance="2" ${a.userPrediction===null?"disabled":""}>
            <span>Հաստատել և անցնել փորձին</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;if(t.type==="experiment")return`
      <div class="aero-step-pane experiment-pane">
        <div class="aero-step-header-tag">${t.badge}</div>
        <h2>${t.title}</h2>
        <p class="aero-step-sub">${t.instruction}</p>

        <!-- Dynamic Simulation Canvas Widget Mount -->
        <div id="lesson-widget-mount" data-widget="${t.widgetType}"></div>

        <div class="aero-step-footer">
          <button class="button" data-stepadvance="3">
            <span>Ավարտել փորձը և անցնել դիտարկմանը</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;if(t.type==="observation")return`
      <div class="aero-step-pane observation-pane">
        <div class="aero-step-header-tag">${t.badge}</div>
        <h2>${t.title}</h2>
        <p class="aero-step-sub">Ահա այն առանցքային կետերը, որոնք պետք էր նկատել սիմուլյացիայի ժամանակ.</p>

        <div class="aero-observation-list">
          ${t.questions.map((s,n)=>`
            <div class="aero-obs-item">
              <span class="aero-obs-num">#${n+1}</span>
              <p class="aero-obs-text">${s}</p>
            </div>
          `).join("")}
        </div>

        <div class="aero-step-footer">
          <button class="button" data-stepadvance="4">
            <span>Տեսնել ֆիզիկայի բացատրությունը</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;if(t.type==="explanation")return`
      <div class="aero-step-pane explanation-pane">
        <div class="aero-step-header-tag">${t.badge}</div>
        <h2>${t.title}</h2>

        <div class="aero-explanation-content">
          ${t.content}
        </div>

        <div class="aero-step-footer">
          <button class="button" data-stepadvance="5">
            <span>Անցնել ամրապնդման մարտահրավերին</span>
            <span>→</span>
          </button>
        </div>
      </div>
    `;if(t.type==="challenge"){const s=a.challengeSubmitted,n=t.options.find(r=>r.id===a.challengeSelected),i=s&&n?.correct;return`
      <div class="aero-step-pane challenge-pane">
        <div class="aero-step-header-tag">${t.badge}</div>
        <h2>${t.title}</h2>

        <div class="aero-challenge-box">
          <p class="aero-challenge-q">${t.question}</p>

          <div class="aero-challenge-options">
            ${t.options.map(r=>{let o="";return a.challengeSelected===r.id&&(o="selected"),s&&(r.correct?o+=" correct-answer":a.challengeSelected===r.id&&(o+=" wrong-answer")),`
                <button class="aero-option-card ${o}" data-chalchoice="${r.id}" ${s?"disabled":""}>
                  <span class="aero-option-letter">${String.fromCharCode(65+r.id)}</span>
                  <span class="aero-option-text">${r.text}</span>
                </button>
              `}).join("")}
          </div>
        </div>

        <!-- Hint Section -->
        <div class="aero-hint-area">
          <button class="aero-hint-toggle" id="btn-chal-hint">
            💡 ${a.showHint?"Թաքցնել հուշումը":"Հուշում (Hint)"}
          </button>
          ${a.showHint?`<div class="aero-hint-box">${t.hint}</div>`:""}
        </div>

        <!-- Feedback Dock -->
        <div class="aero-challenge-dock ${s?i?"dock-success":"dock-error":""}">
          ${s?i?`
            <div class="aero-dock-content success">
              <div class="aero-dock-msg">
                <strong>🎉 ՃԻՇՏ Է։ ԳԵՐԱԶԱՆՑ ԱՐԴՅՈՒՆՔ</strong>
                <p>${t.explanation}</p>
              </div>
              <button class="button" data-stepadvance="6">
                ՇԱՐՈՒՆԱԿԵԼ →
              </button>
            </div>
          `:`
            <div class="aero-dock-content error">
              <div class="aero-dock-msg">
                <strong>❌ Ոչինչ, փորձիր նորից</strong>
                <p>Ուշադիր կարդա հարցը կամ բացիր հուշումը՝ ճիշտ տրամաբանությունը գտնելու համար։</p>
              </div>
              <button class="button secondary" id="btn-chal-retry">
                ՓՈՐՁԵԼ ՆՈՐԻՑ
              </button>
            </div>
          `:`
            <div class="aero-dock-content">
              <span class="aero-dock-prompt">Ընտրիր պատասխանը և ստուգիր արդյունքը։</span>
              <button class="button" id="btn-chal-check" ${a.challengeSelected===null?"disabled":""}>
                ՍՏՈՒԳԵԼ
              </button>
            </div>
          `}
        </div>
      </div>
    `}return t.type==="complete"?`
      <div class="aero-step-pane complete-pane">
        <div class="aero-step-header-tag gold">${t.badge}</div>
        <div class="aero-victory-trophy">🏆</div>
        <h2>${t.title}</h2>
        <p class="aero-step-sub">${t.summary}</p>

        <!-- Unlocked Formula Card -->
        <div class="aero-formula-card">
          <span class="aero-formula-badge">🔓 ԱՊԱԿՈՂՊՎԱԾ ԲԱՆԱՁԵՎ</span>
          <div class="aero-formula-symbol">${t.unlockedFormula.symbol}</div>
          <strong class="aero-formula-name">${t.unlockedFormula.name}</strong>
          <span class="aero-formula-units">${t.unlockedFormula.units}</span>
        </div>

        <div class="aero-reward-xp-pill">
          ⚡ <strong>+${e.xpReward} XP</strong> ավելացվեց քո պրոֆիլին
        </div>

        <div class="aero-step-footer">
          <button class="button" id="btn-lesson-finish">
            <span>Ավարտել և վերադառնալ ճանապարհին 🚀</span>
          </button>
        </div>
      </div>
    `:""}function Nl(e){return e.tab==="rocket"?Pl(e):e.tab==="drone"?Hl(e):e.tab==="helicopter"?jl(e):e.tab==="tunnel"?Gl(e):e.tab==="supersonic"?Dl(e):e.tab==="jet"?Ul(e):e.tab==="orbit"?Zl(e):e.tab==="glider"?zl(e):e.tab==="ion"?Wl(e):e.tab==="diy"?Kl(e):e.tab==="badges"?Yl(e):e.tab==="quiz"?Ql(e):""}function Pl(e){const t=e.rocket,a=t.params,s=350,n=2.5,i=70+t.x*n,r=s-t.y*n;return`
    <div class="aerolab-simulator-layout">
      <!-- Visual Canvas / Viewport Area -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <span class="sim-tag">ԿԵՆԴԱՆԻ ՖԻԶԻԿԱ · 60 FPS</span>
          <div class="sim-quick-toggles">
            <label class="toggle-label">
              <input type="checkbox" id="toggle-vectors" ${e.showVectors?"checked":""}>
              <span>Ուժերի վեկտորներ</span>
            </label>
          </div>
        </div>

        <div class="rocket-scene-wrap">
          <svg id="rocket-canvas" viewBox="0 0 760 420" preserveAspectRatio="xMidYMid meet" aria-label="Հրթիռի թռիչքի սիմուլյատոր">
            <defs>
              <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ddf3ff"/>
                <stop offset="65%" stop-color="#f0f9ff"/>
                <stop offset="100%" stop-color="#ffffff"/>
              </linearGradient>
              <linearGradient id="grass-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#58cc02"/>
                <stop offset="100%" stop-color="#46a302"/>
              </linearGradient>
            </defs>

            <!-- Sky background -->
            <rect width="760" height="420" fill="url(#sky-grad)"/>

            <!-- Altitude altitude grid lines -->
            <line x1="0" y1="${s-10*n}" x2="760" y2="${s-10*n}" stroke="#c5e4f5" stroke-dasharray="4 4"/>
            <text x="12" y="${s-10*n-4}" font-size="11" fill="#7ba3b8">10 մ</text>
            <line x1="0" y1="${s-25*n}" x2="760" y2="${s-25*n}" stroke="#c5e4f5" stroke-dasharray="4 4"/>
            <text x="12" y="${s-25*n-4}" font-size="11" fill="#7ba3b8">25 մ</text>
            <line x1="0" y1="${s-50*n}" x2="760" y2="${s-50*n}" stroke="#c5e4f5" stroke-dasharray="4 4"/>
            <text x="12" y="${s-50*n-4}" font-size="11" fill="#7ba3b8">50 մ</text>

            <!-- Trajectory Line -->
            <path id="rocket-trajectory" d="${Dn(t.trajectory,n,s)}" fill="none" stroke="#1cb0f6" stroke-width="2.5" stroke-dasharray="4 3" opacity="0.8"/>

            <!-- Launch pad on ground -->
            <g transform="translate(70, ${s})">
              <rect x="-24" y="0" width="48" height="12" rx="3" fill="#62666b"/>
              <line x1="-15" y1="0" x2="-2" y2="-20" stroke="#777e90" stroke-width="3"/>
              <line x1="15" y1="0" x2="2" y2="-20" stroke="#777e90" stroke-width="3"/>
            </g>

            <!-- Ground layer -->
            <rect x="0" y="${s}" width="760" height="70" fill="url(#grass-grad)"/>
            <line x1="0" y1="${s}" x2="760" y2="${s}" stroke="#389000" stroke-width="3"/>

            <!-- The Rocket Instance -->
            <g id="rocket-actor" transform="translate(${i}, ${r}) scale(0.7)">
              ${Pn({pitch:t.pitch,finCount:a.finCount,noseShape:a.noseShape,waterRemaining:t.waterRemaining,totalWater:a.bottleVolume*a.waterFraction,status:t.status,speed:t.speed,thrust:t.thrust,showVectors:e.showVectors,gravity:t.gravity,drag:t.drag})}
            </g>

            <!-- Apogee Marker -->
            ${t.apogee>2?`<g transform="translate(680, 50)">
                     <rect x="-8" y="-18" width="80" height="26" rx="6" fill="#ffc800" stroke="#d9a000" stroke-width="1.5"/>
                     <text x="32" y="-1" text-anchor="middle" font-size="12" font-weight="700" fill="#252525">Ապոգեյ՝ ${Pe(t.apogee)} մ</text>
                   </g>`:""}
          </svg>
        </div>

        <!-- Telemetry Dashboard Cards -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Բարձրություն</span>
            <span class="telemetry-value" id="val-altitude">${Pe(t.y)} <small>մ</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Առավելագույն (Apogee)</span>
            <span class="telemetry-value highlight" id="val-apogee">${Pe(t.apogee)} <small>մ</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Արագություն</span>
            <span class="telemetry-value" id="val-speed">${Pe(t.speed)} <small>մ/վ</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Քարշուժ</span>
            <span class="telemetry-value" id="val-thrust">${Math.round(t.thrust)} <small>Ն</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Կարգավիճակ</span>
            <span class="telemetry-status ${t.status==="tumble"?"is-warning":"is-good"}" id="val-status">
              ${Un(t.status,t.isStable)}
            </span>
          </div>
        </div>
      </div>

      <!-- Controls Panel (Tactile Sliders & Parameters) -->
      <div class="sim-controls-card">
        <h3>Հրթիռի Կարգավորումներ</h3>

        <!-- Pressure Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-pressure">Սկզբնական Ճնշում (Օդամղում)</label>
            <strong id="label-pressure">${a.pressureBar} բար (մթն.)</strong>
          </div>
          <input type="range" id="param-pressure" min="1" max="8" step="0.5" value="${a.pressureBar}">
          <div class="range-marks"><span>1 բար (թույլ)</span><span>4 բար (տիպիկ)</span><span>8 բար (առավելագույն)</span></div>
        </div>

        <!-- Water Fraction Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-water">Ջրի Քանակ (Շշի ծավալի %-ը)</label>
            <strong id="label-water">${Math.round(a.waterFraction*100)} %</strong>
          </div>
          <input type="range" id="param-water" min="0" max="0.9" step="0.05" value="${a.waterFraction}">
          <div class="range-marks"><span>0% (միայն օդ)</span><span>35% (օպտիմալ)</span><span>90% (ծանր)</span></div>
        </div>

        <!-- Fins Count -->
        <div class="control-row">
          <label>Կայունարար Թևեր (Fins)</label>
          <div class="button-toggle-group" id="fin-picker">
            <button class="toggle-btn ${a.finCount===0?"selected":""}" data-fincount="0">0 թև (անկայուն)</button>
            <button class="toggle-btn ${a.finCount===3?"selected":""}" data-fincount="3">3 թև (ստանդարտ)</button>
            <button class="toggle-btn ${a.finCount===4?"selected":""}" data-fincount="4">4 թև (գերկայուն)</button>
          </div>
        </div>

        <!-- Nosecone Shape -->
        <div class="control-row">
          <label>Քթամասի Ձև</label>
          <div class="button-toggle-group" id="nose-picker">
            <button class="toggle-btn ${a.noseShape==="conical"?"selected":""}" data-noseshape="conical">Կոնաձև (աերոդինամիկ)</button>
            <button class="toggle-btn ${a.noseShape==="blunt"?"selected":""}" data-noseshape="blunt">Հարթ (դիմադրող)</button>
          </div>
        </div>

        <!-- Launch Angle Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-angle">Արձակման Անկյուն</label>
            <strong id="label-angle">${a.angleDeg}°</strong>
          </div>
          <input type="range" id="param-angle" min="45" max="90" step="5" value="${a.angleDeg}">
          <div class="range-marks"><span>45° (հեռահար)</span><span>75° (հավասարակշռված)</span><span>90° (ուղղաձիգ)</span></div>
        </div>

        <!-- Primary Launch Action -->
        <div class="sim-actions-row">
          <button class="button lesson-primary" id="btn-launch-rocket">
            ${e.running?"⏸ Դադարեցնել":t.status==="landed"?"🚀 Կրկին Արձակել":"🚀 Արձակել Հրթիռը"}
          </button>
          <button class="button secondary" id="btn-reset-rocket">
            ↺ Սկզբնական դիրք
          </button>
        </div>

        ${t.isStable?"":`<div class="warning-callout">
                 <strong>⚠️ Ուշադրություն.</strong> Հրթիռն անկայուն է (CoM > CoP): Առանց թևերի այն օդում կսկսի պտտվել (tumble) և չի հասնի բարձրության։ Ավելացրու՛ թևեր։
               </div>`}
      </div>
    </div>
  `}function Dn(e,t,a){return!e||e.length===0?"":"M "+e.map(n=>`${70+n.x*t},${a-n.y*t}`).join(" L ")}function Un(e,t){return e==="ready"?t?"Պատրաստ է արձակման":"Անկայուն կոնֆիգուրացիա":e==="thrust"?"🚀 Ռեակտիվ քարշուժ":e==="coast"?"Ազատ իներցիոն թռիչք":e==="tumble"?"🌀 Անկայուն պտույտ (tumble)":e==="parachute"?"🪂 Պարաշյուտով վայրէջք":e==="landed"?"✓ Բարեհաջող վայրէջք":e}function Gl(e){const t=e.tunnel,a=Rn({angleDeg:t.angleDeg,airSpeed:t.airSpeed});return`
    <div class="aerolab-simulator-layout">
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <span class="sim-tag">ԱԵՐՈԴԻՆԱՄԻԿԱ · ՕԴԱՅԻՆ ԽՈՂՈՎԱԿ</span>
          <span class="flow-status ${a.stall?"is-warning":"is-good"}">
            ${a.stall?"⚠️ Շեղում (Stall)":"✓ Լամինար սահուն հոսք"}
          </span>
        </div>

        <div class="tunnel-scene-wrap">
          ${ul({angleDeg:t.angleDeg,airSpeed:t.airSpeed,lift:a.lift,drag:a.drag,stall:a.stall})}
        </div>

        <!-- Telemetry for Airfoil -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Գրոհի Անկյուն (α)</span>
            <span class="telemetry-value highlight">${t.angleDeg}°</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Վերամբարձ Ուժ (Lift)</span>
            <span class="telemetry-value">${a.lift} <small>Ն</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Դիմադրության Ուժ (Drag)</span>
            <span class="telemetry-value">${a.drag} <small>Ն</small></span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Որակի Գործակից (L/D)</span>
            <span class="telemetry-value">${a.liftToDrag}</span>
          </div>
        </div>
      </div>

      <!-- Tunnel Controls Panel -->
      <div class="sim-controls-card">
        <h3>Թևի Կարգավորումներ</h3>

        <div class="control-row">
          <div class="control-label-wrap">
            <label for="tunnel-angle">Գրոհի Անկյուն (Angle of Attack)</label>
            <strong id="label-tunnel-angle">${t.angleDeg}°</strong>
          </div>
          <input type="range" id="tunnel-angle" min="-5" max="25" step="1" value="${t.angleDeg}">
          <div class="range-marks"><span>-5° (բացասական)</span><span>4° (օպտիմալ)</span><span>16°+ (շեղում / stall)</span></div>
        </div>

        <div class="control-row">
          <div class="control-label-wrap">
            <label for="tunnel-speed">Օդի Հոսքի Արագություն</label>
            <strong id="label-tunnel-speed">${t.airSpeed} մ/վ</strong>
          </div>
          <input type="range" id="tunnel-speed" min="5" max="40" step="5" value="${t.airSpeed}">
          <div class="range-marks"><span>5 մ/վ</span><span>20 մ/վ</span><span>40 մ/վ</span></div>
        </div>

        <div class="physics-explanation-box">
          <h4>Բեռնուլիի Օրենքը և Downwash-ը</h4>
          <p>
            1. <strong>Արագություն և Ճնշում</strong>. Թևի վերին կոր մակերեսով օդն անցնում է ավելի արագ, ուստի ըստ Բեռնուլիի օրենքի՝ վերևում ճնշումը նվազում է ($P_{\\text{վեր}} < P_{\\text{վար}}$)։ Ճնշման տարբերությունը թևը ձգում է վեր։
          </p>
          <p>
            2. <strong>Օդի հոսքի շեղում</strong>. Թևը շեղում է օդի զանգվածը դեպի ներքև (downwash): Ըստ Նյուտոնի 3-րդ օրենքի՝ օդը հավասար ուժով թևին հրում է դեպի վեր։
          </p>
          <p>
            3. <strong>Ի՞նչ է Stall-ը</strong>. Եթե անկյունը չափազանց մեծ է (> 15°), օդի հոսքը պոկվում է թևի մակերեսից՝ ստեղծելով քաոսային մրրիկներ։ Վերամբարձ ուժը կտրուկ անկում է ապրում։
          </p>
        </div>
      </div>
    </div>
  `}function Hl(e){const t=e.drone,a=Ln({motors:t.motors,mass:t.mass}),[s,n,i,r]=t.motors;return`
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Canvas & Live Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">🛸 ԱԵՐՈԴԻՆԱՄԻԿԱ · ԴՐՈՆԻ ԿԱՅՈՒՆԱՑՈՒՄ</span>
            <span class="flow-status ${a.isHovering||Math.abs(a.yawTorque)<.001?"is-good":"is-warning"}">
              ${a.isHovering?"✓ Կայուն Հովերինգ":Math.abs(a.yawTorque)<.001?"✓ Հավասարակշռված":"⚠️ Անհավասար Պտույտ"}
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" id="btn-drone-hover">✓ Ավտո-Հովերինգ</button>
            <button class="action-btn-small" id="btn-drone-yaw-left">↺ Ձախ Պտույտ</button>
            <button class="action-btn-small" id="btn-drone-yaw-right">↻ Աջ Պտույտ</button>
            <button class="action-btn-small" id="btn-drone-tilt-fwd">⬆ Թեքել Առաջ</button>
            <button class="action-btn-small secondary" id="btn-drone-reset">↺ Զրոյացնել</button>
          </div>
        </div>

        <!-- Drone SVG Viewport -->
        <div class="tunnel-scene-wrap">
          ${hl({motors:t.motors,thrusts:a.thrusts,totalThrust:a.totalThrust,weight:a.weight,pitchDeg:a.pitchDeg,rollDeg:a.rollDeg,yawTorque:a.yawTorque,showVectors:e.showVectors})}
        </div>

        <!-- Dynamic Telemetry Readouts -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Ընդհանուր Քարշուժ</span>
            <strong class="telemetry-value" id="val-drone-thrust">${Pe(a.totalThrust)} <small>Ն</small></strong>
            <span class="telemetry-hint">4 շարժիչների գումար</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Դրոնի Ծանրություն (W)</span>
            <strong class="telemetry-value">${Pe(a.weight)} <small>Ն</small></strong>
            <span class="telemetry-hint">m = ${t.mass} կգ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Պտտող Մոմենտ (Yaw)</span>
            <strong class="telemetry-value ${Math.abs(a.yawTorque)<.001?"is-good":"is-warning"}">
              ${a.yawTorque.toFixed(3)} <small>Ն·մ</small>
            </strong>
            <span class="telemetry-hint">CW vs CCW տարբերություն</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Ուղղաձիգ Դինամիկա</span>
            <strong class="telemetry-value" id="val-drone-status">
              ${a.isHovering?"Հովերինգ":a.isClimbing?"Վերելք ↑":"Իջեցում ↓"}
            </strong>
            <span class="telemetry-hint">a = ${a.verticalAccel>0?"+":""}${a.verticalAccel} մ/վ²</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Insight -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչպե՞ս է քվադրոկոպտերը կառավարում թռիչքը առանց ղեկերի</h4>
          <p>
            1. <strong>Իմպուլսի պտտման մոմենտի պահպանում</strong>․ 1-ին և 3-րդ շարժիչները պտտվում են ժամսլաքով (CW), իսկ 2-րդն ու 4-րդը՝ ժամսլաքին հակառակ (CCW)։ Նրանց օդային ռեակտիվ պտտող մոմենտները ճշգրիտ չեզոքացնում են միմյանց ($\\\\tau_{\\\\text{net}} = 0$)։
          </p>
          <p>
            2. <strong>Պտույտ իր առանցքի շուրջ (Yaw)</strong>․ Եթե մեծացնենք CW շարժիչների արագությունը և նվազեցնենք CCW շարժիչներինը, ընդհանուր քարշուժը չի փոխվի, բայց առաջացած չհավասարակշռված ռեակտիվ մոմենտի շնորհիվ դրոնը կսկսի պտտվել հակառակ ուղղությամբ։
          </p>
          <p>
            3. <strong>Առաջ/Ետ շարժում (Pitch)</strong>․ Ետևի շարժիչի (M3) քարշուժը մեծացնելիս դրոնի քիթը թեքվում է առաջ, և քարշուժի մի բաղադրիչը դրոնին առաջ է մղում։
          </p>
        </div>
      </div>

      <!-- Right Column: Tactile Parameter Controls -->
      <div class="sim-controls-card">
        <h3>Կառավարման Վահանակ</h3>
        <p class="sim-hint">Կարգավորի՛ր շարժիչների արագությունը կամ օգտվի՛ր վերևի արագ կոճակներից</p>

        <!-- Master Throttle Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="drone-master-throttle">Ընդհանուր Գազ (Master Throttle)</label>
            <strong id="label-drone-master">${Math.round(s)}%</strong>
          </div>
          <input type="range" id="drone-master-throttle" min="0" max="150" step="1" value="${Math.round(s)}">
          <div class="range-marks"><span>0% (Անջատված)</span><span>100% (Հովերինգ)</span><span>150% (Արագ վերելք)</span></div>
        </div>

        <!-- Motor 1 (Front CW) -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="motor-1">Շարժիչ 1 · Առջև (CW ↻)</label>
            <strong id="label-m1">${Math.round(s)}%</strong>
          </div>
          <input type="range" id="motor-1" min="0" max="160" step="1" value="${Math.round(s)}">
        </div>

        <!-- Motor 2 (Right CCW) -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="motor-2">Շարժիչ 2 · Աջ (CCW ↺)</label>
            <strong id="label-m2">${Math.round(n)}%</strong>
          </div>
          <input type="range" id="motor-2" min="0" max="160" step="1" value="${Math.round(n)}">
        </div>

        <!-- Motor 3 (Rear CW) -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="motor-3">Շարժիչ 3 · Ետև (CW ↻)</label>
            <strong id="label-m3">${Math.round(i)}%</strong>
          </div>
          <input type="range" id="motor-3" min="0" max="160" step="1" value="${Math.round(i)}">
        </div>

        <!-- Motor 4 (Left CCW) -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="motor-4">Շարժիչ 4 · Ձախ (CCW ↺)</label>
            <strong id="label-m4">${Math.round(r)}%</strong>
          </div>
          <input type="range" id="motor-4" min="0" max="160" step="1" value="${Math.round(r)}">
        </div>
      </div>
    </div>
  `}function Dl(e){const t=e.supersonic,a=dl({mach:t.mach});return`
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Canvas & Live Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">⚡ ԳԵՐՁԱՅՆԱՅԻՆ ԱԵՐՈԴԻՆԱՄԻԿԱ</span>
            <span class="flow-status ${a.isSupersonic?"is-good":"is-warning"}">
              ${a.isSupersonic?"🚀 Գերձայնային ռեժիմ (M > 1)":"✈️ Ենթաձայնային (M < 1)"}
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small ${a.mach===.85?"selected":""}" data-mach="0.85">✈️ Boeing (0.85 M)</button>
            <button class="action-btn-small ${a.isSonic?"selected":""}" data-mach="1.0">⚡ Պատնեշ (1.0 M)</button>
            <button class="action-btn-small ${a.mach===1.6?"selected":""}" data-mach="1.6">🚀 Գերձայնային (1.6 M)</button>
            <button class="action-btn-small ${a.mach===2.2?"selected":""}" data-mach="2.2">🔥 Concorde (2.2 M)</button>
          </div>
        </div>

        <!-- Supersonic Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${fl({mach:a.mach,machAngleDeg:a.machAngleDeg,airspeedKmh:a.airspeedKmh,pressureRatio:a.pressureRatio})}
        </div>

        <!-- Dynamic Telemetry Readouts -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Մախի Թիվ (M)</span>
            <strong class="telemetry-value" id="val-mach">${a.mach} <small>M</small></strong>
            <span class="telemetry-hint">M = v / a</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Իրական Արագություն</span>
            <strong class="telemetry-value">${a.airspeedKmh} <small>կմ/ժ</small></strong>
            <span class="telemetry-hint">${a.airspeedMs} մ/վ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Մախի Կոնի Անկյուն (μ)</span>
            <strong class="telemetry-value ${a.isSupersonic?"is-good":""}">
              ${a.machAngleDeg!==null?`${a.machAngleDeg}°`:"Գոյություն չունի"}
            </strong>
            <span class="telemetry-hint">${a.isSupersonic?"sin(μ) = 1/M":"Ենթաձայնային (M < 1)"}</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Ճնշման Թռիչք (P₂/P₁)</span>
            <strong class="telemetry-value ${a.isSupersonic?"is-warning":""}">
              ${a.pressureRatio}x
            </strong>
            <span class="telemetry-hint">Հարվածային ալիքի ճակատ</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Card -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչու՞ է առաջանում ձայնային հարվածը (Sonic Boom)</h4>
          <p>
            1. <strong>Ենթաձայնային արագություն ($M < 1$)</strong>․ Ինքնաթիռի ստեղծած ձայնային ալիքները շարժվում են նրանից ավելի արագ (340 մ/վ) և հեռանում են առաջ (Դոպլերի խտացում)։
          </p>
          <p>
            2. <strong>Ձայնային պատնեշ ($M = 1$)</strong>․ Ինքնաթիռը հավասարվում է իր արձակած ալիքներին։ Բոլոր ալիքների ճակատները կուտակվում են քթամասի մոտ՝ ստեղծելով օդի ճնշման հսկայական «պատ» (խտացման թռիչք)։
          </p>
          <p>
            3. <strong>Գերձայնային ռեժիմ ($M > 1$)</strong>․ Ինքնաթիռը առաջ է անցնում իր սեփական ձայնից։ Ալիքները մնում են ետևում և դրանց շոշափողները ստեղծում են կոնաձև հարվածային ճակատ։ Այդ կոնի անկյունը որոշվում է $\\\\sin\\\\mu = 1/M$ բանաձևով։ Երբ կոնը հասնում է գետնին, լսվում է որոտանման պայթյուն (Sonic Boom)։
          </p>
        </div>
      </div>

      <!-- Right Column: Controls -->
      <div class="sim-controls-card">
        <h3>Կարգավորումներ</h3>
        <p class="sim-hint">Կարգավորի՛ր թռիչքի արագությունը կամ ընտրի՛ր ինքնաթիռի տիպը</p>

        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-mach">Մախի Թիվ (Mach)</label>
            <strong id="label-mach">${a.mach} M</strong>
          </div>
          <input type="range" id="param-mach" min="0.3" max="2.8" step="0.05" value="${a.mach}">
          <div class="range-marks"><span>0.3 M</span><span>1.0 M (Ձայնային)</span><span>2.8 M (Գերձայնային)</span></div>
        </div>
      </div>
    </div>
  `}function Ul(e){const t=e.jet,a=Tn({throttle:t.throttle,bypassRatio:t.bypassRatio,altitude:t.altitude,airspeedKmh:t.airspeedKmh});return`
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Canvas & Live Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">✈️ ՏՈՒՐԲՈՎԵՆՏԻԼՅԱՏՈՐԱՅԻՆ ՌԵԱԿՏԻՎ ՇԱՐԺԻՉ</span>
            <span class="flow-status ${a.bypassThrustPercent>=75?"is-good":"is-warning"}">
              ${a.bypassThrustPercent>=75?"✓ Բարձր Երկկոնտուրություն (High BPR)":"⚠️ Ցածր Շրջանցում (Low BPR)"}
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" data-jetpreset="takeoff">🛫 Մեկնարկ (100%)</button>
            <button class="action-btn-small" data-jetpreset="cruise">✈️ Կրուիզ (10,500մ)</button>
            <button class="action-btn-small" data-jetpreset="dash">⚡ Կործանիչ (BPR 2.0)</button>
            <button class="action-btn-small secondary" data-jetpreset="idle">🛬 Պարապ (Idle)</button>
          </div>
        </div>

        <!-- Jet Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${ml({throttle:a.throttle,bypassRatio:a.bypassRatio,thrustKn:a.thrustKn,thrustBypassKn:a.thrustBypassKn,thrustCoreKn:a.thrustCoreKn,bypassThrustPercent:a.bypassThrustPercent,titC:a.titC,fanRpmPct:a.fanRpmPct,coreRpmPct:a.coreRpmPct,showVectors:e.showVectors})}
        </div>

        <!-- Dynamic Telemetry Readouts -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Ընդհանուր Քարշուժ (F_net)</span>
            <strong class="telemetry-value" id="val-thrust-kn">${a.thrustKn} <small>կՆ</small></strong>
            <span class="telemetry-hint">Շրջանցիկ՝ ${a.thrustBypassKn} կՆ | Կորիզ՝ ${a.thrustCoreKn} կՆ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Շրջանցման Քարշի Բաժին</span>
            <strong class="telemetry-value ${a.bypassThrustPercent>=75?"is-good":""}">
              ${a.bypassThrustPercent} <small>%</small>
            </strong>
            <span class="telemetry-hint">BPR = ${a.bypassRatio} : 1</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Տեսակարար Ծախս (TSFC)</span>
            <strong class="telemetry-value ${a.tsfc<16?"is-good":""}">
              ${a.tsfc} <small>գ/(կՆ·վ)</small>
            </strong>
            <span class="telemetry-hint">Վառելիք՝ ${a.fuelFlowKgH} կգ/ժ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Տուրբինի Ջերմաստիճան (TIT)</span>
            <strong class="telemetry-value ${a.titC>1400?"is-warning":""}">
              ${a.titC} <small>°C</small>
            </strong>
            <span class="telemetry-hint">${a.titK} Կելվին</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Card -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչու՞ են ժամանակակից ինքնաթիռներում տեղադրվում մեծ տուրբոֆեններ (BPR > 8)</h4>
          <p>
            Նյուտոնի 2-րդ և 3-րդ օրենքներով քարշուժը հավասար է արտանետվող գազի զանգվածային ծախսի և արագության աճի արտադրյալին՝ $F = \\dot{m} (v_e - v_0)$։ Բայց շարժիչի կորցրած կինետիկ էներգիան համեմատական է արագության քառակուսուն ($E_k \\propto v_e^2$)։
          </p>
          <p>
            Ուստի էներգետիկորեն շատ ավելի շահավետ է <strong>հսկայական զանգվածով սառը օդ մղել չափավոր արագությամբ</strong>, քան քիչ քանակությամբ շիկացած գազ արտանետել գերձայնային արագությամբ։ Արդյունքում քաղաքացիական ինքնաթիռների քարշուժի <strong>80-85%-ը ստեղծում է սառը շրջանցիկ հոսքը</strong>, իսկ վառելիքի ծախսը նվազում է ~30%-ով։
          </p>
        </div>
      </div>

      <!-- Right Column: Controls -->
      <div class="sim-controls-card">
        <h3>Կառավարման Լծակներ</h3>
        <p class="sim-hint">Կարգավորի՛ր գազը, շրջանցման գործակիցը և թռիչքի բարձրությունը</p>

        <!-- Throttle Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-jet-throttle">Քարշի Լծակ (Throttle / Գազ)</label>
            <strong id="label-jet-throttle">${a.throttle} %</strong>
          </div>
          <input type="range" id="param-jet-throttle" min="10" max="100" step="1" value="${a.throttle}">
          <div class="range-marks"><span>10% (Idle)</span><span>75% (Cruise)</span><span>100% (Takeoff)</span></div>
        </div>

        <!-- Bypass Ratio Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-jet-bpr">Երկկոնտուրություն (Bypass Ratio)</label>
            <strong id="label-jet-bpr">${a.bypassRatio} : 1</strong>
          </div>
          <input type="range" id="param-jet-bpr" min="1" max="12" step="0.5" value="${a.bypassRatio}">
          <div class="range-marks"><span>1:1 (Կործանիչ)</span><span>8:1 (A320/B737)</span><span>12:1 (B787/GE9X)</span></div>
        </div>

        <!-- Altitude Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-jet-alt">Թռիչքի Բարձրություն (Altitude)</label>
            <strong id="label-jet-alt">${a.altitude.toLocaleString("hy-AM")} մ</strong>
          </div>
          <input type="range" id="param-jet-alt" min="0" max="12000" step="500" value="${a.altitude}">
          <div class="range-marks"><span>0 մ (Ծովի մակարդակ)</span><span>6,000 մ</span><span>12,000 մ (Էշելոն)</span></div>
        </div>

        <!-- Airspeed Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-jet-speed">Թռիչքի Արագություն</label>
            <strong id="label-jet-speed">${a.airspeedKmh} կմ/ժ (M ${a.mach})</strong>
          </div>
          <input type="range" id="param-jet-speed" min="0" max="950" step="25" value="${a.airspeedKmh}">
          <div class="range-marks"><span>0 (Ստատիկ)</span><span>500 կմ/ժ</span><span>950 կմ/ժ (0.85 M)</span></div>
        </div>
      </div>
    </div>
  `}function jl(e){const t=e.helicopter,a=Bn({collective:t.collective,cyclicPitch:t.cyclicPitch,cyclicRoll:t.cyclicRoll,tailPedal:t.tailPedal,mainRpm:t.mainRpm});return`
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Canvas & Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">🚁 ՈՒՂՂԱԹԻՌԻ ՌՈՏՈՐ & SWASHPLATE</span>
            <span class="flow-status ${a.yawState==="balanced"?"is-good":"is-stalled"}">
              ${a.yawState==="balanced"?a.isHovering?"✓ Կատարյալ Հովերինգ (Կախում)":"✓ Հավասարակշռված Թռիչք":"⚠️ Պոչային Հակամոմենտի Շեղում (Spinout)"}
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" data-helipreset="hover">🚁 Հովերինգ (50%)</button>
            <button class="action-btn-small" data-helipreset="forward">⏩ Առաջընթաց (Cyclic +25)</button>
            <button class="action-btn-small" data-helipreset="climb">⬆️ Վերելք (Collective 75%)</button>
            <button class="action-btn-small secondary" data-helipreset="spinout">🌀 Պտտահողմ (Spinout)</button>
          </div>
        </div>

        <!-- Helicopter Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${bl({colPitchDeg:a.colPitchDeg,tiltForwardDeg:a.tiltForwardDeg,tiltRollDeg:a.tiltRollDeg,mainTorqueNm:a.mainTorqueNm,tailAntiTorqueNm:a.tailAntiTorqueNm,netYawTorqueNm:a.netYawTorqueNm,yawState:a.yawState,isHover:a.isHovering,flightState:a.flightState,totalThrustKn:a.totalThrustKn,verticalLiftKn:a.verticalLiftKn,forwardThrustKn:a.forwardThrustKn,showVectors:e.showVectors})}
        </div>

        <!-- Dynamic Telemetry Readouts -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Վերամբարձ Ուժ (L_վեր)</span>
            <strong class="telemetry-value ${a.verticalLiftKn>=20?"is-good":""}" id="val-heli-lift">
              ${a.verticalLiftKn} <small>կՆ</small>
            </strong>
            <span class="telemetry-hint">Քաշ՝ 20.0 կՆ | Քայլ՝ ${a.colPitchDeg}°</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Առաջ Մղող Քարշուժ (T_առաջ)</span>
            <strong class="telemetry-value ${Math.abs(a.forwardThrustKn)>.5?"is-good":""}">
              ${a.forwardThrustKn} <small>կՆ</small>
            </strong>
            <span class="telemetry-hint">Սկավառակի թեքում՝ ${a.tiltForwardDeg}°</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Պտտող Մոմենտների Հաշվեկշիռ</span>
            <strong class="telemetry-value ${a.yawState==="balanced"?"is-good":"is-stalled"}">
              ${a.netYawTorqueNm} <small>Ն·մ</small>
            </strong>
            <span class="telemetry-hint">Ռեակցիա՝ ${a.mainTorqueNm} Ն·մ | Պոչ՝ ${a.tailAntiTorqueNm} Ն·մ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Թռիչքային Կարգավիճակ</span>
            <strong class="telemetry-value is-good">
              ${a.flightState==="hover"?"Հովերինգ":a.flightState==="climb"?"Վերելք":a.flightState==="descent"?"Վայրէջք":a.flightState==="forward"?"Առաջընթաց":"Հետընթաց"}
            </strong>
            <span class="telemetry-hint">Կուրս՝ ${a.yawState==="balanced"?"Հաստատուն":"Անկայուն"}</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Card -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչպե՞ս է աշխատում Լիցքաթիթեղը (Swashplate) և Պոչային Պտուտակը</h4>
          <p>
            Ուղղաթիռի հիմնական պտուտակը կատարում է երկու կարևորագույն դեր.
            <strong>1. Համատարած քայլ (Collective Pitch)՝</strong> բարձրացնում կամ իջեցնում է լիցքաթիթեղը՝ բոլոր թիակների անկյունը փոխելով միաժամանակ, ինչը ապահովում է վերելքը։
            <strong>2. Շրջափուլային քայլ (Cyclic Pitch)՝</strong> թեքում է լիցքաթիթեղը։ Շնորհիվ 90° գիրոսկոպիկ պրեցեսիայի և աերոդինամիկ փուլային շեղման, թիակների հարթությունը թեքվում է թռիչքի ուղղությամբ։
            <strong>3. Նյուտոնի 3-րդ օրենքը՝</strong> շարժիչը պտտում է գլխավոր ռոտորը, իսկ ֆյուզելյաժը հակառակ ուղղությամբ ստանում է հզոր ռեակտիվ պտտող մոմենտ։ Պոչային պտուտակը (Tail Rotor) չեզոքացնում է այս պտույտը՝ պահելով ուղղաթիռի կայուն ուղղությունը։
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Sliders & Controls -->
      <div class="sim-controls-card">
        <h3>Ուղղաթիռի Ղեկավարում</h3>

        <!-- Collective Pitch Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-heli-collective">Համատարած Քայլ (Collective Pitch)</label>
            <strong id="label-heli-collective">${t.collective} % (${a.colPitchDeg}°)</strong>
          </div>
          <input type="range" id="param-heli-collective" min="0" max="100" step="1" value="${t.collective}">
          <div class="range-marks"><span>0% (4° - Իջեցում)</span><span>50% (11° - Հովերինգ)</span><span>100% (18° - Վերելք)</span></div>
        </div>

        <!-- Cyclic Pitch Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-heli-cyclic">Ցիկլիկ Թեքում (Cyclic Pitch Stick)</label>
            <strong id="label-heli-cyclic">${t.cyclicPitch>0?"+":""}${t.cyclicPitch} (${a.tiltForwardDeg}°)</strong>
          </div>
          <input type="range" id="param-heli-cyclic" min="-50" max="50" step="2" value="${t.cyclicPitch}">
          <div class="range-marks"><span>-50 (Ետ)</span><span>0 (Չեզոք)</span><span>+50 (Առաջ)</span></div>
        </div>

        <!-- Tail Rotor Pedal Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-heli-tail">Պոչային Պտուտակ (Anti-Torque Pedals)</label>
            <strong id="label-heli-tail">${t.tailPedal} %</strong>
          </div>
          <input type="range" id="param-heli-tail" min="0" max="100" step="1" value="${t.tailPedal}">
          <div class="range-marks"><span>0% (Ձախ)</span><span>50% (Հավասարակշռված)</span><span>100% (Աջ)</span></div>
        </div>
      </div>
    </div>
  `}function Zl(e){const t=e.orbit,a=Aa({launchAltitudeKm:t.launchAltitudeKm,horizontalVelocityKms:t.horizontalVelocityKms});return`
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Orbital Canvas & Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">🛰️ ՆՅՈՒՏՈՆԻ ԹՆԴԱՆՈԹ & ՈՒՂԵԾԻՐ</span>
            <span class="flow-status ${a.isStableOrbit?"is-good":a.status==="hyperbolic"||a.status==="parabolic"?"is-warning":"is-stalled"}">
              ${a.status==="circular"?"✓ Շրջանաձև LEO Ուղեծիր (1-ին տիեզերական)":a.status==="elliptic"?"✓ Էլիպսաձև Կեպլերյան Ուղեծիր":a.status==="hyperbolic"||a.status==="parabolic"?"🌌 Խույսի Հետագիծ (2-րդ տիեզերական)":"⚠️ Բալիստիկ Անկում (v < v₁)"}
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" data-orbitpreset="suborbital">☄️ Ենթաուղեծրային (4.5 կմ/վ)</button>
            <button class="action-btn-small" data-orbitpreset="leo">🛰️ Կայուն LEO (7.67 կմ/վ)</button>
            <button class="action-btn-small" data-orbitpreset="gto">⬭ Էլիպս (9.8 կմ/վ)</button>
            <button class="action-btn-small secondary" data-orbitpreset="escape">🌌 Խույս (11.0 կմ/վ)</button>
          </div>
        </div>

        <!-- Orbit Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${gl({launchAltitudeKm:t.launchAltitudeKm,horizontalVelocityKms:t.horizontalVelocityKms,orbitModel:a,showVectors:e.showVectors})}
        </div>

        <!-- Dynamic Telemetry Readouts -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Հորիզոնական Արագություն (v₀)</span>
            <strong class="telemetry-value" id="val-orbit-v0">${t.horizontalVelocityKms} <small>կմ/վ</small></strong>
            <span class="telemetry-hint">1-ին տիեզերական v₁՝ ${a.v1Kms} կմ/վ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Էքսցենտրիսիտետ (e)</span>
            <strong class="telemetry-value ${a.status==="circular"?"is-good":""}">
              ${a.eccentricity}
            </strong>
            <span class="telemetry-hint">${a.status==="circular"?"Շրջան (e ≈ 0)":a.eccentricity<1?"Էլիպս (e < 1)":"Պարաբոլ/Հիպերբոլ (e ≥ 1)"}</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Պերիգեյ / Ապոգեյ (h_p / h_a)</span>
            <strong class="telemetry-value ${a.hasCollided?"is-stalled":"is-good"}">
              ${a.periapsisKm} <small>կմ</small> / ${a.apoapsisKm!==null?a.apoapsisKm+" կմ":"∞"}
            </strong>
            <span class="telemetry-hint">${a.hasCollided?"Բախում Երկրի մակերևույթին":"Անվտանգ բարձրություն մթնոլորտից"}</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Պարբերություն (T) & Գրավիտացիա (g)</span>
            <strong class="telemetry-value">
              ${a.periodMin?a.periodMin+" րոպե":"—"}
            </strong>
            <span class="telemetry-hint">g = ${a.gravityAtAlt} մ/վ² (${Math.round(a.gravityAtAlt/9.81*100)}% g₀)</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Card -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչու՞ արբանյակը չի ընկնում Երկրի վրա (Նյուտոնի մտային փորձը)</h4>
          <p>
            Եթե բարձր լեռան գագաթից թնդանոթով հորիզոնական կրակենք, յուրաքանչյուր 8,000 մետր հորիզոնական թռիչքի դեպքում Երկրի գնդաձև մակերևույթը կորանում և իջնում է ուղիղ 4.9 մետրով։ Իսկ ազատ անկման արագացման պատճառով արկը առաջին վայրկյանում իջնում է հենց $h = \\frac{1}{2}gt^2 \\approx 4.9$ մետրով։ Երբ արկի հորիզոնական արագությունը հասնում է $v_1 \\approx 7.9$ կմ/վ ($7.67$ կմ/վ 400 կմ բարձրության վրա), արկն անընդհատ ընկնում է Երկրի վրա, սակայն Երկրի մակերեսը նույնքանով «փախչում է» նրա տակից։ Անկշռությունը ոչ թե գրավիտացիայի բացակայությունն է, այլ անվերջանալի ազատ անկում։
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Sliders & Presets -->
      <div class="sim-controls-card">
        <h3>Տիեզերական Պարամետրեր</h3>

        <!-- Horizontal Launch Velocity Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-orbit-v0">Հորիզոնական Արագություն (v₀)</label>
            <strong id="label-orbit-v0">${t.horizontalVelocityKms} կմ/վ</strong>
          </div>
          <input type="range" id="param-orbit-v0" min="1.0" max="12.5" step="0.05" value="${t.horizontalVelocityKms}">
          <div class="range-marks">
            <span>1.0 կմ/վ</span>
            <span>7.67 կմ/վ (LEO)</span>
            <span>10.85 կմ/վ (Խույս)</span>
            <span>12.5 կմ/վ</span>
          </div>
        </div>

        <!-- Launch Altitude Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-orbit-alt">Ուղեծրային Բարձրություն (h)</label>
            <strong id="label-orbit-alt">${t.launchAltitudeKm} կմ</strong>
          </div>
          <input type="range" id="param-orbit-alt" min="100" max="1500" step="50" value="${t.launchAltitudeKm}">
          <div class="range-marks"><span>100 կմ (Կարմանի գիծ)</span><span>400 կմ (ISS)</span><span>1,500 կմ</span></div>
        </div>

        <!-- Velocity Indicator Thresholds -->
        <div class="orbit-hud-card" style="margin-top: 1.25rem; padding: 1rem; border-radius: 12px; background: #0f172a; border: 1.5px solid #334155;">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; color: #f8fafc;">🚀 Տիեզերական Արագության Սանդղակ</h4>
          <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; color: ${t.horizontalVelocityKms<a.v1Kms?"#f87171":"#94a3b8"};">
              <span>☄️ Ենթաուղեծրային տիրույթ՝</span>
              <strong>&lt; ${a.v1Kms} կմ/վ</strong>
            </div>
            <div style="display: flex; justify-content: space-between; color: ${a.status==="circular"?"#4ade80":"#94a3b8"};">
              <span>🛰️ 1-ին տիեզերական (Շրջան)՝</span>
              <strong>${a.v1Kms} կմ/վ</strong>
            </div>
            <div style="display: flex; justify-content: space-between; color: ${a.status==="elliptic"?"#fbbf24":"#94a3b8"};">
              <span>⬭ Էլիպսաձև փակ ուղեծիր՝</span>
              <strong>${a.v1Kms} – ${a.vEscKms} կմ/վ</strong>
            </div>
            <div style="display: flex; justify-content: space-between; color: ${t.horizontalVelocityKms>=a.vEscKms?"#c084fc":"#94a3b8"};">
              <span>🌌 2-րդ տիեզերական (Հեռացում)՝</span>
              <strong>&ge; ${a.vEscKms} կմ/վ</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}function zl(e){const t=e.glider,a=Fn({airSpeedKmh:t.airSpeedKmh,bankAngleDeg:t.bankAngleDeg,thermalStrength:t.thermalStrength,thermalRadius:t.thermalRadius});return`
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Viewport & Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">🌬️ ԹԵՐՄԻԿ ՍԱՎԱՌՆՈՒՄ & ՊՈԼՅԱՐԱ</span>
            <span class="flow-status ${a.isClimbing?"is-good":"is-stalled"}">
              ${a.isClimbing?`✓ Դրական Վերելք (+${a.netClimbRate} մ/վ)`:`⚠️ Բարձրության Կորուստ (${a.netClimbRate} մ/վ)`}
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" data-gliderpreset="optimal">🌀 Օպտիմալ Թերմիկ (30°)</button>
            <button class="action-btn-small" data-gliderpreset="level">➡️ Ուղիղ Սավառնում (Max L/D)</button>
            <button class="action-btn-small" data-gliderpreset="steep">⚡ Կտրուկ Թեքում (55°, 1.7g)</button>
            <button class="action-btn-small secondary" data-gliderpreset="weak">☁️ Թույլ Թերմիկ (1.5 մ/վ)</button>
          </div>
        </div>

        <!-- Glider Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${vl({airSpeedKmh:a.forwardSpeedKmh,bankAngleDeg:a.bankAngleDeg,thermalStrength:t.thermalStrength,thermalRadius:t.thermalRadius,turnRadiusM:a.turnRadiusM,loadFactor:a.loadFactor,turnSinkRate:a.turnSinkRate,thermalUpdraft:a.thermalUpdraft,netClimbRate:a.netClimbRate,bestLd:a.bestLd,isClimbing:a.isClimbing,showVectors:e.showVectors})}
        </div>

        <!-- Telemetry HUD Cards -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Արդյունարար Վերելք (Net Climb)</span>
            <strong class="telemetry-value ${a.isClimbing?"is-good":"is-stalled"}" id="val-glider-net">
              ${a.netClimbRate>0?"+":""}${a.netClimbRate} <small>մ/վ</small>
            </strong>
            <span class="telemetry-hint">Թերմիկ (${a.thermalUpdraft} մ/վ) - Իջեցում (${a.turnSinkRate} մ/վ)</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Շրջադարձի Շառավիղ (R)</span>
            <strong class="telemetry-value">
              ${a.turnRadiusM<9999?a.turnRadiusM+" մ":"Ուղղագիծ"}
            </strong>
            <span class="telemetry-hint">R = v² / (g · tan φ)</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Գերբեռնվածություն (n = 1/cos φ)</span>
            <strong class="telemetry-value ${a.loadFactor>1.5?"is-warning":""}">
              ${a.loadFactor} <small>g</small>
            </strong>
            <span class="telemetry-hint">Թևերի բեռնվածություն շրջադարձում</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Աերոդինամիկ Որակ (L/D)</span>
            <strong class="telemetry-value is-good">
              ${a.bestLd} : 1
            </strong>
            <span class="telemetry-hint">Օպտիմալ արագություն՝ ${a.bestSpeedKmh} կմ/ժ</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Explanation -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչպե՞ս են սավառնորդները ժամերով մնում օդում առանց շարժիչի</h4>
          <p>
            Արևի ճառագայթներից տաքացած գետնի մակերևույթը տաքացնում է սահմանամերձ օդը։ Տաք օդը, լինելով ավելի թեթև, վեր է բարձրանում հզոր կոնվեկտիվ սյուներով (թերմիկներ)՝ 2-6 մ/վ արագությամբ։ Երբ սավառնակը կողաթեքվում է ($phi = 30^circ$) և պտտվում է թերմիկի ներսում, նրա սեփական իջեցման արագությունը (օր. $1.0$ մ/վ) փոքր է օդի վերընթաց արագությունից ($+3.5$ մ/վ), և սավառնակը բարձրանում է $+2.5$ մ/վ արագությամբ՝ կուտակելով հսկայական պոտենցիալ էներգիա։
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Sliders -->
      <div class="sim-controls-card">
        <h3>Սավառնման Պարամետրեր</h3>

        <!-- Forward Airspeed Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-glider-speed">Առաջընթաց Արագություն (v_a)</label>
            <strong id="label-glider-speed">${t.airSpeedKmh} կմ/ժ</strong>
          </div>
          <input type="range" id="param-glider-speed" min="60" max="180" step="2" value="${t.airSpeedKmh}">
          <div class="range-marks">
            <span>60 կմ/ժ (Stall-ի մոտ)</span>
            <span>90 կմ/ժ (Best L/D)</span>
            <span>180 կմ/ժ (Արագ անցում)</span>
          </div>
        </div>

        <!-- Bank Angle Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-glider-bank">Կողաթեքման Անկյուն (Bank Angle φ)</label>
            <strong id="label-glider-bank">${t.bankAngleDeg}°</strong>
          </div>
          <input type="range" id="param-glider-bank" min="0" max="65" step="1" value="${t.bankAngleDeg}">
          <div class="range-marks">
            <span>0° (Ուղիղ)</span>
            <span>30° (Օպտիմալ)</span>
            <span>60° (2.0 g ծանրաբեռնվածություն)</span>
          </div>
        </div>

        <!-- Thermal Core Strength Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-glider-thermal">Թերմիկի Ուժգնություն (w_core)</label>
            <strong id="label-glider-thermal">+${t.thermalStrength} մ/վ</strong>
          </div>
          <input type="range" id="param-glider-thermal" min="0" max="8.0" step="0.2" value="${t.thermalStrength}">
          <div class="range-marks">
            <span>0 մ/վ (Հանդարտ օդ)</span>
            <span>3.5 մ/վ (Միջին)</span>
            <span>8.0 մ/վ (Հզոր կոնվեկցիա)</span>
          </div>
        </div>

        <!-- Thermal Radius Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-glider-radius">Թերմիկ Սյան Շառավիղ (R_thermal)</label>
            <strong id="label-glider-radius">${t.thermalRadius} մ</strong>
          </div>
          <input type="range" id="param-glider-radius" min="50" max="250" step="10" value="${t.thermalRadius}">
          <div class="range-marks">
            <span>50 մ (Նեղ սյուն)</span>
            <span>120 մ</span>
            <span>250 մ (Լայն ամպատակ)</span>
          </div>
        </div>
      </div>
    </div>
  `}function Wl(e){const t=e.ion,a=Vn({beamVoltageV:t.beamVoltageV,beamCurrentA:t.beamCurrentA,propellant:t.propellant,spacecraftMassKg:t.spacecraftMassKg});return`
    <div class="aerolab-simulator-layout">
      <!-- Left Column: Simulation Viewport & Telemetry -->
      <div class="sim-viewport-card">
        <div class="sim-viewport-header">
          <div class="viewport-title-wrap">
            <span class="sim-tag">⚡ ԻՈՆԱՅԻՆ ՇԱՐԺԻՉ & ԽՈՐ ՏԻԵԶԵՐՔ</span>
            <span class="flow-status is-good">
              ✓ Isp = ${a.specificImpulseSec.toLocaleString("hy-AM")} վ (>10x քիմիական հրթիռից)
            </span>
          </div>
          <div class="viewport-actions">
            <button class="action-btn-small" data-ionpreset="dawn">🛰️ NASA Dawn (Ceres)</button>
            <button class="action-btn-small" data-ionpreset="starlink">📡 Starlink (Kr/Ar)</button>
            <button class="action-btn-small" data-ionpreset="bepi">🪐 BepiColombo (Mercury)</button>
            <button class="action-btn-small secondary" data-ionpreset="deepspace">🌌 Deep Space 1 (NSTAR)</button>
          </div>
        </div>

        <!-- Ion Viewport SVG -->
        <div class="tunnel-scene-wrap">
          ${yl({beamVoltageV:t.beamVoltageV,beamCurrentA:t.beamCurrentA,propellant:t.propellant,thrustMilliN:a.thrustMilliN,specificImpulseSec:a.specificImpulseSec,exhaustVelocityKms:a.exhaustVelocityKms,beamPowerKw:a.beamPowerKw,showVectors:e.showVectors})}
        </div>

        <!-- Telemetry HUD Cards -->
        <div class="telemetry-grid">
          <div class="telemetry-card">
            <span class="telemetry-label">Տեսակարար Իմպուլս (I_sp)</span>
            <strong class="telemetry-value is-good" id="val-ion-isp">
              ${a.specificImpulseSec.toLocaleString("hy-AM")} <small>վ</small>
            </strong>
            <span class="telemetry-hint">Արտահոսքի արագություն՝ ${a.exhaustVelocityKms} կմ/վ</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Շարունակական Քարշուժ (F)</span>
            <strong class="telemetry-value">
              ${a.thrustMilliN} <small>մՆ</small>
            </strong>
            <span class="telemetry-hint">Ծախս՝ ${a.massFlowMgS} մգ/վ (աննշան կորուստ)</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Օրական Արագացում (Δv / օր)</span>
            <strong class="telemetry-value is-good">
              +${a.deltaVPerDayMs} <small>մ/վ / օր</small>
            </strong>
            <span class="telemetry-hint">Արագացում՝ ${a.accelerationMmS2} մմ/վ²</span>
          </div>
          <div class="telemetry-card">
            <span class="telemetry-label">Էլեկտրական Հզորություն (P)</span>
            <strong class="telemetry-value">
              ${a.totalPowerKw} <small>կՎտ</small>
            </strong>
            <span class="telemetry-hint">Քարշ/Հզորություն՝ ${a.thrustToPowerRatio} մՆ/կՎտ</span>
          </div>
        </div>

        <!-- Brilliant Conceptual Explanation -->
        <div class="physics-explanation-box">
          <h4>💡 Ինչու՞ իոնային շարժիչներն անփոխարինելի են խոր տիեզերքում</h4>
          <p>
            Քիմիական հրթիռների այրման արգասիքները դուրս են նետվում առավելագույնը 3-4.5 կմ/վ արագությամբ ($I_{\\text{sp}} \\approx 300-450$ վ)։ Իսկ էլեկտրաստատիկ դաշտով արագացվող Քսենոնի իոնները սլանում են <b>40-50 կմ/վ արագությամբ</b> ($I_{\\text{sp}} > 4,500$ վ)։ Ցիոլկովսկու բանաձևի համաձայն՝ $\\Delta v = v_e \\ln(m_0/m_f)$․ իոնային շարժիչի դեպքում միջմոլորակային թռիչքի համար պահանջվում է <b>10 անգամ ավելի քիչ վառելիք</b>։ Տիեզերանավի քաշի 80%-ը դառնում է գիտական օգտակար բեռ, այլ ոչ թե ծանր վառելիքային բաքեր։
          </p>
        </div>
      </div>

      <!-- Right Column: Interactive Sliders -->
      <div class="sim-controls-card">
        <h3>Էլեկտրական Շարժիչի Պարամետրեր</h3>

        <!-- Beam Voltage Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-ion-voltage">Արագացնող Լարում (Beam Voltage)</label>
            <strong id="label-ion-voltage">${t.beamVoltageV} Վ</strong>
          </div>
          <input type="range" id="param-ion-voltage" min="800" max="3500" step="50" value="${t.beamVoltageV}">
          <div class="range-marks">
            <span>800 Վ (34 կմ/վ)</span>
            <span>1,500 Վ (47 կմ/վ)</span>
            <span>3,500 Վ (72 կմ/վ)</span>
          </div>
        </div>

        <!-- Beam Current Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-ion-current">Իոնային Փնջի Հոսանք (Beam Current)</label>
            <strong id="label-ion-current">${t.beamCurrentA} Ա</strong>
          </div>
          <input type="range" id="param-ion-current" min="0.5" max="3.5" step="0.1" value="${t.beamCurrentA}">
          <div class="range-marks">
            <span>0.5 Ա (35 մՆ)</span>
            <span>1.8 Ա (128 մՆ)</span>
            <span>3.5 Ա (250 մՆ)</span>
          </div>
        </div>

        <!-- Propellant Gas Selector -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-ion-propellant">Աշխատանքային Մարմին (Propellant)</label>
            <strong id="label-ion-propellant">${a.propellantName}</strong>
          </div>
          <select id="param-ion-propellant" class="propellant-select" style="width: 100%; padding: 0.6rem; border-radius: 8px; font-weight: 700; background: #0f172a; color: #f8fafc; border: 1.5px solid #334155;">
            <option value="xenon" ${t.propellant==="xenon"?"selected":""}>Քսենոն (Xenon Xe, 131.3 amu) · Դասական ստանդարտ</option>
            <option value="krypton" ${t.propellant==="krypton"?"selected":""}>Կրիպտոն (Krypton Kr, 83.8 amu) · Starlink մատչելի</option>
            <option value="argon" ${t.propellant==="argon"?"selected":""}>Արգոն (Argon Ar, 39.9 amu) · Գերբարձր Isp</option>
            <option value="iodine" ${t.propellant==="iodine"?"selected":""}>Յոդ (Iodine I₂, 126.9 amu) · Պինդ պահեստավորում</option>
          </select>
        </div>

        <!-- Spacecraft Mass Slider -->
        <div class="control-row">
          <div class="control-label-wrap">
            <label for="param-ion-mass">Տիեզերանավի Զանգված (Mass)</label>
            <strong id="label-ion-mass">${t.spacecraftMassKg} կգ</strong>
          </div>
          <input type="range" id="param-ion-mass" min="200" max="2000" step="50" value="${t.spacecraftMassKg}">
          <div class="range-marks">
            <span>200 կգ (CubeSat)</span>
            <span>650 կգ (Dawn)</span>
            <span>2,000 կգ (Ծանր զոնդ)</span>
          </div>
        </div>
      </div>
    </div>
  `}function Kl(e){const t=ya.find(a=>a.id===e.diySelected)||ya[0];return`
    <div class="diy-guide-container">
      <!-- Project Selection Cards Grid -->
      <div class="diy-cards-grid">
        ${ya.map(a=>`
          <button class="diy-project-card ${a.id===e.diySelected?"selected":""}" data-diyselect="${a.id}">
            <div class="diy-card-header">
              <span class="diy-badge">${a.difficulty}</span>
              <span class="diy-time">⏱ ${a.buildTime}</span>
            </div>
            <h4>${a.title}</h4>
            <p>${a.subtitle}</p>
          </button>
        `).join("")}
      </div>

      <!-- Selected Project Detailed Blueprint -->
      <article class="diy-blueprint-card">
        <div class="blueprint-header">
          <span class="eyebrow">ԻՆԺԵՆԵՐԱԿԱՆ ՈՒՂԵՑՈՒՅՑ · DIY</span>
          <h2>${t.title}</h2>
          <p class="blueprint-sub">${t.subtitle}</p>
        </div>

        <div class="blueprint-body">
          <!-- Physics Secret Box -->
          <div class="blueprint-secret-box">
            <h4>💡 Ֆիզիկական Գաղտնիքը</h4>
            <p>${t.physicsSecret}</p>
          </div>

          <!-- Materials Checklist -->
          <div class="blueprint-section">
            <h3>📦 Անհրաժեշտ Նյութեր (գրեթե 0 ծախս)</h3>
            <ul class="materials-list">
              ${t.materials.map(a=>`<li><span class="check-icon">✓</span> <span>${a}</span></li>`).join("")}
            </ul>
          </div>

          <!-- Step-by-Step Instructions -->
          <div class="blueprint-section">
            <h3>🔨 Քայլ առ Քայլ Պատրաստման Ընթացք</h3>
            <div class="steps-flow">
              ${t.steps.map((a,s)=>`
                <div class="step-card">
                  <div class="step-num">${s+1}</div>
                  <div class="step-content">
                    <h4>${a.title}</h4>
                    <p>${a.detail}</p>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Troubleshooting Box -->
          <div class="blueprint-section">
            <h3>🔧 Հնարավոր Խնդիրներ և Շտկումներ</h3>
            <ul class="trouble-list">
              ${t.troubleshooting.map(a=>`<li>${a}</li>`).join("")}
            </ul>
          </div>
        </div>
      </article>
    </div>
  `}function Yl(e){let t=0,a=0;const s=Is.map(n=>{const i=n.check(e);return i&&(t++,a+=n.points),`
      <div class="aero-badge-card ${i?"unlocked":"locked"}">
        <div class="badge-icon-wrap">
          <span class="badge-big-icon">${n.icon}</span>
          ${i?'<span class="badge-check-mark">✓</span>':'<span class="badge-lock-mark">🔒</span>'}
        </div>
        <div class="badge-info">
          <h4>${n.title}</h4>
          <p>${n.desc}</p>
          <div class="badge-reward">
            <span class="xp-pill ${i?"is-good":""}">
              ${i?"✓ Ձեռքբերված":"Չբացված"} · +${n.points} XP
            </span>
          </div>
        </div>
      </div>
    `}).join("");return`
    <div class="badges-view-container">
      <div class="badges-header-card">
        <div class="badges-summary-info">
          <span class="eyebrow">ԽԱՂԱՅԻՆ ՁԵՌՔԲԵՐՈՒՄՆԵՐ · DUOLINGO STYLE</span>
          <h2>Ավիացիոն Լաբորատորիայի Պարգևներ</h2>
          <p>Կատարի՛ր հետազոտական փորձերը բոլոր սիմուլյատորներում և բացի՛ր բոլոր վարպետության բեյջերը։</p>
        </div>
        <div class="badges-score-box">
          <div class="score-circle">
            <strong>${t} / ${Is.length}</strong>
            <span>Բեյջ</span>
          </div>
          <div class="xp-total-display">
            <strong>⚡ ${a} XP</strong>
            <small>Վաստակած միավոր</small>
          </div>
        </div>
      </div>

      <div class="aero-badges-grid">
        ${s}
      </div>
    </div>
  `}function Ql(e){const t=e.quiz,a=ut[t.index],s=t.selected,n=t.submitted,i=n&&s===a.correct;return t.index>=ut.length?`
      <div class="quiz-completion-card">
        <div class="completion-icon">🏆</div>
        <h2>Հիանալի՛ է, Հետազոտող։</h2>
        <p>Դու հաջողությամբ յուրացրիր թռիչքի և աերոդինամիկայի բոլոր հիմնարար օրենքները։</p>
        <div class="score-pill">Արդյունք՝ ${t.score} / ${ut.length} ճիշտ</div>
        <button class="button lesson-primary" id="btn-restart-quiz">Սկսել նորից</button>
      </div>
    `:`
    <div class="aero-quiz-container">
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${t.index/ut.length*100}%"></div>
      </div>

      <div class="quiz-header">
        <span class="eyebrow">Հարց ${t.index+1} / ${ut.length}</span>
        <h2>${a.question}</h2>
      </div>

      <!-- Tactile Duolingo Choice Cards -->
      <div class="activity-choices" role="radiogroup">
        ${a.options.map((o,c)=>{const l=s===c;let u="";return n&&(c===a.correct?u="is-correct":l?u="is-incorrect":u="is-neutral"),`
            <button class="answer ${l?"selected":""} ${u}" 
                    data-aerochoice="${c}" 
                    role="radio" 
                    aria-checked="${l}" 
                    ${n?"disabled":""}>
              <span class="answer-badge">${c+1}</span>
              <span class="answer-text">${o}</span>
              <span class="answer-indicator radio-dot">
                ${u==="is-correct"?'<span class="icon-check">✓</span>':u==="is-incorrect"?'<span class="icon-cross">✕</span>':""}
              </span>
            </button>
          `}).join("")}
      </div>

      <!-- Anchored Feedback Dock -->
      ${n?`
        <div class="lesson-feedback-dock assessment-feedback ${i?"correct":"incorrect"}">
          <div class="feedback-dock-content">
            <div class="feedback-status-row">
              <span class="feedback-status-badge">${i?"✓":"✕"}</span>
              <h3 class="feedback-heading">${i?"Ճիշտ է":"Դեռ ճիշտ չէ"}</h3>
            </div>
            <p class="feedback-explanation">${a.explanation}</p>
          </div>
          <div class="feedback-dock-actions">
            <button class="button lesson-primary ${i?"":"danger"}" id="btn-aero-continue">
              Շարունակել →
            </button>
          </div>
        </div>
      `:`
        <div class="lesson-feedback-dock">
          <div class="feedback-dock-actions">
            <button class="button lesson-primary" id="btn-aero-check" ${s===null?"disabled":""}>
              Ստուգել
            </button>
          </div>
        </div>
      `}
    </div>
  `}function Xl(e,t,a,s){t.aerolab||=Hn();const n=t.aerolab,i=Dt(t);let r=!1,o=null,c=performance.now(),l=null;const u=e.querySelector("#lesson-widget-mount");if(u&&i.currentLessonId){const H=Rt[i.currentLessonId]?.steps[i.activeStep];H&&H.type==="experiment"&&(l=Sl(u,H.widgetType))}e.querySelectorAll("[data-aeromode]").forEach(C=>{C.onclick=()=>{i.activeMode=C.dataset.aeromode,B("tap"),a(),s()}}),e.querySelectorAll("[data-openlesson]").forEach(C=>{C.onclick=()=>{const H=C.dataset.openlesson;if(!Gn(i,H)){B("wrong");return}i.currentLessonId=H,i.activeStep=0,i.userPrediction=null,i.challengeSelected=null,i.challengeSubmitted=!1,i.showHint=!1,B("tap"),a(),s()}}),e.querySelectorAll("[data-closelesson]").forEach(C=>{C.onclick=()=>{i.currentLessonId=null,B("tap"),a(),s()}}),e.querySelectorAll("[data-stepadvance]").forEach(C=>{C.onclick=()=>{const H=Number(C.dataset.stepadvance);i.activeStep=H,B("tap"),a(),s()}}),e.querySelectorAll("[data-predictchoice]").forEach(C=>{C.onclick=()=>{i.userPrediction=Number(C.dataset.predictchoice),B("tap"),s()}}),e.querySelectorAll("[data-chalchoice]").forEach(C=>{C.onclick=()=>{i.challengeSubmitted||(i.challengeSelected=Number(C.dataset.chalchoice),B("tap"),s())}});const p=e.querySelector("#btn-chal-check");p&&(p.onclick=()=>{if(i.challengeSelected===null)return;i.challengeSubmitted=!0;const xe=Rt[i.currentLessonId].steps[i.activeStep].options.find(Ye=>Ye.id===i.challengeSelected);xe&&xe.correct?B("correct"):B("wrong"),a(),s()});const y=e.querySelector("#btn-chal-hint");y&&(y.onclick=()=>{i.showHint=!i.showHint,B("hint"),s()});const h=e.querySelector("#btn-chal-retry");h&&(h.onclick=()=>{i.challengeSubmitted=!1,i.challengeSelected=null,B("tap"),s()});const v=e.querySelector("#btn-lesson-finish");v&&(v.onclick=()=>{const C=Rt[i.currentLessonId];wl(t,i.currentLessonId,C?.xpReward||50),i.currentLessonId=null,i.activeStep=0,B("streak"),a(),s()}),e.querySelectorAll("[data-diymat]").forEach(C=>{C.onchange=()=>{Ml(t,C.dataset.diymat),B("tap"),a(),s()}}),e.querySelectorAll("[data-diystep]").forEach(C=>{C.onchange=()=>{kl(t,Number(C.dataset.diystep)),B("tap"),a(),s()}}),e.querySelectorAll("[data-aerotab]").forEach(C=>{C.onclick=H=>{n.tab=C.dataset.aerotab,a(),s()}});const g=e.querySelector("#toggle-vectors");g&&(g.onchange=C=>{n.showVectors=C.target.checked,s()});const m=n.rocket.params,d=e.querySelector("#param-pressure");d&&(d.oninput=C=>{m.pressureBar=Number(C.target.value),e.querySelector("#label-pressure").textContent=`${m.pressureBar} բար (մթն.)`,$()});const f=e.querySelector("#param-water");f&&(f.oninput=C=>{m.waterFraction=Number(C.target.value),e.querySelector("#label-water").textContent=`${Math.round(m.waterFraction*100)} %`,$()});const x=e.querySelector("#param-angle");x&&(x.oninput=C=>{m.angleDeg=Number(C.target.value),e.querySelector("#label-angle").textContent=`${m.angleDeg}°`,$()}),e.querySelectorAll("[data-fincount]").forEach(C=>{C.onclick=()=>{m.finCount=Number(C.dataset.fincount),$(),s()}}),e.querySelectorAll("[data-noseshape]").forEach(C=>{C.onclick=()=>{m.noseShape=C.dataset.noseshape,$(),s()}});const b=e.querySelector("#btn-launch-rocket");b&&(b.onclick=()=>{n.running?(n.running=!1,cancelAnimationFrame(o),s()):(n.rocket.status==="landed"&&$(),n.running=!0,n.rocket.status="thrust",B("control"),c=performance.now(),o=requestAnimationFrame(k),s())});const w=e.querySelector("#btn-reset-rocket");w&&(w.onclick=()=>{n.running=!1,cancelAnimationFrame(o),$(),s()});function $(){n.rocket=Nn(m)}function k(C){if(r||!n.running)return;const H=Math.min(.04,(C-c)/1e3);c=C;const xe=3,Ye=H/xe;for(let Ut=0;Ut<xe;Ut++)pl(n.rocket,Ye);if(n.rocket.status==="landed"){n.running=!1,B("complete"),s();return}M(),o=requestAnimationFrame(k)}function M(){const C=n.rocket,H=350,xe=2.5,Ye=70+C.x*xe,Ut=H-C.y*xe,ua=e.querySelector("#rocket-actor");ua&&(ua.setAttribute("transform",`translate(${Ye}, ${Ut}) scale(0.7)`),ua.innerHTML=Pn({pitch:C.pitch,finCount:m.finCount,noseShape:m.noseShape,waterRemaining:C.waterRemaining,totalWater:m.bottleVolume*m.waterFraction,status:C.status,speed:C.speed,thrust:C.thrust,showVectors:n.showVectors,gravity:C.gravity,drag:C.drag}));const os=e.querySelector("#rocket-trajectory");os&&os.setAttribute("d",Dn(C.trajectory,xe,H));const rs=e.querySelector("#val-altitude");rs&&(rs.innerHTML=`${Pe(C.y)} <small>մ</small>`);const ls=e.querySelector("#val-apogee");ls&&(ls.innerHTML=`${Pe(C.apogee)} <small>մ</small>`);const cs=e.querySelector("#val-speed");cs&&(cs.innerHTML=`${Pe(C.speed)} <small>մ/վ</small>`);const ds=e.querySelector("#val-thrust");ds&&(ds.innerHTML=`${Math.round(C.thrust)} <small>Ն</small>`);const ha=e.querySelector("#val-status");ha&&(ha.textContent=Un(C.status,C.isStable),ha.className=`telemetry-status ${C.status==="tumble"?"is-warning":"is-good"}`)}const q=e.querySelector("#tunnel-angle");q&&(q.oninput=C=>{n.tunnel.angleDeg=Number(C.target.value),s()});const I=e.querySelector("#tunnel-speed");I&&(I.oninput=C=>{n.tunnel.airSpeed=Number(C.target.value),s()});const L=e.querySelector("#drone-master-throttle");L&&(L.oninput=C=>{const H=Number(C.target.value);n.drone.motors=[H,H,H,H],s()}),["1","2","3","4"].forEach((C,H)=>{const xe=e.querySelector(`#motor-${C}`);xe&&(xe.oninput=Ye=>{n.drone.motors[H]=Number(Ye.target.value),s()})});const E=e.querySelector("#btn-drone-hover");E&&(E.onclick=()=>{n.drone.motors=[100,100,100,100],B("control"),s()});const T=e.querySelector("#btn-drone-yaw-left");T&&(T.onclick=()=>{n.drone.motors[0]=Math.min(160,n.drone.motors[0]+15),n.drone.motors[2]=Math.min(160,n.drone.motors[2]+15),n.drone.motors[1]=Math.max(20,n.drone.motors[1]-15),n.drone.motors[3]=Math.max(20,n.drone.motors[3]-15),B("control"),s()});const V=e.querySelector("#btn-drone-yaw-right");V&&(V.onclick=()=>{n.drone.motors[1]=Math.min(160,n.drone.motors[1]+15),n.drone.motors[3]=Math.min(160,n.drone.motors[3]+15),n.drone.motors[0]=Math.max(20,n.drone.motors[0]-15),n.drone.motors[2]=Math.max(20,n.drone.motors[2]-15),B("control"),s()});const D=e.querySelector("#btn-drone-tilt-fwd");D&&(D.onclick=()=>{n.drone.motors[2]=Math.min(160,n.drone.motors[2]+25),n.drone.motors[0]=Math.max(30,n.drone.motors[0]-25),B("control"),s()});const Z=e.querySelector("#btn-drone-reset");Z&&(Z.onclick=()=>{n.drone.motors=[100,100,100,100],s()});const A=e.querySelector("#param-mach");A&&(A.oninput=C=>{n.supersonic.mach=Number(C.target.value),s()}),e.querySelectorAll("[data-mach]").forEach(C=>{C.onclick=()=>{n.supersonic.mach=Number(C.dataset.mach),B("control"),s()}});const F=e.querySelector("#param-jet-throttle");F&&(F.oninput=C=>{n.jet.throttle=Number(C.target.value),s()});const j=e.querySelector("#param-jet-bpr");j&&(j.oninput=C=>{n.jet.bypassRatio=Number(C.target.value),s()});const O=e.querySelector("#param-jet-alt");O&&(O.oninput=C=>{n.jet.altitude=Number(C.target.value),s()});const qe=e.querySelector("#param-jet-speed");qe&&(qe.oninput=C=>{n.jet.airspeedKmh=Number(C.target.value),s()}),e.querySelectorAll("[data-jetpreset]").forEach(C=>{C.onclick=()=>{const H=C.dataset.jetpreset;H==="takeoff"?(n.jet.throttle=100,n.jet.bypassRatio=8.5,n.jet.altitude=0,n.jet.airspeedKmh=180):H==="cruise"?(n.jet.throttle=75,n.jet.bypassRatio=10,n.jet.altitude=10500,n.jet.airspeedKmh=850):H==="dash"?(n.jet.throttle=95,n.jet.bypassRatio=2,n.jet.altitude=5e3,n.jet.airspeedKmh=900):H==="idle"&&(n.jet.throttle=15,n.jet.bypassRatio=8.5,n.jet.altitude=1e3,n.jet.airspeedKmh=200),B("control"),s()}});const Za=e.querySelector("#param-heli-collective");Za&&(Za.oninput=C=>{n.helicopter.collective=Number(C.target.value),s()});const za=e.querySelector("#param-heli-cyclic");za&&(za.oninput=C=>{n.helicopter.cyclicPitch=Number(C.target.value),s()});const Wa=e.querySelector("#param-heli-tail");Wa&&(Wa.oninput=C=>{n.helicopter.tailPedal=Number(C.target.value),s()}),e.querySelectorAll("[data-helipreset]").forEach(C=>{C.onclick=()=>{const H=C.dataset.helipreset;H==="hover"?(n.helicopter.collective=50,n.helicopter.cyclicPitch=0,n.helicopter.tailPedal=50):H==="forward"?(n.helicopter.collective=55,n.helicopter.cyclicPitch=25,n.helicopter.tailPedal=55):H==="climb"?(n.helicopter.collective=75,n.helicopter.cyclicPitch=0,n.helicopter.tailPedal=68):H==="spinout"&&(n.helicopter.collective=80,n.helicopter.cyclicPitch=0,n.helicopter.tailPedal=10),B("control"),s()}});const Ka=e.querySelector("#param-orbit-v0");Ka&&(Ka.oninput=C=>{n.orbit.horizontalVelocityKms=Number(C.target.value),s()});const Ya=e.querySelector("#param-orbit-alt");Ya&&(Ya.oninput=C=>{n.orbit.launchAltitudeKm=Number(C.target.value),s()}),e.querySelectorAll("[data-orbitpreset]").forEach(C=>{C.onclick=()=>{const H=C.dataset.orbitpreset;H==="suborbital"?(n.orbit.horizontalVelocityKms=4.5,n.orbit.launchAltitudeKm=400):H==="leo"?(n.orbit.horizontalVelocityKms=7.67,n.orbit.launchAltitudeKm=400):H==="gto"?(n.orbit.horizontalVelocityKms=9.8,n.orbit.launchAltitudeKm=400):H==="escape"&&(n.orbit.horizontalVelocityKms=11,n.orbit.launchAltitudeKm=400),B("control"),s()}});const Qa=e.querySelector("#param-glider-speed");Qa&&(Qa.oninput=C=>{n.glider.airSpeedKmh=Number(C.target.value),s()});const Xa=e.querySelector("#param-glider-bank");Xa&&(Xa.oninput=C=>{n.glider.bankAngleDeg=Number(C.target.value),s()});const _a=e.querySelector("#param-glider-thermal");_a&&(_a.oninput=C=>{n.glider.thermalStrength=Number(C.target.value),s()});const Oa=e.querySelector("#param-glider-radius");Oa&&(Oa.oninput=C=>{n.glider.thermalRadius=Number(C.target.value),s()}),e.querySelectorAll("[data-gliderpreset]").forEach(C=>{C.onclick=()=>{const H=C.dataset.gliderpreset;H==="optimal"?(n.glider.airSpeedKmh=85,n.glider.bankAngleDeg=30,n.glider.thermalStrength=4,n.glider.thermalRadius=120):H==="level"?(n.glider.airSpeedKmh=92,n.glider.bankAngleDeg=0,n.glider.thermalStrength=0):H==="steep"?(n.glider.airSpeedKmh=95,n.glider.bankAngleDeg=55,n.glider.thermalStrength=4):H==="weak"&&(n.glider.airSpeedKmh=80,n.glider.bankAngleDeg=20,n.glider.thermalStrength=1.5,n.glider.thermalRadius=90),B("control"),s()}});const Ja=e.querySelector("#param-ion-voltage");Ja&&(Ja.oninput=C=>{n.ion.beamVoltageV=Number(C.target.value),s()});const es=e.querySelector("#param-ion-current");es&&(es.oninput=C=>{n.ion.beamCurrentA=Number(C.target.value),s()});const ts=e.querySelector("#param-ion-propellant");ts&&(ts.onchange=C=>{n.ion.propellant=C.target.value,s()});const as=e.querySelector("#param-ion-mass");as&&(as.oninput=C=>{n.ion.spacecraftMassKg=Number(C.target.value),s()}),e.querySelectorAll("[data-ionpreset]").forEach(C=>{C.onclick=()=>{const H=C.dataset.ionpreset;H==="dawn"?(n.ion.beamVoltageV=1500,n.ion.beamCurrentA=1.8,n.ion.propellant="xenon",n.ion.spacecraftMassKg=650):H==="starlink"?(n.ion.beamVoltageV=1200,n.ion.beamCurrentA=2.4,n.ion.propellant="krypton",n.ion.spacecraftMassKg=300):H==="bepi"?(n.ion.beamVoltageV=2200,n.ion.beamCurrentA=2.8,n.ion.propellant="xenon",n.ion.spacecraftMassKg=1500):H==="deepspace"&&(n.ion.beamVoltageV=1100,n.ion.beamCurrentA=1.2,n.ion.propellant="xenon",n.ion.spacecraftMassKg=490),B("control"),s()}}),e.querySelectorAll("[data-diyselect]").forEach(C=>{C.onclick=()=>{n.diySelected=C.dataset.diyselect,s()}}),e.querySelectorAll("[data-aerochoice]").forEach(C=>{C.onclick=()=>{n.quiz.submitted||(n.quiz.selected=Number(C.dataset.aerochoice),s())}});const ss=e.querySelector("#btn-aero-check");ss&&(ss.onclick=()=>{if(n.quiz.selected===null)return;n.quiz.submitted=!0;const C=ut[n.quiz.index];n.quiz.selected===C.correct&&(n.quiz.score++,B("complete")),s()});const ns=e.querySelector("#btn-aero-continue");ns&&(ns.onclick=()=>{n.quiz.index++,n.quiz.selected=null,n.quiz.submitted=!1,s()});const is=e.querySelector("#btn-restart-quiz");return is&&(is.onclick=()=>{n.quiz.index=0,n.quiz.score=0,n.quiz.selected=null,n.quiz.submitted=!1,s()}),()=>{r=!0,n.running=!1,cancelAnimationFrame(o),l&&l()}}const Ga={Orbit:Wi,Route:eo,FlaskConical:Gi,NotebookPen:zi,ChartNoAxesCombined:Li,VolumeX:no,Volume2:so,SlidersHorizontal:to,HardDrive:Di,X:oo,ArrowRight:Ei,ArrowLeft:Ii,ArrowUpRight:Ri,Clock3:Pi,CircleCheck:Fi,CircleDot:Ni,CircleDashed:Vi,Play:Xi,Pause:Ki,RotateCcw:Ji,GitCompareArrows:Hi,ChevronDown:Bi,Check:Ti,Lightbulb:Ui,LockKeyhole:ji,Pencil:Yi,Trash2:ao,Plus:_i,Menu:Zi,Rocket:Oi,Plane:Qi,Wind:io};let Es=()=>{},gt=()=>{},S=uo();const _l=performance.getEntriesByType("navigation")[0]?.type;S.lessonSession&&_l!=="reload"&&Hs(S,S.lessonSession.id);No(S,W);S.learning.selectedTopic||=W.find(e=>e.lessons.some(t=>t.id===S.currentLesson))?.id||"electricity";Ws(S);const _t=il(()=>S,Q,J);S.unlockedStage=Math.max(S.unlockedStage||0,S.stage);let _="path",de=2,he=5,K=0,Re=!1,qa=0,Ha,Da=null,ve=0,Ua=0,Je=null,$e=0,nt=null,jn=!1,Zn=!1,Ge=null;const R=e=>document.querySelector(e),Y=e=>Number(e.toFixed(1)).toLocaleString("hy-AM"),U=e=>`<i data-lucide="${e}"></i>`;function Q(){!Ws(S)&&R("#storage-warning")&&(R("#storage-warning").textContent="Պահպանման համար բրաուզերի հիշողությունն անհասանելի է։")}function De(){return _==="lesson"?"motion":_==="electric"?S.currentLesson:null}function zn(){const e=De();e&&(Ke(),gt(),gt=()=>{},Hs(S,e),de=2,he=5,K=0,Ua=0,Q())}function Wn(e){const t=De();if(!t){e();return}if(R("#lesson-exit-dialog"))return;const a=()=>{zn(),e()};Ds(S,t)?a():mi(a)}function pa(e,t=!1){if(e==="aerolab")return Ae("aerolab",!0),history.replaceState(null,"","#aerolab"),!0;if(De()&&!t)return De()===e?!0:(Wn(()=>pa(e,!0)),!1);const a=W.find(s=>s.lessons.some(n=>n.id===e));return We(S,e,W)?(S.learning.selectedTopic=a.id,Q(),e==="motion"?Ae("lesson",!0):_t.open(e)&&Ae("electric",!0),S.lessonSession={id:e,started:Date.now()},Q(),history.replaceState(null,"",`#lesson/${e}`),!0):(a&&(S.learning.selectedTopic=a.id),Q(),Ae("path",!0),!1)}function Ae(e,t=!1){const a=e==="lab"?"lesson":e;if(De()&&!t&&a!==_){Wn(()=>Ae(e,!0));return}Ke(),$e=0,nt=null,_=e==="lab"?"lesson":e,e==="lesson"&&(S.currentLesson="motion",S.lessonSession={id:"motion",started:Date.now()},Q()),Da=null,ve=0,J(),window.scrollTo(0,0),["lesson","electric"].includes(_)||history.replaceState(null,"",`#${_}`)}function Kn(e,t,a,s="thinking"){return Le(e,t,a,s)}function Ol(e){const t=["lesson","electric"].includes(_)?"path":_;return`<a class="skip-link" href="#main-content">Անցնել բովանդակությանը</a><header class="site-header" data-screen="${_}"><div class="header-inner"><a class="brand" href="#home" aria-label="Ֆիզիկան շուրջդ է՝ գլխավոր էջ"><span class="brand-symbol">${U("orbit")}</span><span>Ֆիզիկան <span class="brand-second">շուրջդ է</span></span></a><div class="audio-controls" role="group" aria-label="Ձայնի կառավարում"><button id="sound" class="icon-button sound-button" aria-label="${Me().enabled?"Անջատել ձայնը":"Միացնել ձայնը"}" title="${Me().enabled?"Անջատել ձայնը":"Միացնել ձայնը"}" aria-pressed="${Me().enabled}">${U(Me().enabled?"volume-2":"volume-x")}</button><span id="sound-status" class="sr-only" role="status" aria-live="polite"></span></div><button id="nav-toggle" class="icon-button nav-toggle" aria-label="Բացել բաժինները" aria-expanded="false" aria-controls="main-nav">${U("menu")}</button><nav id="main-nav" aria-label="Հիմնական բաժիններ">${lo.map(([a,s,n])=>`<button data-page="${a}" class="nav-item ${t===a?"active":""}" ${t===a?'aria-current="page"':""}>${U(n)}<span>${s}</span></button>`).join("")}</nav></div></header><div class="main-shell" data-screen="${_}"><div class="page-layout ${_==="path"&&S.learning.selectedTopic?"with-context":""}"><main id="main-content" tabindex="-1">${e}</main>${_==="path"&&S.learning.selectedTopic?cl(S):""}</div><footer><span>Ֆիզիկան շուրջդ է <span class="footer-dot">·</span> 9-րդ դասարան</span><span>${U("hard-drive")} Քո գրառումները պահվում են այս սարքում</span></footer><p id="storage-warning" role="status"></p></div><dialog id="audio-dialog" aria-labelledby="audio-title"><button class="dialog-close icon-button" id="close-audio" aria-label="Փակել">${U("x")}</button><span class="eyebrow">Ձայնի կարգավորումներ</span><h2 id="audio-title">Սովորելու հանգիստ միջավայր</h2><p>Կարճ, մեղմ ձայնային էֆեկտներ՝ փորձը սկսելիս, ճիշտ պատասխանի ու պահպանված գրառման համար։ Երաժշտություն չկա։</p><label class="volume-label">Ձայնի մակարդակ <input id="volume" type="range" min="0" max="100" value="${Me().volume}" aria-label="Ձայնի մակարդակ"></label><button class="button" id="enable-sound" type="button">Միացնել ձայնը</button><button class="button secondary" id="mute">${U("volume-x")} Անջատել ձայնը</button><p class="audio-note"><span id="audio-status" role="status">${Me().enabled?"Ձայնը միացված է։":"Ձայնն անջատված է։ Միացրու այն, երբ ցանկանաս։"}</span><br>Տեղային ձայնային էֆեկտներ՝ Kenney · CC0։</p></dialog>`}function Jl(){const e=[...ze,...ft,...Bt].find(s=>s.id===S.currentLesson),t=e?S.investigations?.[e.id]||S.electricLessons?.[e.id]:null,a=e?!!t?.completed:!!S.assessment;return`<section class="hero guided-home"><div class="home-welcome">${$t(rn()?"idle":"greeting","","home:greeting")}<div class="welcome-dialogue"><span class="eyebrow">Ֆիզիկան շուրջդ է</span><h1>Բարև՛, հետազոտող։</h1><p>${e?e.context:"Փոքր լույս, շարժվող ռոբոտ, անտեսանելի ուժեր։ Ընտրենք մի հարց և պատասխանը գտնենք փորձով։"}</p></div></div><div class="home-next"><span>${e?"Քո ընթացիկ բացահայտումը":S.currentLesson==="motion"?"Շարժում և արագություն":"Քո առաջին բացահայտումը"} · ${a?"Ավարտված":`Քայլ ${Math.min(ze.some(s=>s.id===e?.id)?11:ft.some(s=>s.id===e?.id)?10:6,(e?t?.stage||0:S.stage)+1)} / ${ze.some(s=>s.id===e?.id)?11:ft.some(s=>s.id===e?.id)?10:6}`}</span><h2>${e?e.title:S.currentLesson==="motion"?"Փոքր ռոբոտի մեծ ճանապարհը":"Սկսենք քեզ հետաքրքրող թեմայից"}</h2><button class="button" ${e?`data-module="${e.id}"`:S.currentLesson==="motion"?'data-module="motion"':'data-page="path"'}>${a?"Վերադառնալ դասին":(e?t?.stage:S.stage)?"Շարունակել դասը":"Սկսել դասը"} ${U("arrow-right")}</button></div></section><div class="home-quiet-links"><button class="text-button" data-page="path">Բոլոր թեմաները ${U("arrow-right")}</button></div>`}function ec(e=!1){const t=S.runs.at(-1),a=S.runs.find(s=>s.id===Ge)||S.runs.at(-2)||t;return`<section class="sim-panel" aria-label="Շարժման փորձ"><div class="scene-wrap"><div class="scene-heading"><span>${U("flask-conical")} Հավասարաչափ շարժում</span><span class="status" id="sim-status" role="status">${K===he?"Փորձն ավարտված է":Re?"Շարժվում է":K?"Դադարեցված":"Պատրաստ է փորձին"}</span></div>${Ks("lab",Ve(de,K)/60)}<div class="readouts" aria-label="Փորձի կենդանի չափումներ"><div><span>Անցած ժամանակ</span><strong id="read-time">${Y(K)} <small>վ</small></strong></div><div><span>Անցած ճանապարհ</span><strong id="read-distance">${Y(Ve(de,K))} <small>մ</small></strong></div><div><span>Արագություն</span><strong id="read-speed">${Y(de)} <small>մ/վ</small></strong></div></div></div><div class="sim-controls"><div class="slider-field"><label for="speed">Արագություն <strong id="speed-label">${Y(de)} մ/վ</strong></label><input id="speed" type="range" min="1" max="6" step=".5" value="${de}"><div class="range-extents"><span>1 մ/վ</span><span>6 մ/վ</span></div></div><div class="slider-field"><label for="duration">Տևողություն <strong id="duration-label">${he} վ</strong></label><input id="duration" type="range" min="2" max="10" step="1" value="${he}"><div class="range-extents"><span>2 վ</span><span>10 վ</span></div></div><div class="pointing-actions">${e?"":$t("point-right","Պատրա՞ստ ես փորձել։","motion:run")}<div class="sim-actions"><button class="button" id="run">${U(Re?"pause":"play")} ${Re?"Դադարեցնել":K&&K<he?"Շարունակել":"Սկսել փորձը"}</button><button class="icon-button reset-button" id="reset" aria-label="Փորձը սկսել սկզբից" title="Փորձը սկսել սկզբից">${U("rotate-ccw")}</button></div></div></div><p class="control-note">Կարգավորումը փոխելիս ընթացիկ փորձը սկսվում է սկզբից։ Ավարտված փորձերը պահպանվում են։</p></section><div class="experiment-analysis"><details id="graph-details" ${jn?"open":""}><summary>${U("chart-no-axes-combined")} Դիտել շարժման գրաֆիկը ${U("chevron-down")}</summary><div class="graph-wrap"><div class="graph-header"><div><h3>Ճանապարհը՝ ժամանակից կախված</h3><p>Ավելի կտրուկ գիծ՝ ավելի մեծ արագություն։</p></div>${S.runs.length?`<label class="compare-select">Համեմատել փորձի հետ<select id="compare-run"><option value="none" ${Ge==="none"?"selected":""}>Միայն ընթացիկը</option>${S.runs.slice(-6).map((s,n)=>`<option value="${s.id}" ${Ge!=="none"&&s.id===a?.id?"selected":""}>${Y(s.speed)} մ/վ · ${s.duration} վ → ${Y(s.distance)} մ</option>`).join("")}</select></label>`:""}</div><svg id="graph" viewBox="0 0 480 230" role="img" aria-label="Ճանապարհի և ժամանակի գրաֆիկ">${ja()}</svg><div class="graph-legend"><span><b class="legend-current"></b> Ընթացիկ փորձ</span>${S.runs.length&&Ge!=="none"?'<span><b class="legend-previous"></b> Ընտրված փորձ</span>':""}</div></div></details><details id="runs-details" ${Zn?"open":""}><summary>${U("git-compare-arrows")} Համեմատել արդյունքները <span class="run-count">${S.runs.length} փորձ</span>${U("chevron-down")}</summary><section class="runs">${S.runs.length?`<p class="comparison-intro">Փոխիր մեկ մեծություն, ապա համեմատիր անցած ճանապարհները։</p><div class="table-scroll"><table><thead><tr><th>Փորձ</th><th>Արագություն</th><th>Ժամանակ</th><th>Ճանապարհ</th></tr></thead><tbody>${S.runs.slice(-6).map((s,n)=>`<tr><td>${Math.max(0,S.runs.length-6)+n+1}</td><td>${Y(s.speed)} մ/վ</td><td>${s.duration} վ</td><td>${Y(s.distance)} մ</td></tr>`).join("")}</tbody></table></div>`:"<p>Այստեղ կտեսնես ավարտված փորձերը։ Սկսիր առաջինից։</p>"}</section></details></div>`}function ja(){const e=Ge==="none"?null:S.runs.find(n=>n.id===Ge)||S.runs.at(-2)||S.runs.at(-1),t=Math.max(10,Math.ceil(Math.max(de*he,e?.distance||0)/10)*10),a=Math.max(he,e?.duration||0),s=hs(de,K,a,t);return`<text x="17" y="20" font-size="16">s (մ)</text>${[0,t/3,t*2/3,t].map(n=>`<path d="M52 ${170-n/t*140}h400" stroke="#dddfd4"/><text x="42" y="${175-n/t*140}" text-anchor="end" font-size="14">${Y(n)}</text>`).join("")}${Array.from({length:6},(n,i)=>a*i/5).map(n=>`<text x="${52+n/a*400}" y="197" text-anchor="middle" font-size="14">${Y(n)}</text>`).join("")}<path d="M52 30v140h400" stroke="#87917a" fill="none"/><text x="428" y="223" font-size="15">t (վ)</text>${e?(()=>{const n=hs(e.speed,e.duration,a,t);return`<path d="M52 170 L${n.x} ${n.y}" stroke="#b56b50" stroke-width="2" stroke-dasharray="6 5" fill="none"/>`})():""}<path d="M52 170 L${s.x} ${s.y}" stroke="#58634d" stroke-width="3" fill="none"/><circle cx="${s.x}" cy="${s.y}" r="4" fill="#58634d"/>`}function tc(){if($e>=ht.length)return Le(`<div class="story"><span class="eyebrow">Քո հաջորդ գիտական քայլը</span><h2>Իսկ ինչպե՞ս կստուգես սա։</h2><p>Մի նոր փորձ առաջարկիր։ Նշիր՝ ինչ ես փոխելու, և ինչն է մնալու նույնը։</p><label class="field-label" for="verify">Իմ փորձի ծրագիրը</label><textarea id="verify" placeholder="Փոխելու եմ միայն…">${yt(S.verification||"")}</textarea><button id="next-stage" class="button">Բացահայտել կապը ${U("arrow-right")}</button></div>`,"motion:verification","","thinking");const e=$e,t=ht[e],a=S.answers[e],s=nt??a,n=a!==void 0&&s===a,i=a===t.correct;return Kn(`<div class="story observation-story"><span class="eyebrow">Դիտարկում ${e+1} / ${ht.length}</span><h2>${t.q}</h2><p>Մտածիր քո կատարած փորձերի մասին։</p>${t.options.map((r,o)=>`<button class="answer ${s===o?"selected":""}" data-observe="${e}:${o}" aria-pressed="${s===o}" ${i?"disabled":""}>${r}${s===o?U(i?"check":"circle-dot"):""}</button>`).join("")}${n?`<p class="feedback ${i?"correct":""}" role="status">${i?"Ճիշտ է։ "+t.why:"Վերադառնանք փորձին։ "+t.hints[Math.min(ve,2)]}</p>${!i&&ve<2?`<button class="text-button" data-hint="${e}">${U("lightbulb")} Հաջորդ հուշումը</button>`:""}`:""}${i?'<button id="next-observation" class="button">Շարունակել '+U("arrow-right")+"</button>":""}${i?"":`<button id="submit-observation" class="button" ${s===void 0?"disabled":""}>Ստուգել դիտարկումը</button>`}<button class="text-button revisit" id="revisit-experiment">${U("flask-conical")} Նորից դիտել փորձը</button></div>`,`motion:observation:${e}:answer:${a}:hint:${ve}`,ve>0&&!i?"Նոր հուշում․ փորձիր այս մտքով։":"Մտածիր քո փորձերի մասին։",!i&&n?ve>0?"eureka":"confused":"thinking")}function ac(){let e=S.stage;return`<div class="lesson-top"><button class="text-button" data-page="path">${U("arrow-left")} Ուսումնական ուղի</button><div class="lesson-stage">${e+1} / 6</div><label class="stage-picker"><select id="stage-select" aria-label="Վերադառնալ դասի քայլին">${co.slice(0,S.unlockedStage+1).map((t,a)=>`<option value="${a}" ${a===e?"selected":""}>${t}</option>`).join("")}</select></label></div><div class="lesson-context"><h1>Փոքր ռոբոտի մեծ ճանապարհը</h1></div><div class="lesson-track" role="progressbar" aria-label="Հետազոտության ավարտված քայլերը" aria-valuemin="0" aria-valuemax="6" aria-valuenow="${S.assessment?6:e}"><span style="width:${(S.assessment?6:e)/6*100}%"></span></div><section class="lesson-content">${e===0?`${Le(`<div class="story"><h2>Ինձ օգնի՛ր առաքումը հասցնել։</h2><p>Միջանցքով փաթեթ եմ տանում։ Եթե ավելի արագ շարժվեմ, նույն ժամանակում ավելի հեռու կհասնե՞մ։ Նախ կանխատեսիր, հետո ինձ հետ փորձ կատարիր։</p><button id="next-stage" class="button">Անել կանխատեսում ${U("arrow-right")}</button></div>`,"motion:begin","","point-left")}${Ks("intro")}`:e===1?Kn(`<div class="story"><span class="eyebrow">Նախ մտածիր, հետո փորձիր</span><h2>Իսկ եթե ռոբոտը երկու անգամ արագ շարժվի՞։</h2><p>Շարժման ժամանակը նույնն է մնում։ Ի՞նչ կլինի անցած ճանապարհի հետ։</p>${Jt.map((t,a)=>`<button class="answer ${S.prediction===a?"selected":""}" data-predict="${a}" aria-pressed="${S.prediction===a}"><span>${String.fromCharCode(1329+a)}</span>${t}${S.prediction===a?U("check"):""}</button>`).join("")}${S.prediction!==null?'<p class="feedback" role="status">Կանխատեսումը գրանցված է։ Հիմա ստուգենք այն փորձով։</p><button id="next-stage" class="button">Ստուգել փորձով '+U("arrow-right")+"</button>":""}</div>`,"motion:prediction","Նախ մտածիր, հետո ընտրիր։"):e===2?`${un("<h2>Եկ ստուգենք քո կանխատեսումը։</h2><p>Նախ ընտրիր 2 մ/վ արագություն և 5 վ տևողություն։ Հետո կրկնապատկիր միայն արագությունը ու համեմատիր արդյունքները։</p>","point-right","motion:experiment")}${ec(!0)}<div class="stage-bottom"><div><span class="eyebrow">Քո հաջորդ քայլը</span><p>Համեմատիր 2 մ/վ և 4 մ/վ արագությունները նույն՝ 5 վ տևողությամբ։</p></div><button id="next-stage" class="button secondary" ${S.runs.length?"":"disabled"}>Գրանցել դիտարկումը ${U("arrow-right")}</button></div>`:e===3?tc():e===4?ic():oc()}</section>`}function sc(){R("#nav-toggle").onclick=()=>{const e=R("#nav-toggle").getAttribute("aria-expanded")==="true";R("#nav-toggle").setAttribute("aria-expanded",String(!e)),R("#nav-toggle").setAttribute("aria-label",e?"Բացել բաժինները":"Փակել բաժինները"),R("#main-nav").classList.toggle("mobile-open",!e),e||ee(R("#main-nav"),[{opacity:0,transform:"translateY(-4px)"},{opacity:1,transform:"translateY(0)"}],{duration:180})},R("#graph-details")?.addEventListener("toggle",e=>{jn=e.target.open,xa(e.target)}),R("#runs-details")?.addEventListener("toggle",e=>{Zn=e.target.open,xa(e.target)}),R("#compare-run")?.addEventListener("change",e=>{Ge=e.target.value,R("#graph").innerHTML=ja(),R("#graph").setAttribute("aria-label",`Ճանապարհը՝ ${Y(Ve(de,K))} մ, ժամանակը՝ ${Y(K)} վ։`);const t=R(".legend-previous")?.parentElement;t?t.hidden=Ge==="none":Ge!=="none"&&R(".graph-legend").insertAdjacentHTML("beforeend",'<span><b class="legend-previous"></b> Ընտրված փորձ</span>')}),R("#stage-select")?.addEventListener("change",e=>{Ke(),S.stage=Number(e.target.value),$e=0,nt=null,ve=0,Q(),J()}),R("#next-observation")?.addEventListener("click",()=>{$e++,nt=null,ve=0,J()}),R("#revisit-experiment")?.addEventListener("click",()=>{S.stage=2,Q(),J()}),R("#verify")?.addEventListener("input",e=>{S.verification=e.target.value,Q()}),R("#conclusion")?.addEventListener("input",e=>{S.conclusion=e.target.value,Q()}),_==="home"&&!S.mascotSeen&&(S.mascotSeen=!0,Q())}function Yn(e,t,a,s=""){return`<div class="page-heading"><div><span class="eyebrow">${e}</span><h1>${t}</h1><p>${a}</p></div>${s}</div>`}function nc(){return rl(S)}function ic(){const e=S.runs.at(-1)||{speed:2,duration:5,distance:10},t=S.prediction!==null&&Jt[S.prediction]?Jt[S.prediction]:"Գրանցված չէ";return Le(`<div class="story"><span class="eyebrow">ՔՈ ՓՈՐՁԻ ԱՊԱՑՈՒՅՑԸ</span><h2>Երեք մեծություն։ Մի պարզ կապ։</h2><p>Հաստատուն արագությամբ շարժվելիս անցած ճանապարհը գտնում ենք արագությունը բազմապատկելով ժամանակով։</p><div class="prediction-comparison"><p><strong>Քո կանխատեսումն էր՝</strong> «${yt(t)}»։</p><p><strong>Փորձով չափեցինք՝</strong> «${Y(e.speed)} մ/վ × ${e.duration} վ = ${Y(e.distance)} մ»։</p></div><div class="formula"><div><strong>s</strong><span>ճանապարհ, մ</span></div><b>=</b><div><strong>v</strong><span>արագություն, մ/վ</span></div><b>×</b><div><strong>t</strong><span>ժամանակ, վ</span></div></div><div class="evidence"><span>ՔՈ ՎԵՐՋԻՆ ՓՈՐՁԸ</span><h3>${Y(e.speed)} մ/վ × ${e.duration} վ = ${Y(e.distance)} մ</h3><p>Ամեն վայրկյան՝ ${Y(e.speed)} մետր։ ${e.duration} վայրկյանում՝ ${Y(e.distance)} մետր։</p></div><details><summary>Ավելի մանրամասն՝ միջին արագության մասին</summary><p>Միջին արագությունը ամբողջ անցած ճանապարհի և ամբողջ ժամանակի հարաբերությունն է՝ v<sub>միջ</sub> = s / t։ Հավասարաչափ շարժման դեպքում այն հավասար է հաստատուն արագությանը։ Եթե ճանապարհին կանգնես, կանգառի ժամանակն էլ պետք է հաշվել։</p></details><button id="next-stage" class="button">Փորձել նոր իրավիճակում ${U("arrow-right")}</button></div>`,"motion:explanation","","thinking")}function oc(){if(S.assessment){const e=Ht(S,"motion",W),t=on(S.assessment.score,3),a=t>=2?(e?`<button class="button lesson-primary" data-module="${e.id}">Հաջորդ դասը →</button>`:"")+'<button class="text-button" id="retry-quiz">Կրկնել դասը</button><button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>':'<button class="button lesson-primary" id="retry-quiz">Կրկին փորձել</button><button class="text-button" data-page="path">Վերադառնալ ուսումնական ուղի</button>';return Le(`<div class="story"><span class="eyebrow">ՀԵՏԱԶՈՏՈՒԹՅՈՒՆԸ ԱՎԱՐՏՎԱԾ Է</span><h2>Դու արդեն մտածում ես որպես հետազոտող։</h2><p>Առաջին փորձից ճիշտ պատասխաններ՝ ${S.assessment.score} / 3։ Դու կանխատեսեցիր, փորձ կատարեցիր և բացատրեցիր կապը։ ${S.assessment.score<3?"Վերանայիր ժամանակի և ճանապարհի կապը՝ նոր փորձով։":"Այժմ կարող ես կապը կիրառել նոր իրավիճակներում։"}</p><div class="evidence"><h3>Ի՞նչ ցույց տվեցիր</h3><p>Հաստատուն արագությամբ՝ s = v × t։ Միջին արագությունը գտնելու համար հաշվում ենք ամբողջ ժամանակը։</p></div><label class="field-label" for="conclusion">Քո վերջնական եզրակացությունը</label><textarea id="conclusion" placeholder="Այս փորձից հասկացա, որ…">${yt(S.conclusion||"")}</textarea><button class="button secondary" id="save-lesson">Պահպանել տետրում ${U("notebook-pen")}</button>${ra(S.motionFlow||{})}${rt(t)}${a}<p id="note-status" role="status"></p></div>`,`motion:complete:${S.assessment.created}`,"","celebration")}return Le(`<div class="story">${ia(S.motionFlow||={},Qn())}</div>`,`motion:assessment:${S.motionFlow?.assessmentFlow?.machine.phase}:${S.motionFlow?.assessmentFlow?.machine.index}`,"",na(S.motionFlow))}function Qn(){return po.map((e,t)=>({...e,type:"choice",question:e.q,weight:1,why:["Ճանապարհը՝ 4 մ/վ × 5 վ = 20 մ։","Նույն արագությամբ կրկնակի ժամանակը տալիս է կրկնակի ճանապարհ՝ 20 մ և 10 մ։","Միջին արագությունը՝ 10 մ / (5 վ + 5 վ) = 1 մ/վ։ Կանգառը նույնպես մտնում է ամբողջ ժամանակի մեջ։"][t]}))}function rc(){return Yn("ՔՈ ԳԻՏԱԿԱՆ ՀԵՏՔԸ","Հետազոտական տետր","Պահպանիր հարցերդ, ապացույցներդ և այն, ինչ հասկացար։",'<button class="button" id="new-note">'+U("plus")+" Նոր գրառում</button>")+`<div class="notebook-layout"><div class="journal-margin"><span>01</span><p>Քո փորձերն ու<br>բացահայտումները</p><small>${S.notes.length} գրառում</small></div><div>${Je!==null?lc():""}${S.notes.length?S.notes.map(e=>`<article class="note"><div class="section-title"><span class="eyebrow">${new Date(e.created).toLocaleDateString("hy-AM")} · ՀԵՏԱԶՈՏՈՒԹՅՈՒՆ 01</span><div><button class="icon-button" data-edit="${e.id}" aria-label="Խմբագրել գրառումը">${U("pencil")}</button><button class="icon-button" data-delete="${e.id}" aria-label="Ջնջել գրառումը">${U("trash-2")}</button></div></div><h3>${yt(e.lessonTitle||"Շարժում, ճանապարհ, ժամանակ")}</h3>${[["Կանխատեսում",e.prediction],["Փորձի կարգավորումներ",e.settings],["Դիտարկում",e.observation],["Բացատրություն",e.explanation],["Եզրակացություն",e.conclusion]].map(([t,a])=>`<div class="note-field"><span>${t}</span><p>${yt(a)||"Դեռ չի լրացվել"}</p></div>`).join("")}</article>`).join(""):'<div class="notebook-empty">'+U("notebook-pen")+'<h2>Այստեղ կմնան քո բացահայտումները։</h2><p>Սկսիր փորձից կամ ստեղծիր առաջին գրառումդ։</p><button class="text-button" data-page="lesson">Սկսել դասը →</button></div>'}</div></div>`}function lc(){const e=S.notes.find(t=>t.id===Je)||{};return`<form id="note-form" class="note"><h3>${e.id?"Խմբագրել գրառումը":"Նոր հետազոտական գրառում"}</h3>${[["prediction","Կանխատեսում"],["settings","Փորձի կարգավորումներ"],["observation","Դիտարկում"],["explanation","Բացատրություն"],["conclusion","Եզրակացություն"]].map(([t,a])=>`<label class="field-label" for="note-${t}">${a}</label><textarea id="note-${t}" name="${t}">${yt(e[t]||"")}</textarea>`).join("")}<button class="button" type="submit">Պահպանել</button><button class="text-button" id="cancel-note" type="button">Չեղարկել</button></form>`}function cc(){const e=new Set([...Object.keys(S.electricLessons||{}),...Object.keys(S.investigations||{})]);return(S.lessonAttemptArchives||[]).reduce((t,a)=>t+(a.record.runs?.length||a.record.experiments?.length||0),0)+S.runs.length+[...e].reduce((t,a)=>t+(S.investigations?.[a]?.runs.length??S.electricLessons?.[a]?.experiments?.length??0),0)}function dc(){const e=[...S.lessonAttemptArchives||[]].reverse().find(s=>s.lessonId==="motion"&&s.record.assessment)?.record,t=S.assessment||e?.assessment,a=Object.keys(S.answers||{}).length?S.answers:e?.answers||{};return ht.filter((s,n)=>a[n]===s.correct).length,Yn("ԱՊԱՑՈՒՅՑԻ ՎՐԱ ՀԻՄՆՎԱԾ","Իմ առաջընթացը","Կարևոր է ոչ թե արագ ավարտել, այլ հասկանալ։")+ll(S)+`<div class="presence-overview">${$t(t?"success-complete":"idle-secondary","Ամեն փորձից՝ մի նոր բացահայտում։",`motion:progress:${t?.created||"first"}`)}<div class="progress-stats"><div><strong>${Object.values(S.learning.lessons).filter(s=>s.attempts?.length).length}</strong><span>Ավարտված հետազոտություն</span></div><div><strong>${cc()}</strong><span>Կատարված փորձ</span></div><div><strong>${S.notes.length}</strong><span>Գրառում տետրում</span></div></div></div><section class="note"><h2>Շարժում և արագություն</h2>${ht.map((s,n)=>`<div class="concept">${U(a[n]===s.correct?"circle-check":"circle-dashed")}<span>${["Արագության և ճանապարհի կապը","Ժամանակի և ճանապարհի կապը","Հաստատուն արագություն"][n]}</span><small>${a[n]===s.correct?"Ցույց ես տվել":"Դեռ ուսումնասիրելու ենք"}</small></div>`).join("")}<p>${t?`Գիտելիքի ստուգում՝ ${t.score} / 3 ճիշտ պատասխան առաջին փորձից։`:"Գիտելիքի ստուգումը դեռ չի կատարվել։"}</p>${t?.score<3?'<p class="feedback">Լրացուցիչ փորձիր կանգառով շարժման միջին արագության հարցը։</p>':""}<button class="button" data-page="lesson">Վերադառնալ հետազոտությանը ${U("arrow-right")}</button></section><section class="electric-progress"><h2>Նոր հետազոտությունները</h2>${Bt.map(s=>{const n=S.electricLessons?.[s.id];return n?`<div class="recent-run"><span>${s.title}</span><span>${n.completed?"Ավարտված է":`Քայլ ${n.stage+1} / 6`} · ${(n.experiments||[]).length} գրանցված փորձ</span><button class="text-button" data-module="${s.id}">Շարունակել</button></div>`:""}).join("")||"<p>Ընտրիր մի նոր հարց ուսուցման ճանապարհից։</p>"}</section><section class="runs"><h3>Վերջին փորձերը</h3>${S.runs.slice(-4).reverse().map(s=>`<div class="recent-run">${U("flask-conical")}<span>${Y(s.speed)} մ/վ · ${s.duration} վ</span><strong>${Y(s.distance)} մ</strong></div>`).join("")||'<p class="muted">Առաջին փորձը դեռ առջևում է։</p>'}</section>`}function yt(e){return String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function J(){const e=bi(R("#app"));gt();const t=document.createElement("div");if(t.id="app",t.innerHTML=Ol({home:Jl,path:nc,aerolab:()=>Rl(S),lesson:ac,electric:()=>_t.view(),notebook:rc,progress:dc}[_]()),dn(R("#app"),t),Es(),["lesson","electric"].includes(_)){const a=R(".lesson-content");if(!a.querySelector(".lesson-feedback-dock, .lesson-action-dock")){const n=a.querySelector(".lesson-primary")||a.querySelector("#next-stage, #next-observation, #submit-quiz, #submit-observation, #save-lesson, #electric-next, #electric-submit-observation, #electric-check, #electric-save-reflection, #foundation-next, #foundation-check, #foundation-assess, #foundation-retry")||a.querySelector("#measure-electric");if(n&&!n.closest(".assessment-feedback, .lesson-feedback-dock")){const i=document.createElement("div");i.className="lesson-action-dock",n.replaceWith(i),i.append(n);const r=a.querySelector(".science-controls,.circuit-tools,.sim-controls");r?r.after(i):a.append(i)}}R("#main-content").classList.add("focused-lesson")}R(".learning-summary")&&R("#main-content").classList.add("completion-screen"),La({icons:Ga}),pc(),sc(),Es=Er(R("#app")),_==="electric"?gt=_t.bind(R("#main-content")):_==="aerolab"&&(gt=Xl(R("#main-content"),S,Q,J)),fo(R("#main-content"),{view:_==="electric"?_t.key():_==="lesson"?`${_}:${S.stage}:${S.stage===3?$e:S.stage===5?Ua:0}`:_,selection:_==="lesson"?S.stage===1?S.prediction:S.stage===3?S.answers[$e]:Da:null,feedback:R(".feedback")?.textContent||"",hint:ve,runs:S.runs.length}),yi(R("#app"),e)}function Ke(){Re=!1,cancelAnimationFrame(Ha)}function Rs(){Ke(),K=0,aa()}function aa(){if(!R("#read-time"))return;R("#read-time").innerHTML=`${Y(K)} <small>վ</small>`,R("#read-distance").innerHTML=`${Y(Ve(de,K))} <small>մ</small>`,R("#read-speed").innerHTML=`${Y(de)} <small>մ/վ</small>`,R("#robot-lab").setAttribute("transform",`translate(${110+Ve(de,K)/60*680} 270)`);const e=matchMedia("(prefers-reduced-motion: reduce)").matches?0:Zs(Ve(de,K));document.querySelectorAll("#robot-lab [data-wheel-rotor]").forEach(a=>a.setAttribute("transform",`rotate(${e})`)),R("#graph").innerHTML=ja(),R("#graph").setAttribute("aria-label",`Ճանապարհը՝ ${Y(Ve(de,K))} մ, ժամանակը՝ ${Y(K)} վ։`);const t=K===he?"Փորձն ավարտված է":Re?"Շարժվում է":K?"Դադարեցված":"Պատրաստ է փորձին";R("#sim-status").textContent!==t&&(R("#sim-status").textContent=t),R("#run").innerHTML=U(Re?"pause":"play")+" "+(Re?"Դադարեցնել":K&&K<he?"Շարունակել":"Սկսել փորձը"),La({icons:Ga,root:R("#run")})}function Xn(e){if(Re){if(K=ro(K,(e-qa)/1e3,he),qa=e,K>=he){Ke(),B("complete"),S.runs.push({id:crypto.randomUUID(),speed:de,duration:he,distance:Ve(de,he),created:Date.now()}),Q(),J();return}aa(),Ha=requestAnimationFrame(Xn)}}function Ls(){const e=S.runs.at(-1),t={id:S.motionNoteId||=crypto.randomUUID(),created:Date.now(),lessonId:"motion",prediction:Jt[S.prediction]||"",settings:e?`${e.speed} մ/վ, ${e.duration} վ, ${e.distance} մ`:"",observation:S.verification||"Արագությունն ու տևողությունն ազդում են անցած ճանապարհի վրա։",explanation:"Հաստատուն արագությամբ՝ s = v × t։",conclusion:S.conclusion},a=S.notes.find(s=>s.id===t.id);a?Object.assign(a,t):S.notes.push(t),Q()}function qt(e=""){const t=Me(),a=t.enabled?"Անջատել ձայնը":"Միացնել ձայնը",s=R("#sound");s&&(s.innerHTML=U(t.enabled?"volume-2":"volume-x"),s.setAttribute("aria-pressed",String(t.enabled)),s.setAttribute("aria-label",a),s.title=a,La({icons:Ga}));const n=R("#volume");n&&(n.value=t.volume);const i=R("#enable-sound");i&&(i.disabled=t.enabled);const r=R("#mute");r&&(r.disabled=!t.enabled);const o=e||(t.enabled?"Ձայնը միացված է։":"Ձայնն անջատված է։"),c=R("#audio-status");c&&(c.textContent=o);const l=R("#sound-status");l&&(l.textContent=o)}function pc(){document.querySelectorAll("[data-page]").forEach(i=>i.onclick=()=>Ae(i.dataset.page)),document.querySelectorAll("[data-module]").forEach(i=>i.onclick=()=>pa(i.dataset.module)),document.querySelectorAll("[data-topic]").forEach(i=>i.onclick=()=>{S.learning.selectedTopic=i.dataset.topic,Q(),Ae("path")}),document.querySelectorAll("[data-choose-topics]").forEach(i=>i.onclick=()=>{S.learning.selectedTopic=null,Q(),Ae("path")}),document.querySelectorAll("[data-locked]").forEach(i=>i.onclick=()=>{const r=W.flatMap(o=>o.lessons).find(o=>o.id===i.dataset.locked);R("#path-message").textContent=r.playable?"Այս դասը բացելու համար նախորդ դասից ստացիր առնվազն երկու աստղ։":"Այս դասը դեռ նախապատրաստվում է։ Աշխատող դասերը նշված են որպես հասանելի։",R("#path-message").scrollIntoView({block:"nearest"})}),R(".brand").onclick=i=>{i.preventDefault(),Ae("home")},R("#sound").onclick=()=>{di(),qt()};const e=R("#audio-settings");e&&(e.onclick=()=>R("#audio-dialog")?.showModal());const t=R("#close-audio");t&&(t.onclick=()=>R("#audio-dialog")?.close());const a=R("#enable-sound"),s=R("#mute"),n=R("#volume");if(a&&(a.disabled=Me().enabled,a.onclick=()=>{Ns(),qt()}),s&&(s.disabled=!Me().enabled,s.onclick=()=>{Ps(),qt()}),n&&(n.oninput=i=>{pi(i.target.value),qt()}),_==="lesson"&&S.stage===5&&!S.assessment){oa(document,S.motionFlow||={},Qn(),Q,J,(i,r)=>{S.assessment={score:i.filter(o=>o.correct).length,created:Date.now(),review:r},xt(S,"motion",S.assessment.score,3,{questions:i,review:r},W),S.motionNoteId=null,Ls()});return}R("#run")?.addEventListener("click",()=>{B("control"),Re?(Ke(),aa()):(K>=he&&(K=0),Re=!0,qa=performance.now(),aa(),Ha=requestAnimationFrame(Xn))}),R("#reset")?.addEventListener("click",Rs);for(const i of["speed","duration"])R("#"+i)?.addEventListener("input",r=>{i==="speed"?de=Number(r.target.value):he=Number(r.target.value),Rs(),R("#"+i+"-label").textContent=Y(i==="speed"?de:he)+(i==="speed"?" մ/վ":" վ")});R("#next-stage")?.addEventListener("click",()=>{B("control"),R("#verify")&&(S.verification=R("#verify").value),S.stage=Math.min(5,S.stage+1),$e=0,S.unlockedStage=Math.max(S.unlockedStage,S.stage),Q(),ve=0,J(),window.scrollTo(0,0)}),document.querySelectorAll("[data-stage]").forEach(i=>i.onclick=()=>{Ke(),S.stage=Number(i.dataset.stage),$e=0,Q(),J()}),document.querySelectorAll("[data-predict]").forEach(i=>i.onclick=()=>{S.prediction=Number(i.dataset.predict),Q(),J()}),document.querySelectorAll("[data-observe]").forEach(i=>i.onclick=()=>{R("#verify")&&(S.verification=R("#verify").value);let[r,o]=i.dataset.observe.split(":").map(Number);nt=o,ve=0,Q(),J()}),R("#submit-observation")?.addEventListener("click",()=>{const i=nt??S.answers[$e];i!==void 0&&(S.answers[$e]=i,nt=null,i===ht[$e].correct?B("correct"):B("incorrect"),Q(),J())}),document.querySelectorAll("[data-hint]").forEach(i=>i.onclick=()=>{ve++,B("hint"),J()}),document.querySelectorAll("[data-quiz]").forEach(i=>i.onclick=()=>{Da=Number(i.dataset.quiz),J()}),R("#quiz-hint")?.addEventListener("click",()=>{ve=Math.min(2,ve+1),J()}),R("#retry-quiz")?.addEventListener("click",()=>{S.assessment=null,delete S.motionFlow,Ua=0,Q(),J()}),R("#save-lesson")?.addEventListener("click",()=>{S.conclusion=R("#conclusion").value,Ls(),R("#note-status").textContent="Գրառումը պահպանվել է հետազոտական տետրում։",R("#note-status").classList.add("saved"),B("complete"),mo(R("#note-status")),R("#save-lesson").disabled=!0}),R("#new-note")?.addEventListener("click",()=>{Je="new",J()}),R("#cancel-note")?.addEventListener("click",()=>{Je=null,J()}),document.querySelectorAll("[data-edit]").forEach(i=>i.onclick=()=>{Je=i.dataset.edit,J()}),document.querySelectorAll("[data-delete]").forEach(i=>i.onclick=()=>{confirm("Ջնջե՞լ այս գրառումը։")&&(S.notes=S.notes.filter(r=>r.id!==i.dataset.delete),Q(),J())}),R("#note-form")?.addEventListener("submit",i=>{i.preventDefault();let r=Object.fromEntries(new FormData(i.target)),o=S.notes.find(c=>c.id===Je);o?Object.assign(o,r):S.notes.push({...r,id:crypto.randomUUID(),created:Date.now()}),Je=null,Q(),J()})}const kt=location.hash;kt.startsWith("#lesson/")?pa(decodeURIComponent(kt.slice(8))):(["#home","#path","#aerolab","#progress","#notebook"].includes(kt)&&(_=kt.slice(1)),J(),kt||history.replaceState(null,"","#path"));window.addEventListener("hashchange",()=>{const e=location.hash;if(De()&&e!=="#main-content"&&history.replaceState(null,"",`#lesson/${De()}`),e==="#main-content"){R("#main-content").focus();return}e.startsWith("#lesson/")?pa(decodeURIComponent(e.slice(8))):Ae(["#path","#aerolab","#progress","#notebook"].includes(e)?e.slice(1):"home")});window.addEventListener("beforeunload",e=>{const t=De();t&&!Ds(S,t)&&(e.preventDefault(),e.returnValue="")});window.addEventListener("pagehide",()=>{Ke(),gt()});window.addEventListener("pageshow",e=>{e.persisted&&De()&&(zn(),Ae("path",!0))});window.addEventListener("physics-audio-error",()=>qt("Ձայնը չհաջողվեց նվագարկել։ Կարող ես կրկին միացնել այն։"));
