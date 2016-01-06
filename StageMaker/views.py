# Create your views here.
from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context
from django.shortcuts import render_to_response
from django.core.serializers import serialize
import os   
from  datetime  import *
from StageMaker.models import *
import json
import random
from django.core import serializers
from plistlib import readPlist, writePlistToString


def index(request):  
    result=[]
    stageScenceDiffcult=StageScenceDiffcult.objects.all()
    for obj in stageScenceDiffcult:
        stageScence = obj.stagescence_set.all()
        data = {
        'StageScenceDiffcult_id': obj.StageScenceDiffcult_id,
        'StageScenceDiffcult_Key': obj.StageScenceDiffcult_Key,
        'StageScenceDiffcult_Text': obj.StageScenceDiffcult_Text,
        'StageScenceDiffcult_CreateTime': str(obj.StageScenceDiffcult_CreateTime),
        'StageScenceDiffcult_ModiflyTime': str(obj.StageScenceDiffcult_ModiflyTime),
        'StageScence_Count': stageScence.count()
        }
        result.append(data)
        pass
    data_array = json.dumps(result)
    return render_to_response('index.html',{'data_array': data_array})


def stageList(request,stagediffcult_id):
    stageScenceDiffcult=StageScenceDiffcult.objects.get(StageScenceDiffcult_id=stagediffcult_id)
    title=stageScenceDiffcult.StageScenceDiffcult_Key
    text=stageScenceDiffcult.StageScenceDiffcult_Text
    StageScenceDiffcult_id=stageScenceDiffcult.StageScenceDiffcult_id;
    result=[]
    StageScenceList=StageScence.objects.filter(StageScenceDiffcult_id=stagediffcult_id)
    for obj in StageScenceList:
        data = {
            'StageScence_id': obj.StageScence_id,
            'StageScenceDiffcult_id': obj.StageScenceDiffcult_id.StageScenceDiffcult_id,
            'StageScence_title': obj.StageScence_title,
            'StageScence_text': obj.StageScence_text,
            'StageScence_annotation': obj.StageScence_annotation,
            'StageScence_ModiflyTime':str(obj.StageScence_ModiflyTime)
        }
        result.append(data)
        pass
    data_array = json.dumps(result)
    return render_to_response('StageList.html',{'data_array': data_array,"title":title, "text":text,"StageScenceDiffcult_id":StageScenceDiffcult_id})

def addStageScence(request,stagediffcult_id):  
    return render_to_response('AddStageScence.html',{'DIFFCULT_ID':stagediffcult_id})



def modiflyStageScence(request,stage_id):  
    scence=StageScence.objects.get(StageScence_id=stage_id)

    return render_to_response(
        'ModiflyStageScence.html',
        {
        'STAGEID':stage_id,
        'jsonData':scence.StageScence_text,
        'StageScence_title':scence.StageScence_title,
        'StageScence_underTesting':str(scence.StageScence_underTesting).lower()
        })



def saveStageScence(request,stagediffcult_id): 
    stageScenceDiffcult=StageScenceDiffcult.objects.get(StageScenceDiffcult_id=stagediffcult_id)
    StageScence_title=request.POST.get('scence_name')
    jsonData=request.POST.get('jsonData')
    scence = StageScence(
        StageScenceDiffcult_id=stageScenceDiffcult,
        StageScence_title=StageScence_title,
        StageScence_text=jsonData,
        )
    scence.save();
    return HttpResponse(scence.StageScence_id)



def updateStageScence(request,stage_id):  
    jsonData=request.POST.get('jsonData')
    StageScence_title=request.POST.get('scence_name')
    StageScence_id=int(stage_id)
    scence=StageScence.objects.get(StageScence_id=StageScence_id)
    scence.StageScence_title=StageScence_title
    scence.StageScence_text=jsonData;
    scence.save();
    return HttpResponse(scence.StageScence_id)


def deleteStageScence(request,stage_id):  
    sid=str(stage_id.split('_')[0])
    pwd=str(stage_id.split('_')[1])
    StageScenceList=StageScence.objects.filter(StageScence_id=str(sid))

    if StageScenceList.count()>0:
        if pwd=="3803756":
            StageScenceList.delete()
            return HttpResponse('1')
            pass
        pass
    else:
        return HttpResponse('0')
        pass
    return HttpResponse('0')




def updateTestStatus(request,stage_id):  
    StageScence_id=int(stage_id)
    scence=StageScence.objects.get(StageScence_id=StageScence_id)
    isTesting=scence.StageScence_underTesting
    if isTesting:
        isTesting=False
        pass
    else:
        isTesting=True
        pass
    scence.StageScence_underTesting=isTesting
    scence.save();
    return HttpResponse(str(scence.StageScence_underTesting).lower())





def resetTestStatus(request):  
    scence=StageScence.objects.filter(StageScence_underTesting=True)
    if scence.count()>0:
        for obj in scence:
            obj.StageScence_underTesting=False
            obj.save()
            pass
        
        pass
    
    return HttpResponse("1")




def outPutJsonData(request):  
    result={}
    stageScenceDiffcultList=StageScenceDiffcult.objects.all()
    for obj in stageScenceDiffcultList:
        result[obj.StageScenceDiffcult_Key]=[]
        stageScenceList = obj.stagescence_set.all()
        for scence in stageScenceList:
            j_scence={}
            j_scence["itemList"]=[]
            result[obj.StageScenceDiffcult_Key].append(j_scence)
            p_scence_array=json.loads(scence.StageScence_text)
            for item in p_scence_array:
                p_val_scence={}
                p_val_scence["type"]=item.has_key("type") and item["type"] or item["type"]
                p_val_scence["id"]=item.has_key("id") and item["id"] or item["id"]
                p_val_scence["coco2d_img"]=item.has_key("coco2d_img") and item["coco2d_img"] or item["coco2d_img"]
                p_val_scence["cocos2dX"]=item.has_key("cocos2dX") and item["cocos2dX"] or item["cocos2dX"]
                p_val_scence["cocos2dY"]=item.has_key("cocos2dY") and item["cocos2dY"] or item["cocos2dY"]
                p_val_scence["height"]=item.has_key("height") and item["height"] or item["height"]
                p_val_scence["width"]=item.has_key("width") and item["width"] or item["width"]
                p_val_scence["rotate"]=item.has_key("rotate") and item["rotate"] or 0
                p_val_scence["scaleX"]=item.has_key("scaleX") and item["scaleX"] or 1
                p_val_scence["scaleY"]=item.has_key("scaleY") and item["scaleY"] or 1
                p_val_scence["skewX"]=item.has_key("skewX") and item["skewX"] or 0
                p_val_scence["skewY"]=item.has_key("skewY") and item["skewY"] or 0
                j_scence["itemList"].append(p_val_scence)
                pass
            pass
    pass
    return HttpResponse(writePlistToString(result).decode('utf8'))