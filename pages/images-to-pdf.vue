<template>
  <div class="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
    <div class="relative max-w-xl mx-auto">
      <svg
        class="absolute left-full transform translate-x-1/2"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
        />
      </svg>
      <svg
        class="absolute right-full bottom-0 transform -translate-x-1/2"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
        />
      </svg>
      <nav aria-label="Breadcrumb" class="flex my-10">
        <ol class="flex items-center space-x-4">
          <li>
            <div>
              <nuxt-link to="/" class="text-gray-400 hover:text-gray-500">
                <span>Home</span>
              </nuxt-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                class="flex-shrink-0 h-5 w-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <nuxt-link
                to="/images-to-pdf"
                class="
                  ml-4
                  text-sm
                  font-medium
                  text-gray-500
                  hover:text-gray-700
                "
                aria-current="Images to PDF"
              >
                Images to PDF
              </nuxt-link>
            </div>
          </li>
        </ol>
      </nav>
      <div class="text-center">
        <h2
          class="
            text-3xl
            font-extrabold
            tracking-tight
            text-gray-900
            sm:text-4xl
          "
        >
          Images to PDF Converter
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-500">
          Select images and convert.
        </p>
      </div>
      <div class="mt-12">
        <form @submit.prevent="submit">
          <div>
            <label for="Images" class="block text-sm font-medium text-gray-700"
              >Images</label
            >
            <div class="mt-1">
              <input
                multiple
                accept=".jpeg,.jpg,.png,image/jpeg,image/png"
                type="file"
                name="images"
                id="images"
                class="
                  py-3
                  px-4
                  block
                  w-full
                  shadow-sm
                  focus:ring-indigo-500
                  focus:border-indigo-500
                  border-gray-300
                  rounded-md
                "
              />
            </div>
          </div>
          <div class="pt-10 sm:col-span-2">
            <button
              type="submit"
              v-if="!uploading && !pdfUrl"
              class="
                w-full
                inline-flex
                items-center
                justify-center
                px-6
                py-3
                border border-transparent
                rounded-md
                shadow-sm
                text-base
                font-medium
                text-white
                bg-indigo-600
                hover:bg-indigo-700
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
            >
              Convert
            </button>
            <div v-if="uploading && !pdfUrl">
              Uploading images, please wait.
            </div>
            <a
              :href="`${pdfUrl}?ap=em`"
              target="_blank"
              v-if="!uploading && pdfUrl"
              class="
                w-full
                inline-flex
                items-center
                justify-center
                px-6
                py-3
                border border-transparent
                rounded-md
                shadow-sm
                text-base
                font-medium
                text-indigo-700
                bg-indigo-100
                hover:bg-indigo-200
                focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              "
            >
              View PDF
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploading: false,
      pdfUrl: null,
    };
  },
  methods: {
    async submit(e) {
      const randomTag = Math.random().toString(36).substring(7);
      this.uploading = true;
      const files = e.target.images.files;

      const uploadedFiles = await Promise.all(
        Array.from(files).map(async (file) => {
          /* create a reader */
          const readData = (f) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(f);
            });

          /* Read data */
          const data = await readData(file);

          /* upload the converted data */

          return await this.$cloudinary.upload(data, {
            upload_preset: "nuxtjs-image-pdf-converter",
            folder: `nuxtjs-image-pdf-converter/images/${randomTag}`,
            tags: [randomTag],
          });
        })
      );
      const resp = await this.$axios.get(
        `${window.location.origin}/api/generate-pdf?tag=${randomTag}`
      );

      this.pdfUrl = resp.data.pdf.secure_url;

      this.uploading = false;
    },
  },
};
</script>