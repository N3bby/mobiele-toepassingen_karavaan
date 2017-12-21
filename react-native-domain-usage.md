# react-native domain usage

## Accessing the global KaravaanService object

Very simple, the service can be accessed everywhere in the codebase by using
```
global.service
```

After each change to the domain, we should save the service to the device by invoking this command:
```
global.saveService();
```