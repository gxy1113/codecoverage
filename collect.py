import os
import json

directory_name = "coverages"
coverage_all = dict()

def load_file(name):
    try:
        with open(name, 'r') as f:
            data = json.load(f)
        return data
    except:
        print("failed to load file ", name)
        return False

def write_file(name, data):
     try:
         with open(name, 'w') as f:
             json.dump(data, f, indent=4)
     except:
         print("failed to write to file")
         return False

def handle_coverage_file(name, target_dir = "/var/www/html"):
    file_coverage = load_file(name)
    if file_coverage == False:
        return 0
    for file_name, value in file_coverage.items():
        if not file_name.startswith(target_dir):
            continue
        if file_name not in coverage_all:
            coverage_all[file_name] = dict()
        for line_num, hit in value.items():
            if int(hit) == -1:
                continue
            if line_num not in coverage_all[file_name]:
                coverage_all[file_name][line_num] = 0
            coverage_all[file_name][line_num] += 1
                    

def get_files_in_directory(directory):
    file_list = []
    # Walk through the directory and its subdirectories
    for root, dirs, files in os.walk(directory):
        for file in files:
            # Append the file path to the list
            file_list.append(os.path.join(root, file))
    return file_list

# Example usage:
files = get_files_in_directory(directory_name)
for cov_file in files:
    handle_coverage_file(cov_file)
write_file('global_coverage.json', coverage_all)

