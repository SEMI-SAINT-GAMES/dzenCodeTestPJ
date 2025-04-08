from django.http import FileResponse, HttpResponseNotFound
import os

def download_file(request, file_path):
    if os.path.exists(file_path):
        file = open(file_path, 'rb')
        response = FileResponse(file)
        response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
        return response
    else:
        return HttpResponseNotFound("Файл не найден.")