# Generated by Django 5.1.7 on 2025-04-08 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='commentsmodel',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='comment_images/'),
        ),
        migrations.AddField(
            model_name='commentsmodel',
            name='text_file',
            field=models.FileField(blank=True, null=True, upload_to='comment_text_files/'),
        ),
        migrations.AddField(
            model_name='postsmodel',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='post_images/'),
        ),
        migrations.AddField(
            model_name='postsmodel',
            name='text_file',
            field=models.FileField(blank=True, null=True, upload_to='post_text_files/'),
        ),
    ]
