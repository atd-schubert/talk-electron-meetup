## Build your application

### Install packager

```bash
npm install --save-dev electron-packager
```


### Synopsis of the packager
```
npx electron-packager 
  <location of project>
  <name of project>
  <platform>
  <architecture>
  <electron version>
  <optional options>

```


### Enhance script tasks in package.json

*just the important parts for this step*
```json
{
  "scripts": {
    "build": "rm -Rf dist && mkdir -p dist && cd dist && electron-packager ../ --all"
  }
}
```


### Build the app

```bash
npm run build
```
