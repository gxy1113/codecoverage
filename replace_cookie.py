import sys
cookie_name = str(sys.argv[1])

with open('codecoverage_template.php', 'r') as f:
    orig_file = f.read()

result = orig_file.replace("placeholder", cookie_name)

with open('codecoverage.php', 'w') as f:
    f.write(result)

print("replace the \"placeholder\" in the codecoverage file")