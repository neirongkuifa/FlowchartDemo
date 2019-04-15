# Flowchart Demo

## Installation and Run

Under project root directory, install node modules

```bash
meteor npm install
```

Run the following command to run the App

```bash
meteor
```

Run the following command to test the App

```bash
TEST_BROWSER_DRIVER=chrome TEST_WATCH=1 meteor test --driver-package meteortesting:mocha --port 3002
```

## Usage

### Overall Effect

![](./images/overall.gif)

### Click elements on element bar to get a new instance of node

![](./images/add.gif)

### Drag from out and drop on another node to link

![](./images/link)

### Inspect node id by clicking node. Node Info is shown on the top right corner

![](./images/inspection.gif)

### Delete node by clicking delete button on the top right corner of node

![](./images/deletion.gif)

### Support synchronous value update and propagation when node value changed or node deleted

![](./images/realtime.gif)
