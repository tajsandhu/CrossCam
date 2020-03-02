# CrossCam

CrossCam is an open source and cross platform camera app which allows the to login, take pictures, and store them in the cloud. These images can be accessed from any device with the app installed. The app is built using React Native and Amazon Web Services. 

## Getting Started

All you need to get this project running on your own machine is Node JS, Yarn, Amplify CLI, and React Native CLI along with a Windows, Linux, or Mac distrobution. 

### Prerequisites

Any Adnroid or IOS device or emulator.

### Installing

Clone the repository from the main branch.

```
git clone https://github.com/SandManTaj/CrossCam.git
```

Navigate to the projects root folder and open a terminal there.

Install all necessary node packages using Yarn.

```
yarn install
```

For IOS, install cocoa pods.

```
cd ios && pod install
```

Now from the root directory, initalize the amplify project

```
amplify init
```

Now run the using ```react-native run-ios``` on IOS or ```react-native run=android``` on Android. 

## Built With

* [React Native](https://reactnative.dev/docs/getting-started) - The mobile development framework
* [AWS Amplify](https://aws-amplify.github.io/docs/) - Authentication and Storage

## Authors

* **Tajbir Sandhu** - [SandManTaj](https://github.com/SandManTaj)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
