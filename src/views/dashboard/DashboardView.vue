<script setup></script>

<template>
      <main class="bg-normalBG dark:bg-main-dark">
         <div class=" mx-[30px] min-h-[calc(100vh-195px)] mb-[30px] ssm:mt-[30px] mt-[15px]">


            <div class="grid grid-cols-12 gap-5">
               <div class="col-span-12">

                  <!-- Breadcrumb Section -->
                  <div class="leading-[1.8571428571] flex flex-wrap sm:justify-between justify-center items-center ssm:mb-[33px] mb-[18px] max-sm:flex-col gap-x-[15px] gap-y-[5px]">
                     <!-- Title -->
                     <!-- <h4 class="capitalize text-[20px] text-dark dark:text-title-dark font-semibold">demo two</h4> -->
                     <!-- Breadcrumb Navigation -->
                     <div class="flex flex-wrap justify-center">
                        <nav>
                           <ol class="flex flex-wrap p-0 mb-0 list-none gap-[8px] max-sm:justify-center">
                              <!-- Parent Link -->
                              <li class="inline-flex items-center">
                                 <a class="text-[14px] font-normal leading-[20px] text-body dark:text-neutral-200 hover:text-primary group" href="index.html">
                                    <i class="uil uil-estate text-light dark:text-white/50 me-[8px] text-[16px] group-hover:text-current"></i>Dashboard</a>
                              </li>
                              <!-- Middle (Conditional) -->

                              <!-- Child (Current Page) -->
                              <li class="inline-flex items-center before:content-[''] before:w-1 before:h-1 before:ltr:float-left rtl:float-right before:bg-light-extra before:me-[7px] before:pe-0 before:rounded-[50%]" aria-current="page">
                                 <!-- <span class="text-[14px] font-normal leading-[20px] flex items-center capitalize text-light dark:text-subtitle-dark">demo two</span> -->
                              </li>
                           </ol>
                        </nav>
                     </div>
                  </div>

               </div>
            </div>
            <div class="grid grid-cols-12 gap-[25px]">
               <div class="col-span-12 2xl:col-span-3 sm:col-span-6">

                  <div bordered="false" class="bg-white dark:bg-box-dark py-[25px] px-[25px] pb-[12px] overflow-hidden rounded-10 relative text-[15px] text-body dak:text-subtitle-dark">
                     <div class="flex justify-between">
                        <div>
                           <span class="font-normal text-body dark:text-subtitle-dark text-15">Total Products</span>
                           <h4 class="mb-0 text-3xl max-lg:text-[26px] max-sm:text-2xl font-semibold leading-normal text-dark dark:text-title-dark">
                              <div class="flex items-center countCategories" data-number="199">


                                 <span class="countNumber">199</span>

                                 <span>+</span>


                              </div>
                           </h4>
                           <div>
                              <span class="inline-flex items-center w-full h-11 rounded-lg gap-[10px]">

                                 <span class="flex font-medium gap-[2px] items-center text-sm text-success">
                                    <i class="uil uil-arrow-up text-[18px]"></i> 25.36% </span>
                                 <span class="text-sm text-light dark:text-subtitle-dark">Since last month</span>

                              </span>
                           </div>
                        </div>
                        <div class="absolute bg-primary/10 flex h-full items-center justify-start ltr:-right-[140px] max-md:w-[210px] max-ssm:w-[230px] overflow-hidden px-[30px] rounded-full rtl:-left-[140px] text-primary top-0 w-[230px]">
                           <div class="flex items-center justify-center text-primary">
                              <div class="flex items-center text-primary text-[36px]">
                                 <i class="uil uil-arrow-growth"></i>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-span-12 2xl:col-span-3 sm:col-span-6">

                  <div bordered="false" class="bg-white dark:bg-box-dark py-[25px] px-[25px] pb-[12px] overflow-hidden rounded-10 relative text-[15px] text-body dak:text-subtitle-dark">
                     <div class="flex justify-between">
                        <div>
                           <span class="font-normal text-body dark:text-subtitle-dark text-15">Total Orders</span>
                           <h4 class="mb-0 text-3xl max-lg:text-[26px] max-sm:text-2xl font-semibold leading-normal text-dark dark:text-title-dark">
                              <div class="flex items-center countCategories" data-number="125">


                                 <span class="countNumber">125</span>



                              </div>
                           </h4>
                           <div>
                              <span class="inline-flex items-center w-full h-11 rounded-lg gap-[10px]">

                                 <span class="flex font-medium gap-[2px] items-center text-sm text-success">
                                    <i class="uil uil-arrow-up text-[18px]"></i> 87.36% </span>
                                 <span class="text-sm text-light dark:text-subtitle-dark">Since last month</span>

                              </span>
                           </div>
                        </div>
                        <div class="absolute bg-info/10 flex h-full items-center justify-start ltr:-right-[140px] max-md:w-[210px] max-ssm:w-[230px] overflow-hidden px-[30px] rounded-full rtl:-left-[140px] text-info top-0 w-[230px]">
                           <div class="flex items-center justify-center text-info">
                              <div class="flex items-center text-info text-[36px]">
                                 <i class="uil uil-users-alt"></i>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-span-12 2xl:col-span-3 sm:col-span-6">

                  <div bordered="false" class="bg-white dark:bg-box-dark py-[25px] px-[25px] pb-[12px] overflow-hidden rounded-10 relative text-[15px] text-body dak:text-subtitle-dark">
                     <div class="flex justify-between">
                        <div>
                           <span class="font-normal text-body dark:text-subtitle-dark text-15">Total Sales</span>
                           <h4 class="mb-0 text-3xl max-lg:text-[26px] max-sm:text-2xl font-semibold leading-normal text-dark dark:text-title-dark">
                              <div class="flex items-center countCategories" data-number="854">

                                 <span>$</span>

                                 <span class="countNumber">854</span>



                              </div>
                           </h4>
                           <div>
                              <span class="inline-flex items-center w-full h-11 rounded-lg gap-[10px]">

                                 <span class="flex font-medium gap-[2px] items-center text-sm text-danger">
                                    <i class="uil uil-arrow-down text-[18px]"></i> 5.36% </span>
                                 <span class="text-sm text-light dark:text-subtitle-dark">Since last month</span>

                              </span>
                           </div>
                        </div>
                        <div class="absolute bg-secondary/10 flex h-full items-center justify-start ltr:-right-[140px] max-md:w-[210px] max-ssm:w-[230px] overflow-hidden px-[30px] rounded-full rtl:-left-[140px] text-secondary top-0 w-[230px]">
                           <div class="flex items-center justify-center text-secondary">
                              <div class="flex items-center text-secondary text-[36px]">
                                 <i class="uil uil-usd-circle"></i>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-span-12 2xl:col-span-3 sm:col-span-6">

                  <div bordered="false" class="bg-white dark:bg-box-dark py-[25px] px-[25px] pb-[12px] overflow-hidden rounded-10 relative text-[15px] text-body dak:text-subtitle-dark">
                     <div class="flex justify-between">
                        <div>
                           <span class="font-normal text-body dark:text-subtitle-dark text-15">New Customers</span>
                           <h4 class="mb-0 text-3xl max-lg:text-[26px] max-sm:text-2xl font-semibold leading-normal text-dark dark:text-title-dark">
                              <div class="flex items-center countCategories" data-number="998">


                                 <span class="countNumber">998</span>

                                 <span>+</span>


                              </div>
                           </h4>
                           <div>
                              <span class="inline-flex items-center w-full h-11 rounded-lg gap-[10px]">

                                 <span class="flex font-medium gap-[2px] items-center text-sm text-success">
                                    <i class="uil uil-arrow-up text-[18px]"></i> 13.36% </span>
                                 <span class="text-sm text-light dark:text-subtitle-dark">Since last month</span>

                              </span>
                           </div>
                        </div>
                        <div class="absolute bg-primary/10 flex h-full items-center justify-start ltr:-right-[140px] max-md:w-[210px] max-ssm:w-[230px] overflow-hidden px-[30px] rounded-full rtl:-left-[140px] text-primary top-0 w-[230px]">
                           <div class="flex items-center justify-center text-primary">
                              <div class="flex items-center text-primary text-[36px]">
                                 <i class="uil uil-tachometer-fast"></i>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div class="col-span-12 2xl:col-span-6">

                  <div class="bg-white dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative h-full">
                     <div class="px-[25px] text-dark dark:text-title-dark font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]">
                        <h2 class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-title-dark capitalize">
                           Sale Revenue
                        </h2>
                        <ul class="py-[16px] max-ssm:py-[10px] flex items-center max-xs:flex-wrap max-xs:justify-center" role="tablist" data-te-nav-ref>
                           <li role="presentation">
                              <a data-te-toggle="pill" data-te-target="#sr-today" role="tab" aria-controls="sr-today" aria-selected="false" href="#sr-today" class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up">
                                 today
                              </a>
                           </li>
                           <li role="presentation">
                              <a href="#sr-week" data-te-toggle="pill" data-te-target="#sr-week" role="tab" aria-controls="sr-week" aria-selected="false" class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up">
                                 Week
                              </a>
                           </li>
                           <li role="presentation">
                              <a href="#sr-month" data-te-toggle="pill" data-te-target="#sr-month" data-te-nav-active role="tab" aria-controls="sr-month" aria-selected="true" class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up">
                                 Month
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div class="p-[25px] pt-0">
                        <div id="sr-today" role="tabpanel" class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block">
                           <div dir="ltr" class="salesRevenueToday"></div>
                        </div>
                        <div id="sr-week" role="tabpanel" class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block">
                           <div dir="ltr" class="salesRevenueWeek"></div>
                        </div>
                        <div id="sr-month" role="tabpanel" data-te-tab-active class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block">
                           <div dir="ltr" class="salesRevenueMonth"></div>
                        </div>
                     </div>

                  </div>

               </div>
               <div class="col-span-12 2xl:col-span-6">

                  <div class="bg-white dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative h-full">
                     <div class="px-[25px] text-dark dark:text-title-dark font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]">
                        <h2 class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-title-dark capitalize">
                           Source Of Revenue Generated
                        </h2>
                        <div class="sm:py-[16px] flex items-center gap-[15px] max-xs:flex-wrap max-xs:justify-center " data-te-dropdown-ref>
                           <button class="text-[18px] text-light dark:text-subtitle-dark" type="button" id="salesReport" data-te-dropdown-toggle-ref aria-expanded="false">
                              <i class="uil uil-ellipsis-h"></i>
                           </button>
                           <ul class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down  [&[data-te-dropdown-show]]:block" aria-labelledby="salesReport" data-te-dropdown-menu-ref>
                              <li>
                                 <a class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up gap-[6px]" href="#" data-te-dropdown-item-ref>
                                    <i class="uil uil-print"></i> printer </a>
                              </li>
                              <li>
                                 <a class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up" href="#" data-te-dropdown-item-ref>
                                    <i class="uil uil-book-alt"></i> pdf </a>
                              </li>
                              <li>
                                 <a class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up" href="#" data-te-dropdown-item-ref>
                                    <i class="uil uil-file-info-alt"></i> google sheet </a>
                              </li>
                              <li>
                                 <a class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up" href="#" data-te-dropdown-item-ref>
                                    <i class="uil uil-multiply"></i> Excel (XLSX) </a>
                              </li>
                              <li>
                                 <a class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up" href="#" data-te-dropdown-item-ref>
                                    <i class="uil uil-file"></i> CSV </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div class="p-[25px] pb-[50px] gap-[25px] max-md:pt-0 flex items-center max-md:flex-wrap max-md:flex-col justify-center max-3xl:justify-center max-lg:justify-start max-md:justify-center">
                        <div class="pieChart"></div>
                        <ul class="flex gap-x-[44px] gap-y-[22px] max-ssm:gap-x-[15px] max-ssm:gap-y-[15px] max-ssm:justify-center flex-wrap">
                           <li>
                              <div class="flex items-center justify-center bg-facebook/10 text-facebook w-[80px] h-[80px] mb-[10px] rounded-[10px] text-[30px]">
                                 <i class="uil uil-facebook-f"></i>
                              </div>
                              <div class="text-center">
                                 <div class="text-[15px] text-dark dark:text-title-dark font-medium">
                                    Facebook </div>
                                 <div class="text-[14px] text-light dark:text-subtitle-dark font-medium">
                                    4621 </div>
                              </div>
                           </li>
                           <li>
                              <div class="flex items-center justify-center bg-twitter/10 text-twitter dark:text-title-dark w-[80px] h-[80px] mb-[10px] rounded-[10px] text-[30px]">
                                 <img class="svg w-[25px] h-[25px]" src="../../assets/images/svg/x-twitter.svg" alt="twitter">
                              </div>
                              <div class="text-center">
                                 <div class="text-[15px] text-dark dark:text-title-dark font-medium">
                                    X </div>
                                 <div class="text-[14px] text-light dark:text-subtitle-dark font-medium">
                                    3621 </div>
                              </div>
                           </li>
                           <li>
                              <div class="flex items-center justify-center bg-google/10 text-google w-[80px] h-[80px] mb-[10px] rounded-[10px] text-[30px]">
                                 <i class="uil uil-google"></i>
                              </div>
                              <div class="text-center">
                                 <div class="text-[15px] text-dark dark:text-title-dark font-medium">
                                    Google </div>
                                 <div class="text-[14px] text-light dark:text-subtitle-dark font-medium">
                                    8945 </div>
                              </div>
                           </li>
                        </ul>
                     </div>
                  </div>

               </div>
               <div class="col-span-12 2xl:col-span-4">

                  <div class="bg-white dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative h-full">
                     <div class="px-[25px] text-dark dark:text-title-dark font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]">
                        <h2 class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-title-dark  capitalize">
                           New Products
                        </h2>
                        <ul class="py-[16px] max-ssm:py-[10px] flex items-center max-xs:flex-wrap max-xs:justify-center" role="tablist" data-te-nav-ref>
                           <li role="presentation">
                              <a data-te-toggle="pill" data-te-target="#np-today" data-te-nav-active role="tab" aria-controls="np-today" aria-selected="true" href="#np-today" class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up">
                                 today
                              </a>
                           </li>
                           <li role="presentation">
                              <a href="#np-week" data-te-toggle="pill" data-te-target="#np-week" role="tab" aria-controls="np-week" aria-selected="false" class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up">
                                 Week
                              </a>
                           </li>
                           <li role="presentation">
                              <a href="#np-month" data-te-toggle="pill" data-te-target="#np-month" role="tab" aria-controls="np-month" aria-selected="false" class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up">
                                 Month
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div class="p-[25px] pt-0">
                        <div class="max-h-[320px] scrollbar overflow-y-auto">
                           <div id="np-today" role="tabpanel" data-te-tab-active class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block">
                              <table class="min-w-full text-sm font-light text-left whitespace-nowrap">
                                 <thead>
                                    <tr>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-start text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-s-[4px]">
                                          PRODUCT NAME</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-end text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-e-[4px]">
                                          PRICE</th>
                                    </tr>
                                 </thead>
                                 <tbody class="bg-white dark:bg-box-dark">
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/8.png" alt="UV Protected Sunglass"></div>
                                             <span class="font-medium capitalize text-dark dark:text-title-dark text-15">UV
                                                Protected Sunglass</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/6.png" alt="Black Headphone"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Black
                                                Headphone</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/3.png" alt="Nike Shoes"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Nike
                                                Shoes</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/7.png" alt="Women Bag"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Women
                                                Bag</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/4.png" alt="15`` Mackbook Pro"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">15``
                                                Mackbook Pro</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                           <div id="np-week" role="tabpanel" class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block">
                              <table class="min-w-full text-sm font-light text-left whitespace-nowrap">
                                 <thead>
                                    <tr>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-start text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-s-[4px]">
                                          PRODUCT NAME</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-end text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-e-[4px]">
                                          PRICE</th>
                                    </tr>
                                 </thead>
                                 <tbody class="bg-white dark:bg-box-dark">
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/6.png" alt="New Model Sunglass"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">New Model
                                                Sunglass</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/7.png" alt="Smart Headphone"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Smart
                                                Headphone</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/8.png" alt="Nike Shoes"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Nike
                                                Shoes</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/9.png" alt="Men Bag"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Men
                                                Bag</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/4.png" alt="15`` Toshiba Pro"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">15``
                                                Toshiba Pro</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                           <div id="np-month" role="tabpanel" class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block">
                              <table class="min-w-full text-sm font-light text-left whitespace-nowrap">
                                 <thead>
                                    <tr>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-start text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-s-[4px]">
                                          PRODUCT NAME</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-end text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-e-[4px]">
                                          PRICE</th>
                                    </tr>
                                 </thead>
                                 <tbody class="bg-white dark:bg-box-dark">
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/6.png" alt="Computer Light Sunglass"></div>
                                             <span class="font-medium capitalize text-dark dark:text-title-dark text-15">Computer
                                                Light Sunglass</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/7.png" alt="Large Headphone"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Large
                                                Headphone</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/8.png" alt="Nike Shoes"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Nike
                                                Shoes</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/9.png" alt="High Quality Bag"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">High
                                                Quality Bag</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/electronics/4.png" alt="15`` Lenovo Pro"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">15``
                                                Lenovo Pro</span>
                                          </div>
                                       </td>
                                       <td class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          $38,536</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>

                  </div>

               </div>
               <div class="col-span-12 2xl:col-span-8">

                  <div class="bg-white dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative h-full">
                     <div class="px-[25px] text-dark dark:text-title-dark font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]">
                        <h2 class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-title-dark  capitalize">
                           Best seller
                        </h2>
                        <ul class="py-[16px] max-ssm:py-[10px] flex items-center max-xs:flex-wrap max-xs:justify-center" role="tablist" data-te-nav-ref>
                           <li role="presentation">
                              <a data-te-toggle="pill" data-te-target="#bs-today" data-te-nav-active role="tab" aria-controls="bs-today" aria-selected="true" href="#bs-today" class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up">
                                 today
                              </a>
                           </li>
                           <li role="presentation">
                              <a href="#bs-week" data-te-toggle="pill" data-te-target="#bs-week" role="tab" aria-controls="bs-week" aria-selected="false" class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up">
                                 Week
                              </a>
                           </li>
                           <li role="presentation">
                              <a href="#bs-month" data-te-toggle="pill" data-te-target="#bs-month" role="tab" aria-controls="bs-month" aria-selected="false" class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up">
                                 Month
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div class="p-[25px] pt-0">
                        <div class="max-h-[320px] scrollbar overflow-y-auto">
                           <div id="bs-today" role="tabpanel" data-te-tab-active class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block">
                              <table class="min-w-full text-sm font-light text-left whitespace-nowrap">
                                 <thead>
                                    <tr>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-start text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-s-[4px]">
                                          SELLER NAME</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden">
                                          COMPANY</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden">
                                          PRODUCT</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden">
                                          REVENUE</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-end text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-e-[4px]">
                                          STATUS</th>
                                    </tr>
                                 </thead>
                                 <tbody class="bg-white dark:bg-box-dark">
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/10.png" alt="Robert Clinton"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Robert
                                                Clinton</span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Samsung</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Smart Phone</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $38,536</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Done</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/11.png" alt="Michael Johnson  "></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Michael
                                                Johnson </span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Asus</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Laptop</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $20,573</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          On Process</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/12.png" alt="Daniel White"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Daniel
                                                White</span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Google</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Watch</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $17,457</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Pending</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/13.png" alt="Chris Barin "></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Chris
                                                Barin </span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Apple</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Computer</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $15,354</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Done</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/14.png" alt="Daniel Pink"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Daniel
                                                Pink</span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Panasonic</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Sunglass</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $12,354</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Done</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                           <div id="bs-week" role="tabpanel" class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block">
                              <table class="min-w-full text-sm font-light text-left whitespace-nowrap">
                                 <thead>
                                    <tr>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-start text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-s-[4px]">
                                          SELLER NAME</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden">
                                          COMPANY</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden">
                                          PRODUCT</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden">
                                          REVENUE</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-end text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-e-[4px]">
                                          STATUS</th>
                                    </tr>
                                 </thead>
                                 <tbody class="bg-white dark:bg-box-dark">
                                    <tr class="group ">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/10.png" alt="Richard Clinton"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Richard
                                                Clinton</span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Samsung</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Smart Phone</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $38,536</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Pending</td>
                                    </tr>
                                    <tr class="group ">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/11.png" alt="Jhon Johnson  "></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Jhon
                                                Johnson </span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Asus</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Laptop</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $20,573</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Done</td>
                                    </tr>
                                    <tr class="group ">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/12.png" alt="Daniel White"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Daniel
                                                White</span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Google</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Watch</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $17,457</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Pending</td>
                                    </tr>
                                    <tr class="group ">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/13.png" alt="David Barin "></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">David
                                                Barin </span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Apple</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Computer</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $15,354</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Pending</td>
                                    </tr>
                                    <tr class="group ">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/14.png" alt="Daniel Pink"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Daniel
                                                Pink</span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Panasonic</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Sunglass</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $12,354</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Done</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                           <div id="bs-month" role="tabpanel" class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block">
                              <table class="min-w-full text-sm font-light text-left whitespace-nowrap">
                                 <thead>
                                    <tr>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-start text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-s-[4px]">
                                          SELLER NAME</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden">
                                          COMPANY</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden">
                                          PRODUCT</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden">
                                          REVENUE</th>
                                       <th class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-end text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-e-[4px]">
                                          STATUS</th>
                                    </tr>
                                 </thead>
                                 <tbody class="bg-white dark:bg-box-dark">
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/10.png" alt="Michel Clinton"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Michel
                                                Clinton</span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Samsung</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Smart Phone</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $38,536</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          On Process</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/11.png" alt="Christopher Johnson  "></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Christopher
                                                Johnson </span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Asus</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Laptop</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $20,573</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Done</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/12.png" alt="Joseph White"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Joseph
                                                White</span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Google</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Watch</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $17,457</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Pending</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/13.png" alt="Richard Barin "></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Richard
                                                Barin </span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Apple</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Computer</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $15,354</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Done</td>
                                    </tr>
                                    <tr class="group">
                                       <td class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]">
                                          <div class="flex items-center">
                                             <div class="me-2.5 w-[34px] h-[34px]"><img class="min-w-[34px] h-[34px] rounded-4" src="../../assets/images/sellers/14.png" alt="Daniel Pink"></div><span class="font-medium capitalize text-dark dark:text-title-dark text-15">Daniel
                                                Pink</span>
                                          </div>
                                       </td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Panasonic</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          Sunglass</td>
                                       <td class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent">
                                          $12,354</td>
                                       <td class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]">
                                          Done</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>

                  </div>

               </div>
            </div>

         </div>

      </main>
</template>