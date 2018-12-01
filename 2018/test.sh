for i in {1..25};
do
  if [ -d "day$i" ]; then
    cd day$i
    go test
    cd -
    fi
done
