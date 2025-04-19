# Chrome OLED Mode Extension
**Chrome OLED Mode adds a pitch black theme to websites, making them high contrast and easy to read at night.*

![Chrome-OLED-Mode Logo](demo1.png)
![Chrome-OLED-Mode Logo](demo2.png)

This is a resurrection of the Super Dark Mode project which got taken down from the Chrome Web Store for unknown reasons and then abandoned by it's original developer-decompiled, refactored/documented and improved upon. In my opinion, it functions way better than the popular extension 'Dark Reader'.

# Implementation Details
This extension is a static browser-side script which leverages React's dynamic rendering and live component updating mechanisms. At runtime, it waits for the DOM to finish loading, then injects content into a dedicated element (#__oled). Using ReactDOM.createRoot, it mounts a themed layout component that wraps the core UI, enabling declarative reactivity and efficient DOM updates. The layout system, sourced from @plasmo-static-common/react, applies a custom OLED-optimised stylesheet. Parcel handles bundling and dependency resolution using a simulated require system embedded in the file which mimics module caching and isolation in a browser-compatible way. Features high precision and low overhead, while maintaining compatibility with extension sandbox constraints and update mechanisms. Supports; 4 different operation modes, 40 specialized site-specific themes, whitelist management, and automatic scheduling.


[Download Latest Release](https://github.com/FreelanceProgrammingServices/Chrome-OLED-Mode/releases/latest)

</div>

## Installation

1. Download the latest `Chrome-OLED-Mode.crx` from the [releases page](https://github.com/yourusername/Chrome-OLED-Mode/releases/latest) 
2. Go to chrome://extensions and enable Developer mode 
3. Load Unpacked and select folder containing extracted files

## Support
Tested on:
 Google Chrome Version 135.0.3179.85


## License

This project is released under Public Domain.

---

</div>
