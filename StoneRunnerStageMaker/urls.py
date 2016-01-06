from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'StageMaker.views.index', name='index'),
    url(r'^StageIndex/(?P<stagediffcult_id>\d+)/', 'StageMaker.views.stageList'),
    url(r'^AddStageScence/(?P<stagediffcult_id>\d+)/', 'StageMaker.views.addStageScence'),
    url(r'^ModiflyStageScence/(?P<stage_id>\d+)/', 'StageMaker.views.modiflyStageScence'),
    url(r'^DeleteScence/(?P<stage_id>.+)/', 'StageMaker.views.deleteStageScence'),

    url(r'^SaveStageScence/(?P<stagediffcult_id>\d+)/', 'StageMaker.views.saveStageScence'),
    url(r'^UpdateStageScence/(?P<stage_id>\d+)/', 'StageMaker.views.updateStageScence'),
    url(r'^UpdateTestStatus/(?P<stage_id>\d+)/', 'StageMaker.views.updateTestStatus'),
    url(r'^ResetTestStatus/', 'StageMaker.views.resetTestStatus'),

    url(r'^OutPutJsonData/', 'StageMaker.views.outPutJsonData'),
)
