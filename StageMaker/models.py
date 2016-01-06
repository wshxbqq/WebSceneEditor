from django.db import models

class StageScenceDiffcult(models.Model):
	StageScenceDiffcult_id = models.AutoField(primary_key=True ,null=False , unique=True)
	StageScenceDiffcult_Text = models.CharField(max_length=400)
	StageScenceDiffcult_Key = models.CharField(max_length=400)

	StageScenceDiffcult_CreateTime = models.DateTimeField(auto_now=True)
	StageScenceDiffcult_ModiflyTime = models.DateTimeField(auto_now=True,auto_now_add=True)



class StageScence(models.Model):
	StageScence_id = models.AutoField(primary_key=True ,null=False , unique=True)
	StageScenceDiffcult_id=models.ForeignKey(StageScenceDiffcult)
	StageScence_title = models.CharField(max_length=400)
	StageScence_text = models.TextField()
	StageScence_annotation = models.TextField()
	StageScence_CreateTime = models.DateTimeField(auto_now=True)
	StageScence_ModiflyTime = models.DateTimeField(auto_now=True,auto_now_add=True)
	StageScence_underTesting= models.BooleanField(default = False)
	StageScence_ext_1 = models.CharField(max_length=500)

