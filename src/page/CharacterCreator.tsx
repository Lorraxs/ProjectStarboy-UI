import React, { useEffect, useState } from 'react'
import useShow from '../hooks/useShow'
import styled from 'styled-components'
import { animated } from '@react-spring/web'
import { AnimatedBox, AnimatedGrid, AnimatedTypography } from '../components/animated-mui'
import { Box } from '@mui/system'
import { Button, Dialog, DialogTitle, Grid, IconButton, Slider, Tooltip, Typography } from '@mui/material'
import { FatherFaces, IPedAppearance, IPedHeadBlend, IPedHeadOvelayNum, IPedHeadOverlayValue, IPedHeadOverlays, MotherFaces, ParentsName, defaultPedAppearance, defaultPedHeadOverlayNum } from '../shared/interfaces'
import _ from 'lodash'
import { Control, Controller, FormProvider, useController, useForm, useFormContext } from 'react-hook-form'
import { cRequest } from '../utils/request'
import PaletteIcon from '@mui/icons-material/Palette';
import CircleIcon from '@mui/icons-material/Circle';
import { PED_HEAD_OVERLAY_COLORS } from '../shared/constants'

const request = new cRequest()

const Container = styled(animated.div)`
  width: 100%;
  height: 100%;
  background-color: transparent;
  padding: 2vw;
  pointer-events: auto;
`
const FatherImg = styled(animated.img)`
  width: 40%;
  margin-right: -10%;
`
const MotherImg = styled(animated.img)`
  width: 40%;
  margin-left: -10%;
`
const ParrentImg = styled(animated.img)`
  left: 0;
  width: 100%;
`
const ParrentGrid = styled(AnimatedGrid)`
  ::-webkit-scrollbar
  {
    width: 2px;
    background-color: transparent;

  }
  ::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    background-color: #FF0B30;
  }
  ::-webkit-scrollbar-track
  {
    border-radius: 10px;
    background-color: transparent;
  }
`
const ParrentItemGrid = styled(AnimatedGrid)<{selected: boolean}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${(props)=>props.selected&&'background-color: #ff0b30;'}
  &:hover{
    background-color: #ff0b30;
  }
  &::before {
    position: absolute;
    box-sizing: border-box;
    content: "";
    width: 100%;
    height: 50%;
    border-left: solid 6px #ff0b30;
  }
  
`

function CharacterCreator() {
  const [show, setShow] = useShow(false, 'CharacterCreator', true, true, true, false)
  const [overlayNums, setOverlayNums] = useState<IPedHeadOvelayNum>(defaultPedHeadOverlayNum)
  const methods= useForm({
    defaultValues:defaultPedAppearance,
    mode: 'all',
  })
  const data = methods.watch()
  useEffect(() => {
    request.post('CharacterCreator:UpdateAppearance', data)
  }, [data])

  useEffect(() => {
    request.post('CharacterCreator:GetPedHeadOverlayNums', {}, (response:IPedHeadOvelayNum)=>{
      setOverlayNums(response)
    })
  }, [show])

  const onSubmit = ()=>{
    request.post('CharacterCreator:SaveAppearance', data)
  }
  
  const onCancel = ()=>{
    request.post('CharacterCreator:Cancel')
  }
  
  return (show ?
    <Container>
      <FormProvider {...methods}>
        <AnimatedGrid container sx={{height: '100%'}}>
          <Left />
          <Center onSubmit={onSubmit} onCancel={onCancel}/>
          <Right overlayNums={overlayNums}/>
        </AnimatedGrid>
      </FormProvider>
    </Container> : null
  )
}

const Center = ({onCancel, onSubmit}: {onCancel: ()=>void, onSubmit: ()=>void})=>{
  return(
    <AnimatedGrid container item xs={6} flexDirection={'column'} justifyContent={'flex-end'} alignItems={'center'} sx={{height: '100%', width: '100%', padding: 2}} wrap={'nowrap'}>
      <Grid item container justifyContent={'center'} spacing={6}>
        <Grid item>
          <Button variant="contained" color="secondary" size="large" onClick={onSubmit}>
            Đồng ý
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" size="large" onClick={onCancel}>
            Hủy
          </Button>
        </Grid>
      </Grid>
    </AnimatedGrid>
  )
}

const Left = ()=>{
  const {watch, setValue} = useFormContext();
  const headBlend:IPedHeadBlend = watch('headBlend')
  return(
    <AnimatedGrid container item xs={3} flexDirection={'column'}  sx={{height: '100%', bgcolor: '#1f1f1fa6', padding: 2}} wrap={'nowrap'}>
      <AnimatedGrid item sx={{height: '3%'}}>
        <AnimatedTypography variant={'h4'} sx={{fontFamily: 'Title', bgcolor: '#ff0b30', fontWeight: 'bold'}}>CHARACTER CREATION</AnimatedTypography>
      </AnimatedGrid>
      <AnimatedGrid item sx={{height: '16%'}}>
        <Grid container justifyContent={'flex-end'}>
          <FatherImg src={`./assets/headBlend/${headBlend.shapeFirst}.webp`}/>
          <MotherImg src={`./assets/headBlend/${headBlend.shapeSecond}.webp`}/>
        </Grid>
      </AnimatedGrid>
      <AnimatedGrid item flexDirection={'column'}  wrap={'nowrap'} sx={{height: '38%', mt: 6}}>
        <AnimatedTypography variant={'body1'} sx={{fontFamily: 'Title', bgcolor: '#ff0b30', p:1, mb: 3}}>FATHER</AnimatedTypography>
        <ParrentGrid container sx={{height: '90%', overflowY: 'auto', overflowX: 'hidden'}}>
          {FatherFaces.map(i=>(
            <ParrentItemGrid item xs={3} key={i} onClick={()=>setValue('headBlend.shapeFirst', i)} selected={headBlend.shapeFirst === i}>
              <ParrentImg src={`./assets/headBlend/${i}.webp`}/>
              <AnimatedTypography variant={'subtitle1'} sx={{fontFamily: 'Gilroy', fontWeight: 'bold', bottom: '0', textAlign: 'center', position: 'absolute'}}>{ParentsName[i]}</AnimatedTypography>
            </ParrentItemGrid>
          ))}
        </ParrentGrid>
      </AnimatedGrid>
      <AnimatedGrid item flexDirection={'column'}  wrap={'nowrap'} sx={{height: '38%', mt: 6}}>
        <AnimatedTypography variant={'body1'} sx={{fontFamily: 'Title', bgcolor: '#ff0b30', p:1, mb: 3}}>MOTHER</AnimatedTypography>
        <ParrentGrid container sx={{height: '90%', overflowY: 'auto', overflowX: 'hidden'}}>
          {MotherFaces.map(i=>(
            <ParrentItemGrid item xs={3} key={i} onClick={()=>setValue('headBlend.shapeSecond', i)} selected={headBlend.shapeSecond === i}>
              <ParrentImg src={`./assets/headBlend/${i}.webp`}/>
              <AnimatedTypography variant={'subtitle1'} sx={{fontFamily: 'Gilroy', fontWeight: 'bold', bottom: '0', textAlign: 'center', position: 'absolute'}}>{ParentsName[i]}</AnimatedTypography>
            </ParrentItemGrid>
          ))}
        </ParrentGrid>
      </AnimatedGrid>
    </AnimatedGrid>
  )
}

interface IMarks {
  value: number,
  label: string
}



const Right = ({overlayNums}:{overlayNums:IPedHeadOvelayNum}) => {
  const {watch, setValue, control} = useFormContext();
  const shapeMix = watch('headBlend.shapeMix')
  const skinMix = watch('headBlend.skinMix')

  const noseWidth = watch('faceFeatures.noseWidth')
  const nosePeakHigh = watch('faceFeatures.nosePeakHigh')
  const nosePeakSize = watch('faceFeatures.nosePeakSize')
  const noseBoneHigh = watch('faceFeatures.noseBoneHigh')
  const nosePeakLowering = watch('faceFeatures.nosePeakLowering')
  const noseBoneTwist = watch('faceFeatures.noseBoneTwist')
  const eyeBrownHigh = watch('faceFeatures.eyeBrownHigh')
  const eyeBrownForward = watch('faceFeatures.eyeBrownForward')
  const cheeksBoneHigh = watch('faceFeatures.cheeksBoneHigh')
  const cheeksBoneWidth = watch('faceFeatures.cheeksBoneWidth')
  const cheeksWidth = watch('faceFeatures.cheeksWidth')
  const eyesOpening = watch('faceFeatures.eyesOpening')
  const lipsThickness = watch('faceFeatures.lipsThickness')
  const jawBoneWidth = watch('faceFeatures.jawBoneWidth')
  const jawBoneBackSize = watch('faceFeatures.jawBoneBackSize')
  const chinBoneLowering = watch('faceFeatures.chinBoneLowering')
  const chinBoneLenght = watch('faceFeatures.chinBoneLenght')
  const chinBoneSize = watch('faceFeatures.chinBoneSize')
  const chinHole = watch('faceFeatures.chinHole')
  const neckThickness = watch('faceFeatures.neckThickness')

  const headOverlays = watch('headOverlays')

  const getOverlayMarks = (name:keyof IPedHeadOvelayNum)=>{
    const marks:IMarks[] = []
    const ovelayNum = overlayNums[name]
    for (let i = -1; i < ovelayNum; i++) {
      marks.push({
        value: i,
        label: ''
      })
    }
    return marks
  }

  return(
    <AnimatedGrid container item xs={3} flexDirection={'column'}  sx={{height: '100%', bgcolor: '#1f1f1fa6', padding: 2}} wrap={'nowrap'}>
      <AnimatedGrid item container spacing={6}>
        <Grid item xs={6}>
          <Typography id="shapeMix" variant='subtitle2' align='center' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
            Tỷ lệ khuôn mặt cha và mẹ
          </Typography>
          <Slider aria-label='shapeMix' value={shapeMix*100} min={0} max={100} onChange={(e, value)=>{
            var v = Number(value)
            setValue('headBlend.shapeMix', v/100)
          }}/>
        </Grid>
        <Grid item xs={6}>
          <Typography id="skinMix" variant='subtitle2' align='center' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
            Tỷ lệ màu da cha và mẹ
          </Typography>
          <Slider aria-label='skinMix' value={skinMix*100} min={0} max={100} onChange={(e, value)=>{
            var v = Number(value)
            setValue('headBlend.skinMix', v/100)
          }}/>
        </Grid>
      </AnimatedGrid>
      <AnimatedGrid item sx={{height: '47%', p: 1}}>
        <AnimatedTypography variant={'body1'} sx={{fontFamily: 'Title', bgcolor: '#ff0b30', mb: 3}}>ĐẶC ĐIỂM KHUÔN MẶT</AnimatedTypography>
        <ParrentGrid item container columns={13} justifyContent={'space-between'} sx={{height: '90%', overflowY: 'auto', overflowX: 'hidden'}}>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="noseWidth" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              noseWidth
            </Typography>
            <Slider aria-label='noseWidth' size='small' value={noseWidth*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.noseWidth', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="nosePeakHigh" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              nosePeakHigh
            </Typography>
            <Slider aria-label='nosePeakHigh' size='small' value={nosePeakHigh*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.nosePeakHigh', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="nosePeakSize" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              nosePeakSize
            </Typography>
            <Slider aria-label='nosePeakSize' size='small' value={nosePeakSize*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.nosePeakSize', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="noseBoneHigh" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              noseBoneHigh
            </Typography>
            <Slider aria-label='noseBoneHigh' size='small' value={noseBoneHigh*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.noseBoneHigh', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="nosePeakLowering" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              nosePeakLowering
            </Typography>
            <Slider aria-label='nosePeakLowering' size='small' value={nosePeakLowering*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.nosePeakLowering', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="noseBoneTwist" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              noseBoneTwist
            </Typography>
            <Slider aria-label='noseBoneTwist' size='small' value={noseBoneTwist*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.noseBoneTwist', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="eyeBrownHigh" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              eyeBrownHigh
            </Typography>
            <Slider aria-label='eyeBrownHigh' size='small' value={eyeBrownHigh*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.eyeBrownHigh', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="eyeBrownForward" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              eyeBrownForward
            </Typography>
            <Slider aria-label='eyeBrownForward' size='small' value={eyeBrownForward*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.eyeBrownForward', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="cheeksBoneHigh" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              cheeksBoneHigh
            </Typography>
            <Slider aria-label='cheeksBoneHigh' size='small' value={cheeksBoneHigh*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.cheeksBoneHigh', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="cheeksBoneWidth" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              cheeksBoneWidth
            </Typography>
            <Slider aria-label='cheeksBoneWidth' size='small' value={cheeksBoneWidth*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.cheeksBoneWidth', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="cheeksWidth" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              cheeksWidth
            </Typography>
            <Slider aria-label='cheeksWidth' size='small' value={cheeksWidth*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.cheeksWidth', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="eyesOpening" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              eyesOpening
            </Typography>
            <Slider aria-label='eyesOpening' size='small' value={eyesOpening*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.eyesOpening', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="lipsThickness" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              lipsThickness
            </Typography>
            <Slider aria-label='lipsThickness' size='small' value={lipsThickness*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.lipsThickness', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="jawBoneWidth" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              jawBoneWidth
            </Typography>
            <Slider aria-label='jawBoneWidth' size='small' value={jawBoneWidth*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.jawBoneWidth', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="jawBoneBackSize" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              jawBoneBackSize
            </Typography>
            <Slider aria-label='jawBoneBackSize' size='small' value={jawBoneBackSize*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.jawBoneBackSize', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="chinBoneLowering" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              chinBoneLowering
            </Typography>
            <Slider aria-label='chinBoneLowering' size='small' value={chinBoneLowering*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.chinBoneLowering', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="chinBoneLenght" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              chinBoneLenght
            </Typography>
            <Slider aria-label='chinBoneLenght' size='small' value={chinBoneLenght*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.chinBoneLenght', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="chinBoneSize" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              chinBoneSize
            </Typography>
            <Slider aria-label='chinBoneSize' size='small' value={chinBoneSize*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.chinBoneSize', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="chinHole" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              chinHole
            </Typography>
            <Slider aria-label='chinHole' size='small' value={chinHole*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.chinHole', v/100)
            }}/>
          </Grid>
          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="neckThickness" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              neckThickness
            </Typography>
            <Slider aria-label='neckThickness' size='small' value={neckThickness*100} min={-100} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('faceFeatures.neckThickness', v/100)
            }}/>
          </Grid>
        </ParrentGrid>
      </AnimatedGrid>
      <AnimatedGrid  item sx={{height: '47%'}}>
        <AnimatedTypography variant={'body1'} sx={{fontFamily: 'Title', bgcolor: '#ff0b30', p:1, mb: 3}}>DA MẶT</AnimatedTypography>
        <ParrentGrid item container justifyContent={'space-between'} columns={13} sx={{height: '90%', overflowY: 'auto', overflowX: 'hidden'}}>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.blemishes" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              blemishes
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.blemishes.color} title='Color' setValue={(id: number)=>setValue('headOverlays.blemishes.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.blemishes.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.blemishes.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('blemishes')} aria-label='headOverlays.blemishes.style' size='small' min={-1} max={overlayNums['blemishes']} value={headOverlays.blemishes.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.blemishes.style', v)
            }}/>
            <Slider aria-label='headOverlays.blemishes.opacity' size='small' value={headOverlays.blemishes.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.blemishes.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.beard" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              beard
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.beard.color} title='Color' setValue={(id: number)=>setValue('headOverlays.beard.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.beard.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.beard.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('beard')} aria-label='headOverlays.beard.style' size='small' min={-1} max={overlayNums['beard']} value={headOverlays.beard.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.beard.style', v)
            }}/>
            <Slider aria-label='headOverlays.beard.opacity' size='small' value={headOverlays.beard.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.beard.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.eyebrows" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              eyebrows
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.eyebrows.color} title='Color' setValue={(id: number)=>setValue('headOverlays.eyebrows.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.eyebrows.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.eyebrows.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('eyebrows')} aria-label='headOverlays.eyebrows.style' size='small' min={-1} max={overlayNums['eyebrows']} value={headOverlays.eyebrows.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.eyebrows.style', v)
            }}/>
            <Slider aria-label='headOverlays.eyebrows.opacity' size='small' value={headOverlays.eyebrows.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.eyebrows.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.ageing" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              ageing
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.ageing.color} title='Color' setValue={(id: number)=>setValue('headOverlays.ageing.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.ageing.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.ageing.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('ageing')} aria-label='headOverlays.ageing.style' size='small' min={-1} max={overlayNums['ageing']} value={headOverlays.ageing.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.ageing.style', v)
            }}/>
            <Slider aria-label='headOverlays.ageing.opacity' size='small' value={headOverlays.ageing.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.ageing.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.makeUp" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              makeUp
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.makeUp.color} title='Color' setValue={(id: number)=>setValue('headOverlays.makeUp.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.makeUp.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.makeUp.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('makeUp')} aria-label='headOverlays.makeUp.style' size='small' min={-1} max={overlayNums['makeUp']} value={headOverlays.makeUp.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.makeUp.style', v)
            }}/>
            <Slider aria-label='headOverlays.makeUp.opacity' size='small' value={headOverlays.makeUp.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.makeUp.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.blush" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              blush
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.blush.color} title='Color' setValue={(id: number)=>setValue('headOverlays.blush.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.blush.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.blush.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('blush')} aria-label='headOverlays.blush.style' size='small' min={-1} max={overlayNums['blush']} value={headOverlays.blush.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.blush.style', v)
            }}/>
            <Slider aria-label='headOverlays.blush.opacity' size='small' value={headOverlays.blush.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.blush.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.complexion" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              complexion
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.complexion.color} title='Color' setValue={(id: number)=>setValue('headOverlays.complexion.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.complexion.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.complexion.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('complexion')} aria-label='headOverlays.complexion.style' size='small' min={-1} max={overlayNums['complexion']} value={headOverlays.complexion.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.complexion.style', v)
            }}/>
            <Slider aria-label='headOverlays.complexion.opacity' size='small' value={headOverlays.complexion.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.complexion.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.sunDamage" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              sunDamage
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.sunDamage.color} title='Color' setValue={(id: number)=>setValue('headOverlays.sunDamage.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.sunDamage.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.sunDamage.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('sunDamage')} aria-label='headOverlays.sunDamage.style' size='small' min={-1} max={overlayNums['sunDamage']} value={headOverlays.sunDamage.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.sunDamage.style', v)
            }}/>
            <Slider aria-label='headOverlays.sunDamage.opacity' size='small' value={headOverlays.sunDamage.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.sunDamage.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.lipstick" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              lipstick
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.lipstick.color} title='Color' setValue={(id: number)=>setValue('headOverlays.lipstick.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.lipstick.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.lipstick.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('lipstick')} aria-label='headOverlays.lipstick.style' size='small' min={-1} max={overlayNums['lipstick']} value={headOverlays.lipstick.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.lipstick.style', v)
            }}/>
            <Slider aria-label='headOverlays.lipstick.opacity' size='small' value={headOverlays.lipstick.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.lipstick.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.moleAndFreckles" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              moleAndFreckles
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.moleAndFreckles.color} title='Color' setValue={(id: number)=>setValue('headOverlays.moleAndFreckles.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.moleAndFreckles.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.moleAndFreckles.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('moleAndFreckles')} aria-label='headOverlays.moleAndFreckles.style' size='small' min={-1} max={overlayNums['moleAndFreckles']} value={headOverlays.moleAndFreckles.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.moleAndFreckles.style', v)
            }}/>
            <Slider aria-label='headOverlays.moleAndFreckles.opacity' size='small' value={headOverlays.moleAndFreckles.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.moleAndFreckles.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.chestHair" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              chestHair
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.chestHair.color} title='Color' setValue={(id: number)=>setValue('headOverlays.chestHair.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.chestHair.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.chestHair.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('chestHair')} aria-label='headOverlays.chestHair.style' size='small' min={-1} max={overlayNums['chestHair']} value={headOverlays.chestHair.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.chestHair.style', v)
            }}/>
            <Slider aria-label='headOverlays.chestHair.opacity' size='small' value={headOverlays.chestHair.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.chestHair.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.bodyBlemishes" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              bodyBlemishes
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.bodyBlemishes.color} title='Color' setValue={(id: number)=>setValue('headOverlays.bodyBlemishes.color', id)}/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.bodyBlemishes.secondColor} title='Secondary color' setValue={(id: number)=>setValue('headOverlays.bodyBlemishes.secondColor', id)}/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('bodyBlemishes')} aria-label='headOverlays.bodyBlemishes.style' size='small' min={-1} max={overlayNums['bodyBlemishes']} value={headOverlays.bodyBlemishes.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.bodyBlemishes.style', v)
            }}/>
            <Slider aria-label='headOverlays.bodyBlemishes.opacity' size='small' value={headOverlays.bodyBlemishes.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.bodyBlemishes.opacity', v/100)
            }}/>
          </Grid>

          <Grid item xs={6} sx={{bgcolor: '#1f1f1f', borderRadius: '1rem', p:2, mb: 2}}>
            <Typography id="headOverlays.addBodyBlemishes" align='center' variant='subtitle2' sx={{fontFamily: 'Gilroy', textTransform: 'uppercase'}} gutterBottom>
              addBodyBlemishes
            </Typography>
            <Grid container justifyContent={'center'} alignItems={'center'}>
              <Grid item>
                <ColorDialog currentColor={headOverlays.addBodyBlemishes.color} setValue={(id: number)=>setValue('headOverlays.addBodyBlemishes.color', id)} title='Color'/>
              </Grid>
              <Grid item>
                <ColorDialog currentColor={headOverlays.addBodyBlemishes.secondColor} setValue={(id: number)=>setValue('headOverlays.addBodyBlemishes.secondColor', id)} title='Secondary color'/>
              </Grid>
            </Grid>
            <Slider step={null}  valueLabelDisplay="auto" marks={getOverlayMarks('addBodyBlemishes')} aria-label='headOverlays.addBodyBlemishes.style' size='small' min={-1} max={overlayNums['addBodyBlemishes']} value={headOverlays.addBodyBlemishes.style} onChange={(e, value)=>{
              const v = Number(value)
              setValue('headOverlays.addBodyBlemishes.style', v)
            }}/>
            <Slider aria-label='headOverlays.addBodyBlemishes.opacity' size='small' value={headOverlays.addBodyBlemishes.opacity*100} min={0} max={100} onChange={(e, value)=>{
              var v = Number(value)
              setValue('headOverlays.addBodyBlemishes.opacity', v/100)
            }}/>
          </Grid>
        </ParrentGrid>
      </AnimatedGrid>
    </AnimatedGrid>
  )
}


const findOverlayColorById = (id: number)=>{
  for (let i = 0; i < PED_HEAD_OVERLAY_COLORS.length; i++) {
    const element = PED_HEAD_OVERLAY_COLORS[i];
    if(element.id === id){
      return element.hex
    }
  }
  return '#CF0813'
}

const ColorDialog = ({currentColor, title, setValue}:{currentColor: number, title: string, setValue: (id: number)=> void})=>{
  const [showDialog, setShowDialog] = useState(false)

  const handleClose = () => {
    setShowDialog(false);
  };

  return(
    <>
      <Tooltip title={title}>
        <IconButton color="primary" aria-label="color" sx={{color: findOverlayColorById(currentColor)}} onClick={()=>setShowDialog(true)}>
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} open={showDialog}>
        <DialogTitle>{title}</DialogTitle>
        <Grid container>
          {PED_HEAD_OVERLAY_COLORS.map((e, i)=>{
            return(
              <Grid item>
                <IconButton color="primary" key={i} sx={{color: e.hex, fontSize: 'large'}} size='large' aria-label="color" onClick={()=>setValue(e.id)}>
                  <CircleIcon />
                </IconButton>
              </Grid>
            )
          })}
        </Grid>
      </Dialog>
    </>
  )
}

const CharacterCreatorPage = {
  element: CharacterCreator,
  needLogin: true
}

export default  CharacterCreatorPage