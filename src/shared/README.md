#Shared folder

The files in this folder are shared with `init` and `create` folders.

No-one file of the shared folder should have dependencies from `init` or `create` folder. This kind of dependency could create circular dependencies (in Angular, for example).
