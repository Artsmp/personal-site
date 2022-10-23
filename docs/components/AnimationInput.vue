<template>
  <div class="box">
    <div class="inputBox">
      <input type="text" required />
      <span>Username or Email</span>
    </div>
    <div class="inputBox">
      <input type="text" required />
      <span>Password</span>
    </div>
    <button>Login</button>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 300px;
  background-color: #0b213e;
  padding: 16px;
  border-radius: 4px;
  .inputBox {
    position: relative;
    margin-bottom: 16px;
    input {
      padding: 16px;
      width: 100%;
      background-color: transparent;
      outline: none;
      border: 1px solid rgba(255, 255, 255, 0.5);
      color: #fff;
      border-radius: 4px;
      transition: 0.3s;
      font-size: 1em;
      &:focus,
      &:valid {
        border: 1px solid darkorange;
        ~ span {
          top: -10px;
          background-color: #0b213e;
          color: darkorange;
          padding: 0 4px;
          font-size: 0.65em;
        }
      }
    }
    span {
      position: absolute;
      color: rgba(255, 255, 255, 0.5);
      font-size: 1em;
      pointer-events: none;
      transition: 0.3s;
      text-transform: uppercase;
      left: 16px;
      top: 18px;
      font-size: 1em;
    }
  }
  button {
    padding: 16px 32px;
    background-color: transparent;
    outline: none;
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
  }
  button:hover {
    border: 1px solid darkorange;
    color: darkorange;
  }
}
</style>
