export const memoTemplate = `
<!DOCTYPE html>
<html>
    <head>
        <title>
            HEALTHWAY MEDICAL CLINIC 
        </title>
        <link rel="stylesheet" href="./lib/bootstrap/bootstrap.min.css">
        <style>
            body {
                background: rgb(204,204,204);
                font-size: 12px;
                font-family: Arial, Helvetica, sans-serif;
                line-height: 1.5;
            }
            page {
                background: white;
                display: block;
                margin: 6.35mm;
                box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
            }
            page[size="A5"][layout="portrait"] {
                width: 14.8cm;
                height: 21cm;
                position: relative;
            }
            @media print {
                @page {
                    size: A5 portrait;
                    margin: 5.5mm 15mm;
                }
                body{
                    min-width: initial!important;
                }
                page{
                    margin: 0mm;
                }
            }
            .margin {
                margin-left: 10px;
                margin-right: 10px;
            }
            .footer {
                position: fixed;
                bottom: 0;
                width: 97.5%;
            }
               .text-size-xl {
                font-size: 1.5em;
              }
              .text-size-l {
               font-size: 1.3em;
              }
              .text-size-m {
                font-size: 1.15em;
              }
              .text-size {
                font-size: 1.0em;
              }
              .text-size-s {
               font-size: 0.9em;
              }
              .text-size-xs {
                font-size: 0.7em;
              }
              .address {
               line-height: 1.3;
              }
        </style>
    </head>
    <body>
        <page size="A5" layout="portrait">
            <div class="margin">
                <div class="row">
                    <div class="col-9">
                        <div class="row">
                            <div class="col-4">
                                <img src="./assets/img/new_hmc_logo.png" class="img-fluid" height="70%">
                            </div>
                            <div class="col-8 pt-2 address">
                            <strong><b><span class="text-size-m">HEALTHWAY MEDICAL </span></b></strong><br>
                            <span class="text-size-s"> {{clinicAddress}}<br>
                                TEL {{clinicTel}} / FAX {{clinicFax}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                      <div class="row">
                         <div class="col-12">
                            <h5 class="pt-2" style="font-weight:600">
                               <span class="float-right">MEMO</span><br>
                            </h5>
                         </div>
                      </div>
                   </div>
                </div>
                <br>
                <div class="row text-size">
                    <div class="col-6">
                        <span><strong>NAME: </strong>{{patientName}}</span>
                    </div>
                    <div class="col-6 float-right">
                        <span><strong>IDENTIFICATION: </strong>{{patientUserId}}</span>
                    </div>
                </div>
                <hr>
                <div class="text-size">
                    <div class="row">
                        <div class="col-12">
                            {{date}}
                        </div>
                    </div>
                    <br>
                </div>
                <div class="text-size-m">
                  <div class="row">
                      <div class="col-12">
                          {{memo}}
                      </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-12 mb-5">
                                Regards,
                            </div>
                        </div>
                        <hr class="m-0">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                       <span><strong>{{doctorName}}</strong></span>
                    </div>
                  </div>
                  <div class="row">
                      <div class="col-6">
                         <span>{{doctorSpeciality}}</span>
                      </div>
                  </div>
                  <br>
                </div>
              <div class="footer text-size-s">
                <div class="col">
                  <span class="float-right">
                      Printed By: {{assistantName}} ({{printDate}})
                  </span>
              </div>
            </div>
        </page>
    <body>
</html>
`;








// <!DOCTYPE html>
// <html>
//     <head>
//         <title>
//             HEALTHWAY MEDICAL CLINIC
//         </title>
//         <link rel="stylesheet" href="./lib/bootstrap/bootstrap.min.css">
//         <style>
//             body {
//                 background: rgb(204,204,204);
//                 font-size: 12px;
//             }
//             page {
//                 background: white;
//                 display: block;
//                 margin: 6.35mm;
//                 box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
//             }
//             page[size="A5"][layout="landscape"] {
//                 width: 210mm;
//                 height: 148mm;
//                 position: relative;
//             }
//             @media print {
//                 @page {
//                     size: A5 landscape;
//                     margin: 4mm 5.5mm;
//                 }
//                 body {
//                     min-width: initial!important;
//                 }
//                 page{
//                     margin: 0mm;
//                 }
//             }
//             .margin {
//                 margin-left: 10px;
//                 margin-right: 10px;
//             }
//             .footer {
//                 position: relative;
//                 bottom: 0;
//                 width: 97.5%;
//             }
//             .overflow-text { 
//               overflow: auto;
//             }
//             .text-size-xl {
//               font-size: 14px;
//             }
//             .text-size-l {
//               font-size: 11px;
//             }
//             .text-size-m {
//               font-size: 10.5px;
//             }
//             .text-size-s {
//               font-size: 8px;
//             }
//             .text-size-xs {
//               font-size: 7px;
//             }

//             .address {
//               line-height: 1.1;
//             }
//         </style>
//     </head>
//     <body>
//         <page size="A5" layout="landscape">
//             <div class="margin">
//                 <div class="row">
//                     <div class="col-8">
//                         <div class="row">
//                             <div class="col-3 pr-0" style="margin-top: 4px;">
//                               <img src="./assets/img/new_hmc_logo.png" width="110%" height="auto">
//                             </div>
//                             <div class="col-9 address float-left pt-2">
//                                 <strong><span class="text-size-xl">HEALTHWAY MEDICAL</span></strong>
//                                 <span class="text-size-l"><br>{{clinicAddress}}
//                                 <br>TEL {{clinicTel}} / FAX {{clinicFax}}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <br>

//                 <div class="row">
//                     <div class="col-6">
//                         <span><strong>NAME: </strong>{{patientName}}</span>
//                     </div>
//                     <div class="col-6">
//                         <span><strong>IDENTIFICATION: </strong>{{patientUserId}}</span>
//                     </div>
//                 </div>
//                 <hr>

//                 <div class="row">
//                     <div class="col-12">
//                         Re: Memo
//                     </div>
//                 </div>
//                 <br>

//                 <div class="row">
//                     <div class="col-12">
//                         {{memo}}
//                     </div>
//                 </div>
//                 <br>

//                 <div class="footer">
//                     <div class="row">
//                         <div class="col-4 mt-5">
//                             <hr class="m-0">
//                             <span><strong>{{doctorName}}</strong></span>
//                         </div>
//                     </div>
//                     <div class="row">
//                         <div class="col-6">
//                             {{doctorSpeciality}}
//                         </div>
//                         <div class="col-6">
//                             <span class="float-right">
//                                 Printed By: {{assistantName}} ({{printDate}})
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </page>
//     </body>
// </html>