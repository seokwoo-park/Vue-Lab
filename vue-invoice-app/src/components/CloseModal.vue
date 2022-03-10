<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure want to exit? Your changes will not be saved.</p>
      <div class="actions flex">
        <button @click="$emit('closeModal')" class="purple">Return</button>
        <button @click="$emit('closeInvoice')" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/styles/_utilities.scss";
@import "../assets/styles/_button.scss";
@import "../assets/styles/_color.scss";
@import "../assets/styles/closeModal/closeModal.scss";
</style>
