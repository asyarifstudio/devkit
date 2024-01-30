<script>
    import "../app.css"
</script>
<div class="h-screen w-screen flex">
    <!-- menu -->
    <div class="flex-none overflow-y-auto min-h-full">
        <ul class="menu bg-base-200 w-56 h-full">
            <li>
              <h2 class="menu-title">TLV</h2>
              <ul>
                <li><a href="/tlv/parser">TLV Parser</a></li>
              </ul>
            </li>
          </ul>
    </div>

    <!-- Input -->
    <div class="flex-grow">
        <slot></slot>
    </div>

</div>