<script setup></script>

<template>
  <!-- Main Content -->
  <main class="bg-normalBG dark:bg-main-dark">
    <div
      class="mx-[30px] min-h-[calc(100vh-195px)] mb-[30px] ssm:mt-[30px] mt-[15px]"
    >
      <div
        class="flex items-center ssm:justify-between justify-center max-sm:flex-wrap gap-x-[30px] gap-y-[15px]"
      >
        <div class="inline-flex items-center">
          <h1
            class="text-dark dark:text-title-dark text-[20px] font-semibold mb-0"
          >
            Projects
          </h1>
          <span
            class="relative ms-3 ps-[15px] text-body dark:text-subtitle-dark text-[15px] font-medium before:absolute before:top-0 before:start-0 before:w-[1px] before:h-6 before:bg-normal dark:before:bg-box-dark-up"
            >12 Running Projects</span
          >
        </div>
        <button
          type="button"
          class="flex items-center px-[20px] text-sm text-green rounded-md font-semibold bg-primary border-primary h-10 gap-[6px] transition-[0.3s]"
        >
          <!-- <i class="uil uil-plus"></i> -->
          <span class="m-0">Create Projects</span>
        </button>
      </div>

      <div
        class="text-[17px] flex items-center 3xl:justify-between max-3xl:flex-col justify-center gap-x-[30px] gap-y-[15px] sm:mt-[30px] mt-[15px]"
      >
        <div
          class="flex items-center gap-x-[20px] gap-y-[15px] max-md:flex-col max-md:flex-wrap"
        >
          <ul
            class="border-1 border-regular bg-white dark:bg-box-dark dark:border-box-dark-up flex items-center sm:h-[40px] px-[5px] rounded-6 whitespace-nowrap max-sm:flex-wrap max-sm:justify-center"
          >
            <li class="relative">
              <a
                href="#"
                class="sm:px-[15px] px-[10px] sm:py-[10px] py-[5px] text-[14px] leading-[1.78] font-normal text-light-extra dark:text-subtitle-dark capitalize block after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-regular after:dark:bg-box-dark-up after:top-2/4 after:right-0 after:-translate-x-2/4 after:-translate-y-2/4 [&.mixitup-control-active]:text-primary mixitup-control-active"
                data-filter="all"
              >
                All
              </a>
            </li>
            <li class="relative">
              <a
                href="#"
                class="sm:px-[15px] px-[10px] sm:py-[10px] py-[5px] text-[14px] leading-[1.78] font-normal text-light-extra dark:text-subtitle-dark capitalize block after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-regular after:dark:bg-box-dark-up after:top-2/4 after:right-0 after:-translate-x-2/4 after:-translate-y-2/4 [&.mixitup-control-active]:text-primary"
                data-filter=".mix-progress"
              >
                In progress
              </a>
            </li>
            <li class="relative">
              <a
                href="#"
                class="sm:px-[15px] px-[10px] sm:py-[10px] py-[5px] text-[14px] leading-[1.78] font-normal text-light-extra dark:text-subtitle-dark capitalize block after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-regular after:dark:bg-box-dark-up after:top-2/4 after:right-0 after:-translate-x-2/4 after:-translate-y-2/4 [&.mixitup-control-active]:text-primary"
                data-filter=".mix-completed"
              >
                Completed
              </a>
            </li>
            <li class="relative">
              <a
                href="#"
                class="sm:px-[15px] px-[10px] sm:py-[10px] py-[5px] text-[14px] leading-[1.78] font-normal text-light-extra dark:text-subtitle-dark capitalize block after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-regular after:dark:bg-box-dark-up after:top-2/4 after:right-0 after:-translate-x-2/4 after:-translate-y-2/4 [&.mixitup-control-active]:text-primary"
                data-filter=".mix-late"
              >
                late
              </a>
            </li>
            <li class="relative">
              <a
                href="#"
                class="sm:px-[15px] px-[10px] sm:py-[10px] py-[5px] text-[14px] leading-[1.78] font-normal text-light-extra dark:text-subtitle-dark capitalize block [&.mixitup-control-active]:text-primary"
                data-filter=".mix-early"
              >
                early
              </a>
            </li>
          </ul>
          <div
            class="flex items-center bg-white rounded-[20px] dark:bg-box-dark-up h-[40px] 4xl:w-[350px] w-full px-[25px]"
          >
            <input
              type="search"
              name="search"
              placeholder="Search here..."
              class="bg-only-transparent text-[14px] w-full h-[40px] pe-[15px] py-[10px] outline-none border-none text-light dark:text-subtitle-dark placeholder:text-light dark:placeholder:text-subtitle-dark search-close-icon:appearance-none search-close-icon:w-[20px] search-close-icon:h-[23px] search-close-icon:bg-[url(../../assets/images/svg/x.svg)] search-close-icon:cursor-pointer"
            />
            <i
              class="uil uil-search text-light-extra dark:text-subtitle-dark"
            ></i>
          </div>
        </div>
        <div class="flex items-center gap-x-[20px] gap-y-[10px]">
          <div class="inline-flex items-center">
            <span
              class="me-[15px] text-[14px] text-body dark:text-subtitle-dark max-xs:hidden"
              >Sort By:</span
            >
            <select
              data-te-select-init
              data-te-class-select-input="py-[8px] text-[14px] text-body dark:text-subtitle-dark px-[20px] w-full capitalize [&~span]:top-[12px] [&~span]:w-[15px] [&~span]:h-[15px] [&~span]:text-body dark:[&~span]:text-white text-light dark:text-subtitle-dark border-normal dark:border-box-dark-up border-1 rounded-6 dark:bg-box-dark-up outline-none ltr:[&~span]:right-[0.75rem] rtl:[&~span]:left-[0.75rem] rtl:[&~span]:right-auto"
              data-te-class-notch-leading="!border-0 !shadow-none group-data-[te-input-focused]:shadow-none group-data-[te-input-focused]:border-none"
              data-te-class-notch-middle="!border-0 !shadow-none !outline-none"
              data-te-class-notch-trailing="!border-0 !shadow-none !outline-none"
            >
              <option value="1">Project Category</option>
              <option value="2">Top Rated</option>
              <option value="3">Pupular</option>
              <option value="4">Newest</option>
              <option value="5">Price</option>
            </select>
          </div>
          <div class="flex items-center gap-x-[10px] gap-y-[5px]">
            <a
              href="projects.html"
              class="flex items-center justify-center w-[40px] h-[40px] text-[18px] text-light [&.active]:text-primary [&.active]:bg-white [&.active]:shadow font-medium rounded-full transition-[0.3s] active"
            >
              <i class="uil uil-grid text-[16px]"></i>
            </a>
            <a
              href="#"
              class="flex items-center justify-center w-[40px] h-[40px] text-[18px] text-light [&.active]:text-primary [&.active]:bg-white [&.active]:shadow font-medium rounded-full transition-[0.3s]"
            >
              <i class="uil uil-list-ul text-[17px]"></i>
            </a>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-12 sm:gap-[25px] gap-y-[25px] mt-[30px] mixitup-gallery"
      >
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-early"
          data-order="9"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Dashboard UI Project
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-primary px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    early
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-1"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-1"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-primary rounded-e-[20px]"
                    style="width: 85%"
                  ></div>
                </div>
                85%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-completed"
          data-order="10"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Custom Software
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-success px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    completed
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-2"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-2"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-success rounded-e-[20px]"
                    style="width: 100%"
                  ></div>
                </div>
                100%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-progress"
          data-order="11"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Application UI Design
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-warning px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    progress
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-3"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-3"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-warning rounded-e-[20px]"
                    style="width: 50%"
                  ></div>
                </div>
                50%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-early"
          data-order="1"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Good Beat
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-primary px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    early
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-4"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-4"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-primary rounded-e-[20px]"
                    style="width: 85%"
                  ></div>
                </div>
                85%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-progress"
          data-order="2"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Website Builder
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-warning px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    progress
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-5"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-5"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-warning rounded-e-[20px]"
                    style="width: 50%"
                  ></div>
                </div>
                50%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-progress"
          data-order="3"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Component Library
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-warning px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    progress
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-6"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-6"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-warning rounded-e-[20px]"
                    style="width: 50%"
                  ></div>
                </div>
                50%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-progress"
          data-order="4"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Dashboard UI Project
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-warning px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    progress
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-7"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-7"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-warning rounded-e-[20px]"
                    style="width: 60%"
                  ></div>
                </div>
                60%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-progress"
          data-order="5"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Component Library
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-warning px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    progress
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-8"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-8"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-warning rounded-e-[20px]"
                    style="width: 50%"
                  ></div>
                </div>
                50%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-completed"
          data-order="6"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Dashboard UI Project
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-success px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    completed
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-9"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-9"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-success rounded-e-[20px]"
                    style="width: 100%"
                  ></div>
                </div>
                100%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-completed"
          data-order="7"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Lorem, ipsum dolor.
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-success px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    completed
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-10"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-10"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-success rounded-e-[20px]"
                    style="width: 100%"
                  ></div>
                </div>
                100%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-completed"
          data-order="8"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Lorem, ipsum dolor.
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-success px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    completed
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-11"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-11"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-success rounded-e-[20px]"
                    style="width: 100%"
                  ></div>
                </div>
                100%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-late"
          data-order="8"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <a
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    Lorem ipsum dolor sit.
                  </a>

                  <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-danger px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    late
                  </span>
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-12"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                    aria-labelledby="projectDrops-12"
                    data-te-dropdown-menu-ref
                  >
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >View</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Edit</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Leave</a
                      >
                    </li>
                    <li>
                      <a
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        href="#"
                        data-te-dropdown-item-ref
                        >Delete</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[25px]">
                Adipisicing eu magna velit est exercitation et consequat Lorem
                laboris
              </p>
              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >26 Dec 2020</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >18 Mar 2023</strong
                  >
                </div>
              </div>
              <div
                class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
              >
                <div
                  class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                >
                  <div
                    class="h-[5px] bg-danger rounded-e-[20px]"
                    style="width: 100%"
                  ></div>
                </div>
                100%
              </div>
              <p class="mt-0.5 text-light-extra dark:text-white/60 text-xs">
                12/31 Task Completed
              </p>
            </div>
            <div
              class="pt-4 px-[30px] pb-[25px] mt-[17px] border-t border-regular dark:border-box-dark-up"
            >
              <p class="mb-4 text-sm text-light-extra dark:text-subtitle-dark">
                Assigned To
              </p>
              <div class="flex flex-wrap items-center gap-[6px] capitalize">
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Rony"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/1.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] rounded-full object-cover"
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  title="Shamim"
                  data-te-template='<div class="opacity-0 transition-opacity duration-300 ease-in-out absolute z-[1080] block m-0 text-sm not-italic font-normal text-left no-underline underline-offset-auto normal-case leading-6 tracking-normal break-normal whitespace-normal" role="tooltip">
                            <div data-te-tooltip-inner-ref class="tooltip-inner dark:border-box-dark-up dark:border-1 max-w-[200px] text-sm py-1.5 px-4 text-dark dark:text-white text-center bg-white dark:bg-box-dark rounded shadow-lg"></div>
                            </div>'
                >
                  <img
                    class="rounded-full"
                    src="../../assets/images/sellers/2.png"
                  />
                </a>
                <a
                  href="#"
                  class="w-[35px] min-w-[35px] h-[35px] inline-flex items-center justify-center rounded-full text-dark bg-regularBG dark:bg-white/10 dark:text-title-dark font-medium text-[12px] border-[#e4e4e4] dark:border-box-dark-up"
                >
                  <i class="uil uil-plus text-[10px]"></i>
                  2
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="px-[25px] bg-white dark:bg-box-dark">
      <!-- Footer content -->
      <div
        class="flex justify-between flex-wrap py-[22px] gap-x-[30px] gap-y-[15px] max-ssm:gap-y-[8px] items-center max-md:flex-col"
      >
        <!-- Copyright information -->
        <div
          class="flex items-center gap-[4px] text-[14px] font-medium max-md:text-center text-body dark:text-subtitle-dark"
        >
          © <span class="current-year">2022</span>
          <a href="#" class="text-primary">SovWare</a>
        </div>

        <!-- Footer navigation links -->
        <div class="justify-end md:justify-center items-center flex gap-[15px]">
          <a
            href="#"
            class="text-body dark:text-subtitle-dark text-[14px] hover:text-primary dark:hover:text-title-dark"
            >About</a
          >
          <a
            href="#"
            class="text-body dark:text-subtitle-dark text-[14px] hover:text-primary dark:hover:text-title-dark"
            >Team</a
          >
          <a
            href="#"
            class="text-body dark:text-subtitle-dark text-[14px] hover:text-primary dark:hover:text-title-dark"
            >Contact</a
          >
        </div>
      </div>
    </footer>
    <!-- end: Footer -->
  </main>
  <!-- End: Main Content -->
</template>
