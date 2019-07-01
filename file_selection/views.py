from django.shortcuts import render, redirect
from django.urls import reverse
from annotate import views as annotate_views
import easygui

def file_selection_template(request):
    # Reset currently opened file lists
    annotate_views.current_file = ''
    annotate_views.next_files = []
    annotate_views.previous_files = []
    annotate_views.total_file_count = 1

    file_path = ''
    if request.method == 'GET':
        if request.GET.get('open_file_button'):
            file_path = easygui.fileopenbox()
            if file_path != None:
                return redirect('/annotate' + file_path)
            else:
                return redirect('/')
        elif request.GET.get('open_dir_button'):
            dir_path = easygui.diropenbox()
            if dir_path != None:
                return redirect('/annotate' + dir_path)
            else:
                return redirect('/')
    return render(request, 'file_selection/index.html', {})