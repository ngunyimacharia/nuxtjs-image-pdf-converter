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
          Image / PDF Converter
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-500">
          Convert images to PDF and vice versa.
        </p>
      </div>
      <div class="mt-12">
        <form action="/api/upload-images" method="POST">
          <div class="py-10">
            <label for="type" class="block text-sm font-medium text-gray-700"
              >Type of Conversion</label
            >
            <select
              id="type"
              name="type"
              v-model="form.type"
              class="
                mt-1
                block
                w-full
                pl-3
                pr-10
                py-2
                text-base
                border-gray-300
                focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                sm:text-sm
                rounded-md
              "
            >
              <option value="0" selected>Images to PDF</option>
              <option value="1">PDF to Images</option>
            </select>
          </div>
          <div>
            <label for="Images" class="block text-sm font-medium text-gray-700"
              >Images</label
            >
            <div class="mt-1">
              <input
                multiple
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
      form: {
        type: 0,
      },
    };
  },
  methods: {
    async submit(e) {
      const randomTag = Math.random().toString(36).substring(7);
      this.uploading = true;
      const files = e.target.images.files;

      Array.from(files).forEach(async (file) => {
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
        const instance = await this.$cloudinary.upload(data, {
          upload_preset: "nuxtjs-image-pdf-converter",
          folder: `nuxtjs-image-pdf-converter/images/${randomTag}`,
          tags: [randomTag],
        });
      });

      this.uploading = false;
    },
  },
};
</script>