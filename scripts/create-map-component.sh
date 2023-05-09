#!/bin/bash

set -x

if [ $# -eq 0 ]; then
    echo "Please provide a component name as first argument."
    exit 1
fi

component_name="$1"
target_path="src/components/"
template_name="MlComponentTemplate"
template_path="src/components/"

if [ ! -d "$target_path$component_name" ]; then

  cp -r $template_path$template_name $target_path$component_name

  mv $target_path$component_name/$template_name.tsx $target_path$component_name/$component_name.tsx

  mv $target_path$component_name/$template_name.meta_.json $target_path$component_name/$component_name.meta_.json

  mv $target_path$component_name/$template_name.stories.tsx $target_path$component_name/$component_name.stories.tsx

  sed -i "s/$template_name/$component_name/g" $target_path$component_name/$component_name.tsx
  sed -i "s/$template_name/$component_name/g" $target_path$component_name/$component_name.meta_.json
  sed -i "s/$template_name/$component_name/g" $target_path$component_name/$component_name.stories.tsx

else

  echo "The directory $target_path$component_name already exists. Please use a different name."

fi
