This is a readme file.

# This is a work in progress.

the apple notes import from evernote has gotten better, but a bunch of stuff in the .enex file
isn’t brought in. Like URLs. Or tags. 

So, this moves some of the metadata into the content and spits out a new .enex
file.

this is only for my particular use case. feel free to use the code any way you like.

I had inconsistent naming conventions, so Evernote tags are lowercased, spaces
replaced with hyphens, and prepended with a hash mark.

this brings everything into memory so it won't work with large .enex files. I
haven't run into a limit yet, but then I'm going notebook by notbook.
