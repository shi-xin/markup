from django.shortcuts import render
import os

def annotate_data(request, data_file_path):
    data = dict()

    os.chdir('/')

    file_data = get_file_lines(data_file_path)
    data['file_data'] = file_data

    config_file_path = os.path.dirname(data_file_path) + '/annotation.conf'
    config_data = get_file_lines(config_file_path)
    config_data = [x.strip() for x in config_data]

    configs = []
    config_key = ''
    config_values = []
    for line in config_data:
        if line == '':
            continue
        
        if len(line) >= 3 and line[:3] == '###':
            if config_key != '':
                configs.append(config_key)
                data[config_key] = config_values
                config_values = []
            config_key = line[4:]
            continue

        config_values.append(line)

    if config_values != []:
        configs.append(config_key)
        data[config_key] = config_values

    context = dict()
    context['dict'] = data

    return render(request, 'annotate/annotate.html', context)


def get_file_lines(file_path):
    with open(file_path, encoding='utf8') as f:
        return f.readlines()