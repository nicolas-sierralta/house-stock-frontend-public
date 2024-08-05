# House Stock

House Stock is an application for managing household inventories, allowing users to add, edit, delete, and filter products, as well as scan receipts to extract data using OCR.

## Features

- **Inventory Management:** Add, edit, and delete products in your inventory.
- **Detailed and Simple Views:** Toggle between detailed and simple views of the inventory.
- **Filters and Sorting:** Filter products by name, store, quantity, location, and purchase date. Sort products by name, price, quantity, and purchase date.
- **Receipt Scanning:** Scan receipts to automatically extract product information.
- **Authentication:** User registration, login, and logout.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/nicolas-sierralta/house-stock.git
    ```
2. Navigate to the project directory:
    ```sh
    cd house-stock
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Config enviroment file

### Create a `.env` file in the root of the project with the following content:

- EXPO_PUBLIC_API_URL=http://000.000.000.000:0000 (backend api url)
- APP_ENV=preview/production/build

## Usage

1. Start the application:
    ```sh
    npm start
    ```
2. Open the application on your device or emulator using Expo Go.

## Scripts

- `npm start`: Start the application in development mode.
- `npm run test`: Run the tests.
- `npm run android`: Run the application on an Android device or emulator.
- `npm run ios`: Run the application on an iOS device or simulator (not tested).
- `npm run web`: Run the application in a web browser (not tested).
- `npm run wsl`: Run the application on WSL in development mode.

## Project Structure

- **/src**
  - **/components**
    - **/nonReusable:** Application-specific components.
    - **/reusable:** Reusable components.
  - **/context:** Contexts for global state management.
  - **/hooks:** Custom hooks.
  - **/screens:** Application screens.
  - **/types:** TypeScript type definitions.
  - **/utils:** Utilities and helper functions.

## Want to try it out?

You can download the latest build with the extension `.apk` to try it out on your Android device.





