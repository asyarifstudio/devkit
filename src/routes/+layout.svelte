<script>
    import "../app.css"
</script>
<div class="h-screen w-screen flex">
    <!-- menu -->
    <div class="flex-none overflow-y-auto min-h-full">
        <ul class="menu bg-base-200 w-56 h-full">
            <li>
              <h2 class="menu-title">Parser</h2>
              <ul>
                <li><a href="/parser/tlv">BER TLV Parser</a></li>
              </ul>
            </li>
            <li>
              <h2 class="menu-title">Converter</h2>
              <ul>
                <li><a href="/converter/ascii">ASCII Converter</a></li>
              </ul>
            </li>
            
          </ul>
    </div>

    <!-- Input -->
    <div class="flex-grow p-5">
        <slot></slot>
    </div>

</div>