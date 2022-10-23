<!-- #region one-line -->
<style>
  .one-line {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
<!-- #endregion one-line -->

<!-- #region one-line-no-width -->
<style>
.show-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  /* 指示行数 */
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
<!-- #endregion one-line-no-width -->

# 关于 css 显示省略号的几种方式

## 单行固宽

<<< @/record/css-ellipsis.md#one-line{html}

:::details 演示效果

  <p class='one-line'>关于 css 显示省略号的几种方式</p>
:::

## 单行不固宽或者多行不固宽

<<< @/record/css-ellipsis.md#one-line-no-width{html}

:::details 演示效果

  <p class='show-ellipsis'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit dolorum beatae, quos quas, ipsum animi est velit neque expedita cumque unde reiciendis ratione, itaque possimus vitae ad eos? Nihil, recusandae?</p>
:::
