APPNAME=$1
for i in {1..12}
do
    sleep 1
    php combine.php "reports-$i" $APPNAME
done